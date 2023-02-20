import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Text,
	ScrollView,
	Modal
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

import { insertCustomer } from '../database/actions/customerActions';

import { EmptyDialog } from '../Dialogs/EmptyDialog';

export default function App({ navigation, route }) {
	const roomID = route.params.roomID;

	const [customerName, setCustomerName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [gender, setGender] = useState(false);
	const [address, setAddress] = useState('');
	const [citizenID, setCitizenID] = useState('');
	const [citizenIDDate, setCitizenIDDate] = useState('');
	const [citizenIDPlace, setCitizenIDPlace] = useState('');
	const [job, setJob] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [temporaryResidence, setTemporaryResidence] = useState(false);

	const [emptyDialogVisible, setEmptyDialogVisible] = useState(false);

	const handleAddCustomer = () => {
		const insertedCustomer = async () => {
			await insertCustomer({
				name: customerName,
				birthday: dateOfBirth,
				gender: gender,
				address: address,
				citizen_id: citizenID,
				citizen_id_date: citizenIDDate,
				citizen_id_place: citizenIDPlace,
				job: job,
				phone: phoneNumber,
				temporary_residence: temporaryResidence ? 1 : 0,
				room_id: roomID,
			}).catch((error) => { });
		};

		if (customerName === '' || dateOfBirth === '' || address === '') {
			setEmptyDialogVisible(true);
		}
		else {
			insertedCustomer();
			navigation.goBack();
		}
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
					{/* Name */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Họ tên*:</Text>
						</View>
						<View>
							<TextInput
								style={[
									styles.myBorder,
									{ paddingLeft: 8, fontSize: 20, height: 50 },
								]}
								onChangeText={(text) => {
									setCustomerName(text);
								}}
								placeholder="Nhập họ tên"
								maxLength={50}></TextInput>
						</View>
					</View>

					{/* Phone number */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Số điện thoại:</Text>
						</View>
						<View>
							<TextInput
								style={[
									styles.myBorder,
									{ paddingLeft: 8, fontSize: 20, height: 50 },
								]}
								onChangeText={(text) => {
									setPhoneNumber(text);
								}}
								placeholder="Nhập số điện thoại"
								keyboardType='numeric'
								maxLength={12}></TextInput>
						</View>
					</View>

					{/* DataOfBirth */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Ngày sinh*:</Text>
						</View>
						<View>
							<TextInput
								style={[
									styles.myBorder,
									{ paddingLeft: 8, fontSize: 20, height: 50 },
								]}
								onChangeText={(text) => {
									setDateOfBirth(text);
								}}
								placeholder="Nhập ngày sinh (dd/mm/yyyy)"
								maxLength={12}></TextInput>
						</View>
					</View>

					{/* Sex */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Giới tính:</Text>
						</View>
						<View style={[styles.row, { justifyContent: 'flex-start' }]}>
							<View
								style={{
									flexDirection: 'row',
									marginRight: 104,
								}}>
								<View>
									<Checkbox
										value={gender}
										onValueChange={() => {
											setGender(true);
										}}
									/>
								</View>
								<View style={{ marginLeft: 8 }}>
									<Text>Nam</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<View>
									<Checkbox
										value={!gender}
										onValueChange={() => {
											setGender(false);
										}}
									/>
								</View>
								<View style={{ marginLeft: 8 }}>
									<Text>Nữ</Text>
								</View>
							</View>
						</View>
					</View>

					{/* Address */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Địa chỉ thường trú*:</Text>
						</View>
						<View>
							<TextInput
								style={[
									styles.myBorder,
									{ paddingLeft: 8, fontSize: 20, height: 50 },
								]}
								onChangeText={(text) => {
									setAddress(text);
								}}
								placeholder="Nhập địa chỉ thường trú"
								maxLength={100}></TextInput>
						</View>
					</View>

					{/* Temporary Address */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Đăng ký tạm trú:</Text>
						</View>
						<View style={[styles.row, { justifyContent: 'flex-start' }]}>
							<View
								style={{
									flexDirection: 'row',
									marginRight: 104,
								}}>
								<View>
									<Checkbox
										value={temporaryResidence}
										onValueChange={() => {
											setTemporaryResidence(true);
										}}
									/>
								</View>
								<View style={{ marginLeft: 8 }}>
									<Text>Đã đăng ký</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<View>
									<Checkbox
										value={!temporaryResidence}
										onValueChange={() => {
											setTemporaryResidence(false);
										}}
									/>
								</View>
								<View style={{ marginLeft: 8 }}>
									<Text>Chưa đăng ký</Text>
								</View>
							</View>
						</View>
					</View>

					{/* CCCD */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={{ marginBottom: 16 }}>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>CCCD:</Text>
							</View>
							<View>
								<TextInput
									style={[
										styles.myBorder,
										{ paddingLeft: 8, fontSize: 20, height: 50 },
									]}
									onChangeText={(text) => {
										setCitizenID(text);
									}}
									placeholder="Nhập số CCCD"
									keyboardType='numeric'
									maxLength={15}></TextInput>
							</View>
						</View>

						<View style={styles.row}>
							{/* Day */}
							<View style={styles.itemRow}>
								<View style={styles.titleContainer}>
									<Text style={styles.title}>Ngày cấp</Text>
								</View>
								<View>
									<TextInput
										style={[
											styles.myBorder,
											{ paddingLeft: 8, fontSize: 20, height: 50 },
										]}
										onChangeText={(text) => {
											setCitizenIDDate(text);
										}}
										placeholder="Nhập ..."
										maxLength={10}></TextInput>
								</View>
							</View>
							{/* Place */}
							<View style={styles.itemRow}>
								<View style={styles.titleContainer}>
									<Text style={styles.title}>Nơi cấp</Text>
								</View>
								<View>
									<TextInput
										style={[
											styles.myBorder,
											{ paddingLeft: 8, fontSize: 20, height: 50 },
										]}
										onChangeText={(text) => {
											setCitizenIDPlace(text);
										}}
										placeholder="Nhập ..."
										maxLength={10}></TextInput>
								</View>
							</View>
						</View>
					</View>

					{/* Job */}
					<View style={[styles.item, styles.myBackground]}>
						<View>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>Nghề nghiệp:</Text>
							</View>
							<View>
								<TextInput
									style={[
										styles.myBorder,
										{ paddingLeft: 8, fontSize: 20, height: 50 },
									]}
									onChangeText={(text) => {
										setJob(text);
									}}
									placeholder="Nhập nghề nghiệp"
									maxLength={30}></TextInput>
							</View>
						</View>
					</View>

					{/* Add member button */}
					<TouchableOpacity
						style={styles.addButton}
						onPress={handleAddCustomer}>
						<View>
							<Text style={styles.textTitle}>HOÀN TẤT</Text>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={emptyDialogVisible}
				onRequestClose={() => setEmptyDialogVisible(false)}>
				<EmptyDialog
					setEmptyDialogVisible={setEmptyDialogVisible}
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
		backgroundColor: '#d9d9d9',
	},

	body: {
		height: '100%',
		marginTop: 8,
		width: '95%',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	item: {
		width: '100%',
		height: 'auto',
		paddingHorizontal: 8,
		paddingVertical: 8,
		marginBottom: 16,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	itemRow: {
		width: '45%',
	},
	titleContainer: {
		borderBottomWidth: 2,
		paddingBottom: 8,
		marginBottom: 8,
	},

	addButton: {
		backgroundColor: '#6cdb4e',
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		marginTop: 8,
		marginBottom: 16,
		width: '100%',
		alignItems: 'center',
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	textTitleStyle: {
		marginLeft: 32,
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
		borderRadius: 15,
		borderWidth: 2,
	},
});
