import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Modal
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from 'react';


import {EmptyDialog} from '../Dialogs/EmptyDialog'
import {EditSuccessDialog} from '../Dialogs/EditSuccessDialog';

import {
	fetchCustomerDetails,
	updateCustomer,
} from '../database/actions/customerActions';

export default function App({ navigation, route }) {
	const memberID = route.params.memberID;

	const [memberDetails, setMemberDetails] = useState({});

	const [customerName, setCustomerName] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [address, setAddress] = useState(null);
	const [temporaryResidence, setTemporaryResidence] = useState(null);
	const [citizenID, setCitizenID] = useState(null);
	const [citizenIDDate, setCitizenIDDate] = useState(null);
	const [citizenIDPlace, setCitizenIDPlace] = useState(null);
	const [job, setJob] = useState(null);

	const [gender, setGender] = useState(null);

	const [emptyDialogVisible, setEmptyDialogVisible] = useState(false);
	const [editSuccessDialogVisible, setEditSuccessDialogVisible] = useState(false);

	useEffect(() => {
		const loadCustomerDetails = async () => {
			const customerDetails = await fetchCustomerDetails(memberID).catch(
				(error) => console.log(error)
			);

			setMemberDetails(customerDetails);
			setCustomerName(customerDetails.name);
			setDateOfBirth(customerDetails.birthday);
			setAddress(customerDetails.address);
			setCitizenID(customerDetails.citizen_id);
			setCitizenIDDate(customerDetails.citizen_id_date);
			setCitizenIDPlace(customerDetails.citizen_id_place);
			setJob(customerDetails.job);
			setPhoneNumber(customerDetails.phone);
			setTemporaryResidence(customerDetails.temporary_residence);
			setGender(Boolean(customerDetails.gender));
		};

		loadCustomerDetails();
	}, []);

	// BACK-END ___ EDIT MEMBER INFORMATION
	const handleSave = () => {
		console.log(
			customerName,
			dateOfBirth,
			address,
			citizenID,
			citizenIDDate,
			citizenIDPlace,
			job,
			phoneNumber
		);

		if (
			customerName === '' ||
			dateOfBirth === '' ||
			address === '' ||
			citizenID === '' ||
			citizenIDDate === '' ||
			citizenIDPlace === '' ||
			phoneNumber === '' ||
			job === ''
		)
			setEmptyDialogVisible(true);
		else {
			const updatedMember = async () => {
				await updateCustomer({
					...memberDetails,
					name: customerName,
					birthday: dateOfBirth,
					gender: gender,
					address: address,
					citizen_id: citizenID,
					citizen_id_date: citizenIDDate,
					citizen_id_place: citizenIDPlace,
					job: job,
					phone: phoneNumber,
					temporary_residence: temporaryResidence,
				}).catch((error) => console.log(error));
			};

			updatedMember();
			setEditSuccessDialogVisible(true);
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
							<Text style={styles.title}>Họ tên:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, styles.input]}
								onChangeText={(text) => {
									setCustomerName(text);
								}}
								defaultValue={customerName}
								editable={true}
								multiline={false}
								maxLength={256}></TextInput>
						</View>
					</View>

					{/* Phone number */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Số điện thoại:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, styles.input]}
								onChangeText={(text) => {
									setPhoneNumber(text);
								}}
								defaultValue={phoneNumber}
								editable={true}
								multiline={false}
								maxLength={256}></TextInput>
						</View>
					</View>

					{/* DataOfBirth */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Ngày sinh:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, styles.input]}
								onChangeText={(text) => {
									setDateOfBirth(text);
								}}
								defaultValue={dateOfBirth}
								editable={true}
								multiline={false}
								maxLength={256}></TextInput>
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
							<Text style={styles.title}>Địa chỉ thường trú:</Text>
						</View>
						<View>
							<TextInput
								style={[styles.myBorder, styles.input]}
								onChangeText={(text) => {
									setAddress(text);
								}}
								defaultValue={address}
								editable={true}
								multiline={false}
								maxLength={256}></TextInput>
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
									style={[styles.myBorder, styles.input]}
									onChangeText={(text) => {
										setCitizenID(text);
									}}
									defaultValue={citizenID}
									editable={true}
									multiline={false}
									maxLength={256}></TextInput>
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
										style={[styles.myBorder, styles.input]}
										onChangeText={(text) => {
											setCitizenIDDate(text);
										}}
										defaultValue={citizenIDDate}
										editable={true}
										multiline={false}
										maxLength={256}></TextInput>
								</View>
							</View>
							{/* Place */}
							<View style={styles.itemRow}>
								<View style={styles.titleContainer}>
									<Text style={styles.title}>Nơi cấp</Text>
								</View>
								<View>
									<TextInput
										style={[styles.myBorder, styles.input]}
										onChangeText={(text) => {
											setCitizenIDPlace(text);
										}}
										defaultValue={citizenIDPlace}
										editable={true}
										multiline={false}
										maxLength={256}></TextInput>
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
									style={[styles.myBorder, styles.input]}
									onChangeText={(text) => {
										setJob(text);
									}}
									defaultValue={job}
									editable={true}
									multiline={false}
									maxLength={256}></TextInput>
							</View>
						</View>
					</View>

					{/* Save edit  */}
					<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
						<View>
							<Text style={styles.textTitle}>LƯU CHỈNH SỬA</Text>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={emptyDialogVisible}
				onRequestClose={() => { setEmptyDialogVisible(false); }}>
				<EmptyDialog
					setEmptyDialogVisible={setEmptyDialogVisible}
				/>
			</Modal>
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
		minHeight: 75,
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 2,
		marginBottom: 8,
	},
	input: {
		paddingLeft: 8,
		fontSize: 20,
	},

	saveButton: {
		backgroundColor: '#6cdb4e',
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
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
		borderRadius: 15,
		borderWidth: 2,
	},
});
