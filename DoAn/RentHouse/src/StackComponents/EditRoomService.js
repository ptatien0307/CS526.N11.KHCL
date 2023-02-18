import {
	StyleSheet,
	View,
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import { useEffect, useState } from 'react';
import { fetchRoomDetails } from '../database/actions/roomActions';
import { updateRoomWaterElectricityNumber } from '../database/actions/roomActions';


export default function App({ navigation, route }) {
	const roomID = route.params.roomID;
	const [old_electricity_number, setOldElectricityNumber] = useState('');
	const [old_water_number, setOldWaterNumber] = useState('');


	useEffect(() => {
		const loadRoomDetails = async () => {
			const roomDetails = await fetchRoomDetails(roomID)
				.catch((error) => { });

			setOldElectricityNumber(roomDetails.old_electricity_number.toString());
			setOldWaterNumber(roomDetails.old_water_number.toString());
		};

		loadRoomDetails();
	}, []);

	const handleSave = async () => {
		await updateRoomWaterElectricityNumber(
			roomID,
			parseInt(old_water_number),
			parseInt(old_electricity_number)
		)
			.catch((error) => { });

		navigation.goBack();
	};

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
					{/* Water */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Số nước:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, { fontSize: 17, paddingLeft: 8, height: 40 }]}
								onChangeText={(text) => {
									setOldWaterNumber(text);
								}}
								placeholder="Nhập ..."
								defaultValue={old_water_number}
								editable={true}
								multiline={false}
								maxLength={256}
								keyboardType="numeric"
							>
							</TextInput>
						</View>
					</View>


					{/* Electricity */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Số điện:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, { fontSize: 17, paddingLeft: 8, height: 40 }]}
								onChangeText={(text) => {
									setOldElectricityNumber(text);
								}}
								placeholder="Nhập ..."
								defaultValue={old_electricity_number}
								editable={true}
								multiline={false}
								maxLength={256}
								keyboardType="numeric"
							>

							</TextInput>
						</View>
					</View>



					<TouchableOpacity
						style={styles.saveButton}
						onPress={handleSave}
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
		backgroundColor: '#d9d9d9',
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
