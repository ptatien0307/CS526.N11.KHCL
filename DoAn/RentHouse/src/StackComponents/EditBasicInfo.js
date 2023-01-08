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
import { fetchRoomDetails } from '../database/actions/roomActions';
import { useForceUpdate } from '../utils/utils';


export default function App({ navigation, route }) {
	const roomID = route.params.roomID;
	const [room, setRoom] = useState({});


	const isFocused = useIsFocused();
	const [forceUpdate, forceUpdateId] = useForceUpdate();


	useEffect(() => {
		const loadRoomDetails = async () => {
			const roomDetails = await fetchRoomDetails(roomID)
				.catch((error) => console.log(error));
			setRoom(roomDetails);
		};
		
		loadRoomDetails();
	}, [isFocused, forceUpdateId]);

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
								onChangeText={() => {}}
								placeholder="Nhập ..."
								defaultValue={room.name}
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
								onChangeText={() => {
								}}
								placeholder="Nhập ..."
								defaultValue={room.move_in_date}
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
								onChangeText={() => {
								}}
								placeholder="Nhập ..."
								defaultValue={String(room.rental_fee)}
								editable={true}
								multiline={false}
								maxLength={256}
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
								onChangeText={() => {
								}}
								placeholder="Nhập ..."
								defaultValue={room.deposit ? String(room.deposit) : 'Không có'}
								editable={true}
								multiline={false}
								maxLength={256}
							>

							</TextInput>
						</View>
					</View>

					<TouchableOpacity
					style={styles.saveButton}
						onPress={() => {
							// Handle reset room information
						}}
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
	},

	body: {
		marginTop: 8,
		width: '90%',
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
		backgroundColor: 'black',
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
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
	},
	myBorder: {
		borderColor: 'black',
		borderRadius: 17,
		borderWidth: 2,
	},
});
