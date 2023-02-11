import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { fetchServiceList } from '../database/actions/serviceActions';
import { formatVNCurrency } from '../utils/utils';

export default function App({ navigation, route }) {
	const [serviceList, setServiceList] = useState([]);
	const isFocused = useIsFocused();

	useEffect(() => {
		const loadServiceList = async () => {
			const services = await fetchServiceList().catch((error) =>
				console.log(error)
			);

			setServiceList(services);
		};
		loadServiceList();
	}, [isFocused]);

	return (
		<View style={styles.container}>
			{/* Body */}
			<View style={[styles.body]}>
				{serviceList.map((service) => (
					<View style={[styles.item, styles.myBackground]} key={service.id}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>{service.name}</Text>
						</View>
						<View>
							<Text style={{ fontSize: 20 }}>
								Giá: {formatVNCurrency(service.price, 2)} {service.unit}
							</Text>
						</View>
					</View>
				))}

				<TouchableOpacity
					style={styles.editButton}
					onPress={() => {
						navigation.navigate('EditService', {});
					}}>
					<FontAwesomeIcon name="edit" size={35} style={{ color: 'white' }} />
				</TouchableOpacity>
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
		width: '90%',
		height: '100%',
		justifyContent: 'flex-start',
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
	editButton: {
		backgroundColor: '#6bec4b',
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
		fontSize: 25,
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
