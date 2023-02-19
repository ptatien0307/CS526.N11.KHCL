import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const BillSuccessDialog = ({ setBillSuccessDialogVisible, navigation, title, message }) => {
	return (
		<View style={styles.container}>
			<View style={styles.modal}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FontAwesome name="check-circle" size={30} color='green' />
					<Text style={styles.textTitle}> {title} </Text>
				</View>

				<Text style={styles.textMessage}>{message}</Text>

				<View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10 }}>
					<View style={styles.button}>
						<TouchableOpacity onPress={() => {
							navigation.goBack();
							setBillSuccessDialogVisible(false);
						}}>
							<Text style={styles.textButton}>QUAY LẠI</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000aa',
	},
	modal: {
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: "#ffffff",
		flexDirection: 'column',
		height: '25%',
		width: '87%',
		paddingVertical: 10,
		borderRadius: 10,
	},
	textTitle: {
		fontSize: 27,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textMessage: {
		fontSize: 20,
		textAlign: 'left'
	},
	button: {
		flex: 1,
		alignItems: 'flex-end',
		paddingRight: 20,
	},
	textButton: {
		fontSize: 17,
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#6897BB',
	}
});

export { BillSuccessDialog };