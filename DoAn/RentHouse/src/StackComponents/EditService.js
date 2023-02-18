import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Modal
} from 'react-native';
import { useEffect, useState } from 'react';

import { formatVNCurrency } from '../utils/utils';
import {
	fetchServiceDetails,
	updateServicePrice,
} from '../database/actions/serviceActions';
import { EditSuccessDialog } from '../Dialogs/EditSuccessDialog';

export default function App({ navigation }) {
	const [water, setWater] = useState();
	const [electricity, setElectricity] = useState();
	const [garbage, setGarbage] = useState();
	const [rentallFee, setRentallFee] = useState();
	const [editSuccessDialogVisible, setEditSuccessDialogVisible] = useState(false)

	useEffect(() => {
		const loadService = async (service_name, setService) => {
			const service = await fetchServiceDetails(service_name)
				.catch((error) => console.log(error));

			setService(formatVNCurrency(service.price, 2));
		};

		loadService('Nước', setWater);
		loadService('Điện', setElectricity);
		loadService('Rác', setGarbage);
		loadService('Phòng', setRentallFee);
	}, []);

	const handleSave = () => {
		const updateService = async (service_name, service_price) => {
			await updateServicePrice(service_name, service_price).catch((error) =>
				console.log(error)
			);
		};

		updateService('Nước', Number(water.replace(/\W+/g, '')));
		updateService('Điện', Number(electricity.replace(/\W+/g, '')));
		updateService('Rác', Number(garbage.replace(/\W+/g, '')));
		updateService('Phòng', Number(rentallFee.replace(/\W+/g, '')));

		setEditSuccessDialogVisible(true)
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
					}}>
					{/* Garbage */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Rác:</Text>
						</View>
						<View>
							<TextInput
								style={[
									styles.myBorder,
									{ fontSize: 20, paddingLeft: 8, height: 40 },
								]}
								onChangeText={(text) => {
									setGarbage(formatVNCurrency(text.replace(/\W+/g, ''), 2));
								}}
								placeholder="Nhập ..."
								defaultValue={garbage}
								editable={true}
								multiline={false}
								maxLength={256}
							/>
						</View>
					</View>

					{/* Electricity */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Điện:</Text>
						</View>
						<View>
							<TextInput
								style={[
									styles.myBorder,
									{ fontSize: 20, paddingLeft: 8, height: 40 },
								]}
								onChangeText={(text) => {
									setElectricity(formatVNCurrency(text.replace(/\W+/g, ''), 2));
								}}
								placeholder="Nhập ..."
								defaultValue={electricity}
								editable={true}
								multiline={false}
								maxLength={256}
							/>
						</View>
					</View>

					{/* Water */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Nước:</Text>
						</View>
						<View>
							<TextInput
								style={[
									styles.myBorder,
									{ fontSize: 20, paddingLeft: 8, height: 40 },
								]}
								onChangeText={(text) => {
									setWater(formatVNCurrency(text.replace(/\W+/g, ''), 2));
								}}
								placeholder="Nhập ..."
								defaultValue={water}
								editable={true}
								multiline={false}
								maxLength={256}
							/>
						</View>
					</View>

					{/* Rental fee */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Tiền phòng:</Text>
						</View>
						<View>
							<TextInput
								style={[
									styles.myBorder,
									{ fontSize: 20, paddingLeft: 8, height: 40 },
								]}
								onChangeText={(text) => {
									setRentallFee(formatVNCurrency(text.replace(/\W+/g, ''), 2));
								}}
								placeholder="Nhập ..."
								defaultValue={rentallFee}
								editable={true}
								multiline={false}
								maxLength={256}
							/>
						</View>
					</View>

					{/* Save edit  */}
					<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
						<View>
							<Text style={styles.textTitleWhite}>LƯU CHỈNH SỬA</Text>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={editSuccessDialogVisible}
				onRequestClose={() => { setEditSuccessDialogVisible(false); }}>
				<EditSuccessDialog
					setEditSuccessDialogVisible={setEditSuccessDialogVisible}
					navigation={navigation}
				/>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
		backgroundColor:'#d9d9d9',
	},

	body: {
		width: '95%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		paddingTop: 16,
	},
	item: {
		width: '100%',
		height: 'auto',
		minHeight: 100,
		paddingHorizontal: 8,
		paddingTop: 8,
		marginBottom: 32,
	},
	saveButton: {
		backgroundColor: '#6bec4b',
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		marginBottom: 16,
		width: '100%',
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 2,
		paddingBottom: 8,
		marginBottom: 8,
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
