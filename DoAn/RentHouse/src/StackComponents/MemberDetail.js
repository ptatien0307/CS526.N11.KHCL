import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { fetchCustomerDetails } from '../database/actions/customerActions';

export default function App({ navigation, route }) {
	const memberID = route.params.memberID;

	const isFocused = useIsFocused();
	const [member, setMember] = useState({});

	useEffect(() => {
		const loadCustomerDetails = async () => {
			const customerDetails = await fetchCustomerDetails(memberID).catch((error) => { });

			setMember(customerDetails);
		};

		loadCustomerDetails();
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
					}}>
					{/* Name */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Họ tên:</Text>
						</View>
						<View>
							<Text style={{ fontSize: 20 }}>{member.name}</Text>
						</View>
					</View>

					{/* Phone number */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Số điện thoại:</Text>
						</View>
						<View>
							<Text style={{ fontSize: 20 }}>{member.phone}</Text>
						</View>
					</View>

					{/* DataOfBirth */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Ngày sinh:</Text>
						</View>

						<View>
							<Text style={{ fontSize: 20 }}>{member.birthday}</Text>
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
									<Checkbox value={Boolean(member.gender)} />
								</View>
								<View style={{ marginLeft: 8 }}>
									<Text>Nam</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<View>
									<Checkbox value={!Boolean(member.gender)} />
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
							<Text style={{ fontSize: 20 }}>{member.address}</Text>
						</View>
					</View>

					{/* Temporary Address */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Đăng ký tạm trú:</Text>
						</View>
						<View>
							<Text style={{ fontSize: 20 }}>
								{member.temporary_residence
									? 'Đã đăng ký tạm trú'
									: 'Chưa đăng ký tạm trú'}
							</Text>
						</View>
					</View>

					{/* CCCD */}
					<View style={[styles.item, styles.myBackground, { height: 'auto' }]}>
						<View style={{ marginBottom: 16 }}>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>CCCD:</Text>
							</View>
							<View>
								<Text style={{ fontSize: 20 }}>{member.citizen_id}</Text>
							</View>
						</View>

						<View style={styles.row}>
							{/* Day */}
							<View style={styles.itemRow}>
								<View style={styles.titleContainer}>
									<Text style={styles.title}>Ngày cấp</Text>
								</View>
								<View>
									<Text style={{ fontSize: 20 }}>{member.citizen_id_date}</Text>
								</View>
							</View>
							{/* Place */}
							<View style={styles.itemRow}>
								<View style={styles.titleContainer}>
									<Text style={styles.title}>Nơi cấp</Text>
								</View>
								<View>
									<Text style={{ fontSize: 20 }}>
										{member.citizen_id_place}
									</Text>
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
								<Text style={{ fontSize: 20 }}>{member.job}</Text>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>

			<TouchableOpacity
				style={styles.addButton}
				onPress={() => {
					navigation.navigate('EditMember', {
						memberID: member.id,
					});
				}}>
				<FontAwesome name="edit" size={35} style={{ color: 'white' }} />
			</TouchableOpacity>
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
		paddingBottom: 8,
		marginBottom: 8,
	},
	addButton: {
		backgroundColor: '#6ceb4d',
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		position: 'absolute',
		bottom: 8,
		right: 8,
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
