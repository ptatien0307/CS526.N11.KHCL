import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Animated,
} from 'react-native';
import { useEffect, useState, useRef } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { fetchServiceList } from '../database/actions/serviceActions';

export default function App({ navigation, route }) {
	const [serviceList, setServiceList] = useState([]);
	useEffect(() => {
		const loadServiceList = async () => {
			const services = await fetchServiceList()
				.catch((error) => console.log(error));
			setServiceList(services);
		};

		loadServiceList();
	});
	return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	stackTitle: {
		marginLeft: 32,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
