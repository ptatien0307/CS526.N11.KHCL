import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from 'react';

import {
	alertDeleteDialog,
	alertEmptyDialog,
	editSuccessDialog,
} from '../Dialogs/dialog.js';

import { fetchCustomerDetails, updateCustomer } from '../database/actions/customerActions';

export default function App({ navigation, route }) {
	const memberID = route.params.memberID;

	const [memberDetails, setMemberDetails] = useState({});

	const [customerName, setCustomerName] = useState(null);
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [address, setAddress] = useState(null);
	const [citizenID, setCitizenID] = useState(null);
	const [citizenIDDate, setCitizenIDDate] = useState(null);
	const [citizenIDPlace, setCitizenIDPlace] = useState(null);
	const [job, setJob] = useState(null);

	const [gender, setGender] = useState(null);

	useEffect(() => {
		const loadCustomerDetails = async () => {
			const customerDetails = await fetchCustomerDetails(memberID)
				.catch((error) => console.log(error));

			setMemberDetails(customerDetails);
			setCustomerName(customerDetails.name);
			setDateOfBirth(customerDetails.birthday);
			setAddress(customerDetails.address);
			setCitizenID(customerDetails.citizen_id);
			setCitizenIDDate(customerDetails.citizen_id_date);
			setCitizenIDPlace(customerDetails.citizen_id_place);
			setJob(customerDetails.job);
			setGender(Boolean(customerDetails.gender));
		};

		loadCustomerDetails();
	}, []);



	// BACK-END ___ EDIT MEMBER INFORMATION
	const handleSave = () => {
		console.log(customerName, dateOfBirth, address, citizenID, citizenIDDate, citizenIDPlace, job);

		if (customerName === '' ||
			dateOfBirth === '' ||
			address === '' ||
			citizenID === '' ||
			citizenIDDate === '' ||
			citizenIDPlace === '' ||
			job === ''
		)
			alertEmptyDialog();
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
					// phone: ,
					// temporary_residence: ,
				})
					.catch((error) => console.log(error));
			};

			updatedMember();

			navigation.goBack();
			editSuccessDialog();
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
					}}
				>
					{/* Name */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>H??? t??n:</Text>
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
								maxLength={256}
							></TextInput>
						</View>
					</View>

					{/* DataOfBirth */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Ng??y sinh:</Text>
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
								maxLength={256}
							></TextInput>
						</View>
					</View>

					{/* Sex */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Gi???i t??nh:</Text>
						</View>
						<View
							style={[
								styles.row,
								{ justifyContent: 'flex-start' },
							]}
						>
							<View
								style={{
									flexDirection: 'row',
									marginRight: 104,
								}}
							>
								<View>
									<Checkbox
										value={gender}
										onValueChange={setGender}
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
										onValueChange={setGender}
									/>
								</View>
								<View style={{ marginLeft: 8 }}>
									<Text>N???</Text>
								</View>
							</View>
						</View>
					</View>

					{/* Address */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>
								?????a ch??? th?????ng tr??:
							</Text>
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
								maxLength={256}
							></TextInput>
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
									maxLength={256}
								></TextInput>
							</View>
						</View>

						<View style={styles.row}>
							{/* Day */}
							<View style={styles.itemRow}>
								<View style={styles.titleContainer}>
									<Text style={styles.title}>Ng??y c???p</Text>
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
										maxLength={256}
									></TextInput>
								</View>
							</View>
							{/* Place */}
							<View style={styles.itemRow}>
								<View style={styles.titleContainer}>
									<Text style={styles.title}>N??i c???p</Text>
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
										maxLength={256}
									></TextInput>
								</View>
							</View>
						</View>
					</View>

					{/* Job */}
					<View style={[styles.item, styles.myBackground]}>
						<View>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>Ngh??? nghi???p:</Text>
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
									maxLength={256}
								></TextInput>
							</View>
						</View>
					</View>

					{/* Add room button */}
					<TouchableOpacity
						style={styles.addButton}
						onPress={handleSave}
					>
						<View>
							<Text style={styles.textTitle}>L??U CH???NH S???A</Text>
						</View>
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
		height: '100%',
		marginTop: 8,
		width: '90%',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	item: {
		width: '100%',
		height: 'auto',
		minHeight: 75,
		paddingHorizontal: 8,
		paddingTop: 8,
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
		fontSize: 18,
	},

	addButton: {
		backgroundColor: 'black',
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 15,
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
		borderRadius: 15,
		borderWidth: 2,
	},
});
