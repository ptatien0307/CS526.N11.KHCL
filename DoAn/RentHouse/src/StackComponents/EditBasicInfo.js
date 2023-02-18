import {
	StyleSheet,
	View,
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { fetchRoomDetails, updateRoom } from '../database/actions/roomActions';
import { formatVNCurrency } from '../utils/utils';


export default function App({ navigation, route }) {
	const selected_room_id = route.params.selected_room_id;
	const [room, setRoom] = useState({});

	const [roomName, setRoomName] = useState('');
	const [rentalFee, setRentalFee] = useState('');
	const [deposit, setDeposit] = useState('');
	const [moveInDate, setMoveInDate] = useState('');

	const isFocused = useIsFocused();

	const handleSaveRoomEditedInfo = async () => {
		const temp = {
			...room,
			name: roomName,
			move_in_date: moveInDate,
			rental_fee: parseInt(rentalFee.replace(/\W+/g, '')),
			deposit: parseInt(deposit.replace(/\W+/g, '')),
		};

		await updateRoom(temp)
			.catch((error) => { });

		navigation.goBack();
	};

	useEffect(() => {
		const loadRoomDetails = async () => {
			const roomDetails = await fetchRoomDetails(selected_room_id)
				.catch((error) => { });

			setRoom(roomDetails);
			setRoomName(roomDetails.name);
			setMoveInDate(roomDetails.move_in_date);
			setRentalFee(formatVNCurrency(roomDetails.rental_fee, 2));
			setDeposit(formatVNCurrency(roomDetails.deposit, 2));
		};

		loadRoomDetails();
	}, [isFocused]);

	return (
		<View style={styles.container}>
			{/* Body */}
			<View style={[styles.body]}>
				<ScrollView
					style={{ width: '100%' }}
					contentContainerStyle={{
						flexGrow: 1,
						alignItems: 'center',
					}}
				>
					{/* Room Name */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Tên phòng:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, { fontSize: 17, paddingLeft: 8, height: 40 }]}
								onChangeText={(e) => {
									setRoomName(e);
								}}
								placeholder="Nhập ..."
								defaultValue={roomName}
								editable={true}
								multiline={false}
								maxLength={256}
							>
							</TextInput>
						</View>
					</View>


					{/* Move in date */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Ngày chuyển đến:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, { fontSize: 17, paddingLeft: 8, height: 40 }]}
								onChangeText={(e) => {
									setMoveInDate(e);
								}}
								placeholder="Nhập ..."
								defaultValue={moveInDate}
								editable={true}
								multiline={false}
								maxLength={256}
							>

							</TextInput>
						</View>
					</View>

					{/* Rental fee */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Giá thuê phòng:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, { fontSize: 17, paddingLeft: 8, height: 40 }]}
								onChangeText={(e) => {
									setRentalFee(formatVNCurrency(e.replace(/\W+/g, ''), 2));
								}}
								placeholder="Nhập ..."
								defaultValue={rentalFee}
								multiline={false}
								maxLength={256}
								keyboardType={'number-pad'}
							>
							</TextInput>
						</View>
					</View>

					{/* Deposit */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Tiền cọc:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, { fontSize: 17, paddingLeft: 8, height: 40 }]}
								onChangeText={(e) => {
									setDeposit(formatVNCurrency(e.replace(/\W+/g, ''), 2));
								}}
								placeholder="Nhập tiền cọc"
								defaultValue={deposit}
								multiline={false}
								maxLength={256}
								keyboardType={'number-pad'}
							>

							</TextInput>
						</View>
					</View>

					<TouchableOpacity
						style={styles.saveButton}
						onPress={handleSaveRoomEditedInfo}
					>
						<Text style={styles.textTitleWhite}>
							LƯU THÔNG TIN CHỈNH SỬA
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
		backgroundColor: '#d9d9d9'
	},

	body: {
		marginTop: 8,
		width: '95%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	item: {
		width: '100%',
		height: 'auto',
		minHeight: 100,
		paddingHorizontal: 8,
		paddingTop: 8,
		marginBottom: 16,
	},


	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 2,
		paddingBottom: 8,
		marginBottom: 8,
	},

	saveButton: {
		backgroundColor: '#6cdb4e',
		width: '100%',
		height: '7%',
		borderRadius: 10,
		marginBottom: 12,
		justifyContent: 'center'
	},
	textTitleWhite: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	stackTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	myBackground: {
		backgroundColor: 'white',
		borderRadius: 10,
	},
	myBorder: {
		borderColor: 'black',
		borderRadius: 17,
		borderWidth: 2,
	},
});
