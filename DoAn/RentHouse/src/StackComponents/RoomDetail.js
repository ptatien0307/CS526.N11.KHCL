import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { fetchRoomDetails, fetchRoomMemberList, fetchRoomBillList } from '../database/actions/roomActions';
import { deleteCustomer } from '../database/actions/customerActions';
import { useForceUpdate } from '../utils/utils';


export default function App({ navigation, route }) {
	const selected_room_id = route.params.selected_room_id;

	const isFocused = useIsFocused();
	const [forceUpdate, forceUpdateId] = useForceUpdate();

	const [memberList, setMemberList] = useState([]);
	const [billList, setBillList] = useState([]);
	const [room, setRoom] = useState({});
	const [mountInfo, setMountInfo] = useState(true);

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
			console.log(memberList);
		};

		const loadBillList = async () => {
			const billList = await fetchRoomBillList(selected_room_id)
				.catch((error) => console.log(error));
			setBillList(billList);
		};

		loadRoomDetails();
		loadMemberList();
		loadBillList();
	}, [isFocused, forceUpdateId]);

	const totalRemained = billList.reduce((res, curr) => {
		return res + curr.remained;
	}, 0);

	const handleDeleteMember = async (memberID) => {
		await deleteCustomer(memberID, forceUpdate)
			.catch((error) => console.log(error));
	};

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
							handleDeleteMember(item.id);
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
							<Text>T???ng ti???n:</Text>
							<Text style={styles.textBold}>{item.total}??</Text>
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
								<Text>???? thu:</Text>
								<Text style={styles.textBold}>
									{item.total - item.remained}??
								</Text>
							</View>
						</View>

						{/* Remained */}
						<View style={[styles.myBorder, styles.money]}>
							<Text>C??n l???i: </Text>
							<Text style={styles.textBold}>
								{item.remained}??
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
					<Text style={styles.textBold}>TH??NG TIN</Text>
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
					<Text style={styles.textBold}>L???CH S??? H??A ????N</Text>
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
								<Text>Th??ng tin c?? b???n</Text>
								<TouchableOpacity 
									onPress={()=>{
										navigation.navigate('EditBasicInfo', {
											roomID: room.id
										})
									}}
								>
									<FontAwesomeIcon
										name="edit"
										size={20}
									/>
								</TouchableOpacity>
							</View>
							
							<View style={styles.infoRow}>
								{/* Room name */}
								<View
									style={[
										styles.rowItem,
										styles.myBackground,
									]}
								>
									<View>
										<Text>T??n ph??ng:</Text>
										<Text style={styles.textBold}>
											{room.name}
										</Text>
									</View>
								</View>

								{/* Move in day */}
								<View
									style={[
										styles.rowItem,
										styles.myBackground,
									]}
								>
									<View>
										<Text>Ng??y ?????n:</Text>
										<Text style={styles.textBold}>
											{room.move_in_date}
										</Text>
									</View>
								</View>
							</View>

							<View style={styles.infoRow}>
								{/* Rental fee */}
								<View
									style={[
										styles.rowItem,
										styles.myBackground,
									]}
								>
									<View>
										<Text>Gi?? thu??:</Text>
										<Text style={styles.textBold}>
											{room.rental_fee}
										</Text>
									</View>
								</View>

								{/* Deposit */}
								<View
									style={[
										styles.rowItem,
										styles.myBackground,
									]}
								>
									<View>
										<Text>Ti???n c???c:</Text>
										<Text style={styles.textBold}>
											{room.deposit ? room.deposit : 'Kh??ng c??'}
										</Text>
									</View>
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
								<Text>Th??ng tin ng?????i ???</Text>

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
							<SafeAreaView style={[styles.memberContainer]}>
								<FlatList
									nestedScrollEnabled={true}
									data={memberList}
									renderItem={renderMembers}
									keyExtractor={(item) => item.id}
								></FlatList>
							</SafeAreaView>
						</View>

						{/* Water and electricity */}
						<View style={[styles.serviceInfo, styles.myBorder]}>
							<View
								style={[
									styles.bodyHeader,
									{ height: '20%', marginBottom: 16 },
								]}
							>
								<Text>Th??ng tin d???ch v???</Text>
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
											{room.donGiaNuoc} ??/kh???i
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
										<Text>{room.donGiaDien} ??/kwh</Text>
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
									T???ng s??? ti???n ph??ng n??y c??n thi???u l??:{' '}
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
						X??A TH??NG TIN PH??NG
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
		marginBottom: 4,
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
		height: '85%',
		flex: 1
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
