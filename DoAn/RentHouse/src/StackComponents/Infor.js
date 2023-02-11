import { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Alert,
} from 'react-native';


import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { fetchHouseInfo, updateHouseInfo } from '../database/actions/houseInfoActions';


export default function App({ navigation }) {
	const [houseName, setHouseName] = useState('');
	const [houseAddress, setHouseAddress] = useState('');
	const [housePhone, setHousePhone] = useState('');


	useEffect(() => {
		const loadHouseInfo = async () => {
			const houseInfo = await fetchHouseInfo()
				.catch((error) => console.log(error));

			setHouseName(houseInfo.name);
			setHouseAddress(houseInfo.address);
			setHousePhone(houseInfo.phone_number);

			console;
			console.log(houseInfo.name);
		};

		loadHouseInfo();
	}, []);

	const handleSave = async () => {
		const houseInfo = {
			name: houseName,
			address: houseAddress,
			phone_number: housePhone,
		};
		
		// thong bao thanh cong
		Alert.alert(
			'Thông báo',
			'Cập nhật thông tin thành công',
			[
				{
					text: 'OK',
					onPress: () => console.log('OK Pressed'),
				},
			],
			{ cancelable: false }
		);
		await updateHouseInfo(houseInfo, () => {
			navigation.navigate('Menu');
		});
	};

	return (
		<View style={styles.container}>
			{/* Body */}
			<View style={styles.body}>
				{/* House name */}
				<View style={styles.billContainer}>
					<Text style={[styles.billName]}>Tên trọ</Text>
					<View style={[styles.billValue, { justifyContent: 'center' }]}>
						<View style={[styles.billValueInput, { width: '95%' }]}>
							<TextInput
								style={[styles.textInput]}
								onChangeText={text => setHouseName(text)}
								defaultValue={houseName}
							/>
						</View>
					</View>
				</View>

				{/* House address */}
				<View style={styles.billContainer}>
					<Text style={[styles.billName]}>Địa chỉ</Text>
					<View style={[styles.billValue, { justifyContent: 'center' }]}>
						<View style={[styles.billValueInput, { width: '95%' }]}>
							<TextInput
								style={[styles.textInput]}
								onChangeText={text => setHouseAddress(text)}
								defaultValue={houseAddress}
							/>
						</View>
					</View>
				</View>

				{/* House phone */}
				<View style={styles.billContainer}>
					<Text style={[styles.billName]}>Số điện thoại</Text>
					<View style={[styles.billValue, { justifyContent: 'center' }]}>
						<View style={[styles.billValueInput, { width: '95%' }]}>
							<TextInput
								style={[styles.textInput]}
								onChangeText={text => setHousePhone(text)}
								defaultValue={housePhone}
								keyboardType="numeric"
							/>
						</View>
					</View>
				</View>

				{/* Save button */}
				<TouchableOpacity
					style={{
						backgroundColor: '#6bec4b',
						padding: 10,
						borderRadius: 10,
						margin: 10,
					}}
					onPress={handleSave}>
					<Text style={{ color: 'white', textAlign: 'center', fontWeight:'bold', fontSize:20 }}>Lưu thông tin</Text>
				</TouchableOpacity>

			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	body: {
	},
	billContainer: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		margin: 8,
	},
	billName: {
		fontSize: 16,
		fontWeight: 'bold',
	},

	billValue: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	billValueInput: {
		padding: 8,
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 8,
		borderColor: 'black',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	textInput: {
		height: "100%",
		width: '100%',
	},
});
