import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { LogBox } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {
	fetchRoomDetails,
	fetchRoomMemberList,
	fetchRoomBillList,
} from '../database/actions/roomActions';
import { deleteCustomer } from '../database/actions/customerActions';
import { useForceUpdate, formatVNCurrency } from '../utils/utils';
import { fetchServiceDetails } from '../database/actions/serviceActions';

export default function App({ navigation, route }) {
	const selected_room_id = route.params.selected_room_id;

	const isFocused = useIsFocused();
	const [forceUpdate, forceUpdateId] = useForceUpdate();

	const [memberList, setMemberList] = useState([]);
	const [billList, setBillList] = useState([]);
	const [room, setRoom] = useState({});
	const [waterFee, setWaterFee] = useState('');
	const [electricityFee, setElectricityFee] = useState('');
	const [garbageFee, setGarbageFee] = useState('');

	const [mountInfo, setMountInfo] = useState(true);

	useEffect(() => {
		const loadRoomDetails = async () => {
			const roomDetails = await fetchRoomDetails(selected_room_id).catch(
				(error) => console.log(error)
			);
			setRoom(roomDetails);
		};

		const loadMemberList = async () => {
			const memberList = await fetchRoomMemberList(selected_room_id).catch(
				(error) => console.log(error)
			);
			setMemberList(memberList);
		};

		const loadBillList = async () => {
			const billList = await fetchRoomBillList(selected_room_id).catch(
				(error) => console.log(error)
			);
			setBillList(billList);
		};

		const loadService = async (service, setService) => {
			const fee = await fetchServiceDetails(service).catch((error) =>
				console.log(error)
			);

			setService(fee.price);
		};

		loadRoomDetails();
		loadMemberList();
		loadService('Điện', setElectricityFee);
		loadService('Nước', setWaterFee);
		loadService('Rác', setGarbageFee);
		loadBillList();

		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}, [isFocused, forceUpdateId]);

	const totalRemained = billList.reduce((res, curr) => {
		return res + curr.remained;
	}, 0);

	const handleDeleteMember = async (memberID) => {
		await deleteCustomer(memberID, forceUpdate).catch((error) =>
			console.log(error)
		);
	};

	const renderMembers = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('MemberDetail', {
						memberID: item.id,
					});
				}}>
				<View style={[styles.member, styles.myBackground]}>
					{/* Member icon */}
					<FontAwesomeIcon name="user" size={20} style={{ marginRight: 32 }} />

					{/* Member name */}
					<Text>{item.name}</Text>

					{/* Delete member icon */}
					<View style={[styles.deleteIcon]}>
						<TouchableOpacity
							onPress={() => {
								handleDeleteMember(item.id);
							}}>
							<FontAwesomeIcon
								name="remove"
								size={25}
								style={{ color: 'white' }}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const renderBills = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('BillDetail', {
						selected_bill_id: item.id,
					});
				}}>
				<View style={[styles.myBackground, styles.billInfoContainer]}>
					<View style={styles.billInfo}>
						{/* Bill month year */}
						<View style={styles.billDay}>
							<Text style={styles.textTitle}> {item.created_at}</Text>
						</View>

						{/* Bill money: total, collected, remained */}
						<View style={styles.billMoney}>
							{/* Total */}
							<View style={[styles.myBorder, styles.money]}>
								<Text>Tổng tiền:</Text>
								<Text style={styles.textBold}>
									{formatVNCurrency(item.total)}
								</Text>
							</View>

							{/* Collected */}
							<View
								style={[
									styles.myBorder,
									styles.money,
									{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									},
								]}>
								<View>
									<Text>Đã thu:</Text>
									<Text style={styles.textBold}>
										{formatVNCurrency(item.total - item.remained)}
									</Text>
								</View>
							</View>

							{/* Remained */}
							<View style={[styles.myBorder, styles.money]}>
								<Text>Còn lại: </Text>
								<Text style={styles.textBold}>
									{formatVNCurrency(item.remained)}
								</Text>
							</View>
						</View>
					</View>

					<View style={[styles.deleteIcon]}>
						<TouchableOpacity
							onPress={() => {
								// Handle delete selected bill
							}}>
							<FontAwesomeIcon
								name="remove"
								size={25}
								style={{ color: 'white' }}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={[styles.header]}>
				{/* Info and Bill button */}
				<TouchableOpacity
					style={[styles.headerBtn, { borderBottomWidth: mountInfo ? 4 : 0 }]}
					onPress={() => {
						if (!mountInfo) setMountInfo(!mountInfo);
					}}>
					<Text style={styles.textBold}>THÔNG TIN</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.headerBtn, { borderBottomWidth: !mountInfo ? 4 : 0 }]}
					onPress={() => {
						if (mountInfo) setMountInfo(!mountInfo);
					}}>
					<Text style={styles.textBold}>LỊCH SỬ HÓA ĐƠN</Text>
				</TouchableOpacity>
			</View>

			{/* Body */}
			<ScrollView
				style={{ width: '100%', marginTop: 72 }}
				contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
				{/* View info */}
				{mountInfo && (
					<View style={styles.infoContainer}>
						{/* View room details */}
						<View style={[styles.basicInfo, styles.myBorder]}>
							<View
								style={[styles.bodyHeader, { height: 35, marginBottom: 16 }]}>
								<Text>Thông tin cơ bản</Text>
								<TouchableOpacity
									onPress={() => {
										console.log('---------');

										navigation.navigate('EditBasicInfo', {
											selected_room_id: room.id,
										});
									}}>
									<FontAwesomeIcon name="edit" size={20} />
								</TouchableOpacity>
							</View>

							<View style={styles.infoRow}>
								{/* Room name */}
								<View style={[styles.rowItem, styles.myBackground]}>
									<View>
										<Text>Tên phòng:</Text>
										<Text style={styles.textBold}>{room.name}</Text>
									</View>
								</View>

								{/* Move in day */}
								<View style={[styles.rowItem, styles.myBackground]}>
									<View>
										<Text>Ngày đến:</Text>
										<Text style={styles.textBold}>{room.move_in_date}</Text>
									</View>
								</View>
							</View>

							<View style={styles.infoRow}>
								{/* Rental fee */}
								<View style={[styles.rowItem, styles.myBackground]}>
									<View>
										<Text>Giá thuê:</Text>
										<Text style={styles.textBold}>
											{formatVNCurrency(room.rental_fee)}
										</Text>
									</View>
								</View>

								{/* Deposit */}
								<View style={[styles.rowItem, styles.myBackground]}>
									<View>
										<Text>Tiền cọc:</Text>
										<Text style={styles.textBold}>
											{room.deposit ? room.deposit : 'Không có'}
										</Text>
									</View>
								</View>
							</View>
						</View>

						{/* View members */}
						<View style={[styles.memberInfo, styles.myBorder]}>
							<View
								style={[styles.bodyHeader, { height: 35, marginBottom: 16 }]}>
								<Text>Thông tin người ở</Text>

								<TouchableOpacity
									onPress={() => {
										navigation.navigate('AddMember', {
											roomID: room.id,
										});
									}}>
									<FontAwesomeIcon name="plus-circle" size={30} />
								</TouchableOpacity>
							</View>

							{/* View members  */}
							<View style={[styles.memberContainer]}>
								<FlatList
									nestedScrollEnabled={true}
									data={memberList}
									renderItem={renderMembers}
									keyExtractor={(item) => item.id}
								/>
							</View>
						</View>

						{/*View service */}
						<View style={[styles.serviceInfo, styles.myBorder]}>
							<View
								style={[styles.bodyHeader, { height: 35, marginBottom: 16 }]}>
								<Text>Thông tin dịch vụ</Text>
								<TouchableOpacity
									onPress={() => {
										navigation.navigate('EditRoomService', {
											roomID: room.id,
										});
									}}>
									<FontAwesomeIcon name="edit" size={25} />
								</TouchableOpacity>
							</View>
							<View style={[styles.serviceContainer]}>
								{/* Water */}
								<View style={[styles.service, styles.myBackground]}>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
										}}>
										<IonIcon
											name="water"
											size={20}
											style={{ marginRight: 20 }}
										/>
										<Text>
											{formatVNCurrency(waterFee)}/khối
										</Text>
									</View>
									<View style={[styles.lastestUnit, styles.myBorder]}>
										<Text>{room.old_water_number}</Text>
									</View>
								</View>

								{/* Electricity */}
								<View style={[styles.service, styles.myBackground]}>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
										}}>
										<FontAwesomeIcon
											name="bolt"
											size={20}
											style={{
												marginLeft: 4,
												marginRight: 26,
											}}
										/>
										<Text>
											{formatVNCurrency(electricityFee)}/Kwh
										</Text>
									</View>
									<View style={[styles.lastestUnit, styles.myBorder]}>
										<Text>{room.old_electricity_number}</Text>
									</View>
								</View>

								{/* Wifi */}
								<View style={[styles.service, styles.myBackground]}>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
										}}>
										<IonIcon
											name="wifi"
											size={20}
											style={{
												marginRight: 20,
											}}
										/>

										<Text>Tiền wifi</Text>
									</View>
								</View>

								{/* Tiền rác */}
								<View style={[styles.service, styles.myBackground]}>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
										}}>
										<IonIcon
											name="trash"
											size={20}
											style={{
												marginRight: 20,
											}}
										/>

										<Text> {formatVNCurrency(garbageFee)}/tháng</Text>
									</View>
								</View>
							</View>
						</View>

						{/* Reset room information button */}
						<TouchableOpacity
							style={styles.deleteButton}
							onPress={() => {
								// Handle reset room information
							}}>
							<Text style={styles.textTitleWhite}>XÓA THÔNG TIN PHÒNG</Text>
						</TouchableOpacity>
					</View>
				)}

				{/* View Bill */}
				{!mountInfo && (
					<View style={[styles.billContainer]}>
						<View style={styles.totalRemained}>
							<IonIcon
								name="notifications"
								size={30}
								style={{ color: 'white' }}
							/>
							<View>
								<Text style={{ color: 'white' }}>
									Tổng số tiền phòng này còn thiếu là:{' '}
								</Text>
								<Text
									style={{
										color: 'white',
										fontWeight: 'bold',
									}}>
									{formatVNCurrency(totalRemained)}
								</Text>
							</View>
						</View>
						<FlatList
							nestedScrollEnabled={true}
							data={billList}
							renderItem={renderBills}
							keyExtractor={(item) => item.id}></FlatList>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'column',
		flex: 1,
	},
	header: {
		width: '100%',
		height: '10%',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		backgroundColor: '#dfdfdf',
		borderBottomWidth: 2,
		position: 'absolute',
		top: 0,
		zIndex: 10,
	},
	headerBtn: {
		width: '50%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	bodyHeader: {
		width: '100%',
		borderBottomWidth: 2,
		paddingBottom: 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 4,
	},
	infoContainer: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
	},
	basicInfo: {
		width: '90%',
		height: 200,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 8,
		marginBottom: 8,
	},
	infoRow: {
		flexDirection: 'row',
		width: '100%',
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowItem: {
		width: '45%',
		height: '90%',
		paddingLeft: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	memberInfo: {
		width: '90%',
		height: 300,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 8,
		marginBottom: 8,
	},
	memberContainer: {
		width: '100%',
		height: '85%',
		flex: 1,
	},
	member: {
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 45,
		flexDirection: 'row',
		marginBottom: 16,
		paddingLeft: 16,
	},

	serviceInfo: {
		width: '90%',
		height: 250,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 8,
		marginBottom: 8,
	},
	serviceContainer: {
		width: '100%',
		height: '80%',
		justifyContent: 'space-around',
	},
	service: {
		flexDirection: 'row',
		height: '20%',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
	},
	lastestUnit: {
		width: '25%',
		alignItems: 'center',
	},

	deleteIcon: {
		position: 'absolute',
		right: 0,
		backgroundColor: 'black',
		height: '100%',
		width: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	deleteButton: {
		backgroundColor: 'black',
		width: '90%',
		height: '5%',
		borderRadius: 10,
		marginBottom: 12,
		justifyContent: 'center',
	},

	billContainer: {
		width: '100%',
		flex: 1,
		padding: 8,
	},
	billInfoContainer: {
		flex: 1,
		marginBottom: 32,
		flexDirection: 'row',
		alignItems: 'center',
	},
	billInfo: {
		height: 100,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		width: '90%',
	},
	billDay: {
		width: '100%',
		height: '30%',
		textAlign: 'center',
		marginBottom: 8,
	},
	billMoney: {
		width: '100%',
		height: '70%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	money: {
		paddingLeft: 8,
		width: '30%',
		height: '80%',
		justifyContent: 'center',
	},
	totalRemained: {
		borderRadius: 10,
		backgroundColor: '#3c3f3e',
		width: '100%',
		height: 80,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 16,
		padding: 8,
	},

	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textTitleWhite: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
	},
	textBold: {
		fontWeight: 'bold',
	},
	myBackground: {
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
	},
	myBorder: {
		borderColor: 'black',
		borderRadius: 15,
		borderWidth: 2,
	},
});
