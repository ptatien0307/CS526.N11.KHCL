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

export default function App({ navigation, route }) {
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
