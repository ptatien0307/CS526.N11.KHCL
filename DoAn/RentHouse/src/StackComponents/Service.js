import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchServiceList } from '../database/actions/serviceActions';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation, route }) {
	const [serviceList, setServiceList] = useState([]);
	useEffect(() => {
		const loadServiceList = async () => {
			const services = await fetchServiceList().catch((error) =>
				console.log(error)
			);
			console.log(services);

			setServiceList(services);
		};
		loadServiceList();
	});
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				{/* Body */}
				<View style={[styles.body]}>
					{/* Water */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Nước:</Text>
						</View>
						<View></View>
					</View>

					{/* Electricity */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Điện:</Text>
						</View>
						<View></View>
					</View>

					{/* Rental fee */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Rác:</Text>
						</View>
						<View></View>
					</View>

					{/* Rental fee */}
					<View style={[styles.item, styles.myBackground]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Tiền phòng:</Text>
						</View>
						<View></View>
					</View>

					<TouchableOpacity
						style={styles.editButton}
						onPress={() => {
							navigation.navigate('EditService', {});
						}}>
						<FontAwesomeIcon name="edit" size={35} style={{ color: 'white' }} />
					</TouchableOpacity>
				</View>
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
		width: '90%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	item: {
		width: '100%',
		height: 'auto',
		minHeight: 100,
		paddingHorizontal: 8,
		paddingTop: 8,
	},
	editButton: {
		backgroundColor: 'black',
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		position: 'absolute',
		bottom: 4,
		right: 8,
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
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
	},
	myBorder: {
		borderColor: 'black',
		borderRadius: 17,
		borderWidth: 2,
	},
});
