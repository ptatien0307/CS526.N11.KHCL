import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
	Modal,
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
	resetRoom,
} from '../database/actions/roomActions';
import { deleteCustomer } from '../database/actions/customerActions';
import { fetchServiceDetails } from '../database/actions/serviceActions';
import { deleteBill } from '../database/actions/billActions';
import { useForceUpdate, formatVNCurrency } from '../utils/utils';
import { DeleteDialog } from '../Dialogs/DeleteDialog';
import { Dimensions } from 'react-native';

const wh = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function App({ navigation, route }) {
	const selected_room_id = route.params.selected_room_id;

	const isFocused = useIsFocused();
	const [forceUpdateRoomInfo, forceUpdateRoomInfoId] = useForceUpdate();
	const [forceUpdateMemberList, forceUpdateMemberListId] = useForceUpdate();
	const [forceUpdateBillInfo, forceUpdateBillInfoId] = useForceUpdate();

	const [memberList, setMemberList] = useState([]);
	const [billList, setBillList] = useState([]);
	const [room, setRoom] = useState({});
	const [waterFee, setWaterFee] = useState('');
	const [electricityFee, setElectricityFee] = useState('');
	const [garbageFee, setGarbageFee] = useState('');

	const [mountInfo, setMountInfo] = useState(true);
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	useEffect(() => {
		const loadRoomDetails = async () => {
			const roomDetails = await fetchRoomDetails(selected_room_id).catch(
				(error) => console.log(error)
			);
			setRoom(roomDetails);
		};

		const loadService = async (service, setService) => {
			const fee = await fetchServiceDetails(service).catch((error) =>
				console.log(error)
			);
			setService(fee.price);
		};

		loadRoomDetails();
		loadService('Điện', setElectricityFee);
		loadService('Nước', setWaterFee);
		loadService('Rác', setGarbageFee);

		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
	}, [isFocused, forceUpdateRoomInfoId]);

	useEffect(() => {
		const loadMemberList = async () => {
			const memberList = await fetchRoomMemberList(selected_room_id).catch(
				(error) => console.log(error)
			);
			setMemberList(memberList);
		};

		loadMemberList();
	}, [isFocused, forceUpdateMemberListId]);

	useEffect(() => {
		const loadBillList = async () => {
			const billList = await fetchRoomBillList(selected_room_id).catch(
				(error) => console.log(error)
			);
			setBillList(billList);
		};

		loadBillList();
	}, [forceUpdateBillInfoId, isFocused]);

	const totalRemained = billList.reduce((res, curr) => {
		return res + curr.remained;
	}, 0);

	const handleDeleteMember = async (memberID) => {
		await deleteCustomer(memberID, forceUpdateMemberList).catch((error) =>
			console.log(error)
		);
	};

	const handleDeleteBill = async (billID) => {
		const forceUpdate = () => {
			forceUpdateRoomInfo();
			forceUpdateBillInfo();
		};
		await deleteBill(billID, forceUpdate).catch((error) => console.log(error));
	};

	const handleResetRoom = async () => {
		if (!confirmDelete) return;

		const forceUpdate = () => {
			forceUpdateRoomInfo();
			forceUpdateBillInfo();
			forceUpdateMemberList();
		};
		await resetRoom(selected_room_id, forceUpdate).catch((error) =>
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
					<Text style={{ fontSize: 17 }}>{item.name}</Text>

					{/* Delete member icon */}
					<TouchableOpacity
						onPress={() => {
							handleDeleteMember(item.id);
						}}
						style={[styles.deleteBillButton]}>
						<FontAwesomeIcon
							name="remove"
							size={25}
							style={{ color: 'white' }}
						/>
					</TouchableOpacity>
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

					<TouchableOpacity
						onPress={() => {
							handleDeleteBill(item.id);
						}}
						style={[styles.deleteBillButton]}>
						<FontAwesomeIcon
							name="remove"
							size={25}
							style={{ color: 'white' }}
						/>
					</TouchableOpacity>
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
					<Text style={[styles.textBold, { fontSize: 18 }]}>THÔNG TIN</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.headerBtn, { borderBottomWidth: !mountInfo ? 4 : 0 }]}
					onPress={() => {
						if (mountInfo) setMountInfo(!mountInfo);
					}}>
					<Text style={[styles.textBold, { fontSize: 18 }]}>
						LỊCH SỬ HÓA ĐƠN
					</Text>
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
								<Text style={styles.bodyHeaderText}>Thông tin cơ bản</Text>
								<TouchableOpacity
									onPress={() => {
										navigation.navigate('EditBasicInfo', {
											selected_room_id: room.id,
										});
									}}>
									<FontAwesomeIcon name="edit" size={25} />
								</TouchableOpacity>
							</View>

							<View style={styles.infoRow}>
								{/* Room name */}
								<View style={[styles.rowItem, styles.myBackground]}>
									<View>
										<Text style={{ fontSize: 19 }}>Tên phòng:</Text>
										<Text style={[styles.textBold, { fontSize: 16 }]}>
											{room.name}
										</Text>
									</View>
								</View>

								{/* Move in day */}
								<View style={[styles.rowItem, styles.myBackground]}>
									<View>
										<Text style={{ fontSize: 19 }}>Ngày đến:</Text>
										<Text style={[styles.textBold, { fontSize: 16 }]}>
											{room.move_in_date || 'Không có'}
										</Text>
									</View>
								</View>
							</View>

							<View style={styles.infoRow}>
								{/* Rental fee */}
								<View style={[styles.rowItem, styles.myBackground]}>
									<View>
										<Text style={{ fontSize: 19 }}>Giá thuê:</Text>
										<Text style={[styles.textBold, { fontSize: 16 }]}>
											{formatVNCurrency(room.rental_fee)}/tháng
										</Text>
									</View>
								</View>

								{/* Deposit */}
								<View style={[styles.rowItem, styles.myBackground]}>
									<View>
										<Text style={{ fontSize: 19 }}>Tiền cọc:</Text>
										<Text style={[styles.textBold, { fontSize: 16 }]}>
											{formatVNCurrency(room.deposit) || 'Không có'}
										</Text>
									</View>
								</View>
							</View>
						</View>

						{/* View members */}
						<View style={[styles.memberInfo, styles.myBorder]}>
							<View
								style={[styles.bodyHeader, { height: 35, marginBottom: 16 }]}>
								<Text style={styles.bodyHeaderText}>Thông tin người ở</Text>

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
								<Text style={styles.bodyHeaderText}>Thông tin dịch vụ</Text>
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
										<Text style={{ fontSize: 16 }}>
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
										<Text style={{ fontSize: 16 }}>
											{formatVNCurrency(electricityFee)}/Kwh
										</Text>
									</View>
									<View style={[styles.lastestUnit, styles.myBorder]}>
										<Text>{room.old_electricity_number}</Text>
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

										<Text style={{ fontSize: 16 }}>
											{formatVNCurrency(garbageFee)}/tháng
										</Text>
									</View>
								</View>
							</View>
						</View>

						{/* Reset room information button */}
						<TouchableOpacity
							style={styles.resetButton}
							onPress={async () => {
								setDeleteDialogVisible(true);
								await handleResetRoom();
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
								<Text style={styles.notiText}>
									Tổng số tiền phòng này còn thiếu là:{' '}
								</Text>
								<Text style={[styles.notiText, { fontWeight: 'bold' }]}>
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

			{/* Dialog */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={deleteDialogVisible}>
				<DeleteDialog
					title={'Chú ý'}
					message={
						'Reset phòng sẽ xóa tất cả thông tin của phòng (khách thuê, tất cả hóa đơn). Hãy đảm bảo mọi hóa đơn của phòng được thanh toán trước khi reset phòng.'
					}
					setConfirmDelete={setConfirmDelete}
					setDeleteDialogVisible={setDeleteDialogVisible}
				/>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'column',
		flex: 1,
		paddingHorizontal: 4,
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
	bodyHeaderText: { fontSize: 18 },
	infoContainer: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
	},
	basicInfo: {
		width: '100%',
		height: vh / 3,
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
		width: '100%',
		height: vh / 2,
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
		width: '100%',
		height: vh / 3,
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

	deleteBillButton: {
		position: 'absolute',
		right: 0,
		backgroundColor: 'black',
		height: '106%',
		width: wh / 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	resetButton: {
		backgroundColor: 'black',
		width: '100%',
		height: '5%',
		borderRadius: 10,
		marginBottom: 32,
		justifyContent: 'center',
	},

	billContainer: {
		width: '100%',
		flex: 1,
	},
	billInfoContainer: {
		width: '100%',
		flex: 1,
		marginBottom: 32,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 4,
	},
	billInfo: {
		height: vh / 6,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		width: '90%',
	},
	billDay: {
		width: '100%',
		height: '30%',
		textAlign: 'center',
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
		width: '32%',
		height: '85%',
		justifyContent: 'center',
	},
	totalRemained: {
		borderRadius: 10,
		backgroundColor: 'black',
		width: '100%',
		height: vh / 8,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 16,
	},
	notiText: {
		color: 'white',
		fontSize: 17,
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
