import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { fetchRoomDetails, fetchRoomMemberList, fetchRoomBillList } from '../database/actions/roomActions';


export default function App({ navigation, route }) {
	const selected_room_id = route.params.selected_room_id;
	const [memberList, setMemberList] = useState([]);
	const [billList, setBillList] = useState([]);
	const [room, setRoom] = useState({});

	useEffect(() => {
		const loadRoomDetails = async () => {
			const roomDetails = await fetchRoomDetails(selected_room_id)
				.catch((error) => console.log(error));
			setRoom(roomDetails);
		};

		const loadMemberList = async () => {
			const memberList = await fetchRoomMemberList(selected_room_id)
				.catch((error) => console.log(error));
			setMemberList(memberList);
		};

		const loadBillList = async () => {
			const billList = await fetchRoomBillList(selected_room_id)
				.catch((error) => console.log(error));
			setBillList(billList);
		};

		loadRoomDetails();
		loadMemberList();
		loadBillList();
	}, []);

	let totalRemained = billList.reduce((res, curr) => {
		return res + curr.remained;
	}, 0);

	const [mountInfo, setMountInfo] = useState(true);

	const renderMembers = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('MemberDetail', {
						memberID: item.id,
					});
				}}
			>
				<View style={[styles.member, styles.myBackground]}>
					{/* Member icon */}
					<FontAwesomeIcon
						name="user"
						size={20}
						style={{ marginRight: 32 }}
					/>

					{/* Member name */}
					<Text>{item.name}</Text>

					{/* Delete member icon */}
					<TouchableOpacity
						style={styles.deleteIcon}
						onPress={() => {
							// Handle delete member
						}}
					>
						<FontAwesomeIcon
							name="remove"
							size={25}
							style={[styles.icon]}
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
				}}
			>
				<View style={[styles.billInfo, styles.myBackground]}>
					{/* Bill month year */}
					<View style={styles.billDay}>
						<Text style={styles.textTitle}> {item.created_at}</Text>
					</View>

					{/* Bill money: total, collected, remained */}
					<View style={styles.billMoney}>
						{/* Total */}
						<View style={[styles.myBorder, styles.money]}>
							<Text>Tổng tiền:</Text>
							<Text style={styles.textBold}>{item.total}đ</Text>
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
							]}
						>
							<View>
								<Text>Đã thu:</Text>
								<Text style={styles.textBold}>
									{item.total - item.remained}đ
								</Text>
							</View>
						</View>

						{/* Remained */}
						<View style={[styles.myBorder, styles.money]}>
							<Text>Còn lại: </Text>
							<Text style={styles.textBold}>
								{item.remained}đ
							</Text>
						</View>
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
					style={[
						styles.headerBtn,
						{ borderBottomWidth: mountInfo ? 4 : 0 },
					]}
					onPress={() => {
						if (!mountInfo) setMountInfo(!mountInfo);
					}}
				>
					<Text style={styles.textBold}>THÔNG TIN</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.headerBtn,
						{ borderBottomWidth: !mountInfo ? 4 : 0 },
					]}
					onPress={() => {
						if (mountInfo) setMountInfo(!mountInfo);
					}}
				>
					<Text style={styles.textBold}>LỊCH SỬ HÓA ĐƠN</Text>
				</TouchableOpacity>
			</View>

			{/* Body */}
			<ScrollView
				style={{ width: '100%', marginTop: 72 }}
				contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
			>
				{/* View info */}
				{mountInfo && (
					<View style={styles.infoContainer}>
						{/* View room details */}
						<View style={[styles.basicInfo, styles.myBorder]}>
							<View style={styles.bodyHeader}>
								<Text>Thông tin cơ bản</Text>
							</View>

							<View style={styles.infoRow}>
								{/* Room name */}
								<View
									style={[
										styles.rowItem,
										styles.myBackground,
									]}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('EditModal', {
												editContent: room.name,
											});
										}}
									>
										<Text>Tên phòng:</Text>
										<Text style={styles.textBold}>
											{room.name}
										</Text>
									</TouchableOpacity>
								</View>

								{/* Contract day */}
								<View
									style={[
										styles.rowItem,
										styles.myBackground,
									]}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('EditModal', {
												editContent:
													room.move_in_date,
											});
										}}
									>
										<Text>Ngày đến:</Text>
										<Text style={styles.textBold}>
											{room.move_in_date}
										</Text>
									</TouchableOpacity>
								</View>
							</View>

							<View style={styles.infoRow}>
								{/* Price */}
								<View
									style={[
										styles.rowItem,
										styles.myBackground,
									]}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('EditModal', {
												editContent: room.rental_fee,
											});
										}}
									>
										<Text>Giá thuê:</Text>
										<Text style={styles.textBold}>
											{room.rental_fee}
										</Text>
									</TouchableOpacity>
								</View>

								{/* Deposit */}
								<View
									style={[
										styles.rowItem,
										styles.myBackground,
									]}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('EditModal', {
												editContent: room.deposit,
											});
										}}
									>
										<Text>Tiền cọc:</Text>
										<Text style={styles.textBold}>
											{room.deposit ? room.deposit : 'Không có'}
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>

						{/* View members */}
						<View style={[styles.memberInfo, styles.myBorder]}>
							<View
								style={[
									styles.bodyHeader,
									{ height: '10%', marginBottom: 16 },
								]}
							>
								<Text>Thông tin người ở</Text>

								<TouchableOpacity
									onPress={() => {
										// Navigate to AddMember screen
										navigation.navigate('AddMember', {
											roomID: room.id,
										});
									}}
								>
									<FontAwesomeIcon
										name="plus-circle"
										size={20}
									/>
								</TouchableOpacity>
							</View>

							{/* View members  */}
							<View style={[styles.memberContainer]}>
								<FlatList
									data={memberList}
									renderItem={renderMembers}
									keyExtractor={(item) => item.id}
								></FlatList>
							</View>
						</View>

						{/* Water and electricity */}
						<View style={[styles.serviceInfo, styles.myBorder]}>
							<View
								style={[
									styles.bodyHeader,
									{ height: '20%', marginBottom: 16 },
								]}
							>
								<Text>Thông tin dịch vụ</Text>
							</View>
							<View style={[styles.serviceContainer]}>
								<View
									style={[
										styles.service,
										styles.myBackground,
									]}
								>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
										}}
									>
										<IonIcon
											name="water"
											size={20}
											style={{ marginRight: 20 }}
										/>
										<Text>
											{room.donGiaNuoc} đ/khối
										</Text>
									</View>
									<View
										style={[
											styles.lastestUnit,
											styles.myBorder,
										]}
									>
										<Text>{room.old_water_number}</Text>
									</View>
								</View>

								<View
									style={[
										styles.service,
										styles.myBackground,
									]}
								>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
										}}
									>
										<FontAwesomeIcon
											name="bolt"
											size={20}
											style={{
												marginLeft: 4,
												marginRight: 26,
											}}
										/>
										<Text>{room.donGiaDien} đ/kwh</Text>
									</View>
									<View
										style={[
											styles.lastestUnit,
											styles.myBorder,
										]}
									>
										<Text>{room.old_electricity_number}</Text>
									</View>
								</View>
							</View>
						</View>
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
									}}
								>
									{totalRemained}
								</Text>
							</View>
						</View>

						<FlatList
							data={billList}
							renderItem={renderBills}
							keyExtractor={(item) => item.id}
						></FlatList>
					</View>
				)}

				<TouchableOpacity
					style={styles.deleteButton}
					onPress={() => {
						// Handle reset room information
					}}
				>
					<Text style={styles.textTitleWhite}>
						XÓA THÔNG TIN PHÒNG
					</Text>
				</TouchableOpacity>
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
	},
	infoContainer: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
	},
	basicInfo: {
		width: '90%',
		height: 150,
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
		height: 'auto',
		minHeight: 50,
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
		height: 150,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 8,
		marginBottom: 8,
	},
	serviceContainer: {
		width: '100%',
		height: '60%',
		justifyContent: 'space-around',
	},
	service: {
		flexDirection: 'row',
		marginVertical: 4,
		height: '45%',
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
		right: 8,
	},
	deleteButton: {
		backgroundColor: 'black',
		width: '90%',
		height: '5%',
		borderRadius: 10,
		marginBottom: 12,
		justifyContent: 'center'
	},

	billContainer: {
		height: '100%',
		width: '90%',
		padding: 8,
	},
	billInfo: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		paddingVertical: 8,
		marginBottom: 8,
		width: '100%',
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
		height: '10%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 16,
		padding: 8,
	},

	stackTitle: {
		marginLeft: 32,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
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
