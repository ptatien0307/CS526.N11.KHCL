import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const EditSuccessDialog = ({ setEditSuccessDialogVisible, navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.modal}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FontAwesome name="check-circle" size={30} color='green' />
					<Text style={styles.textTitle}> Hoàn Thành </Text>
				</View>

				<Text style={styles.textMessage}> Chỉnh sửa thành công.</Text>

				<View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 13 }}>
					<View style={styles.button}>
						<TouchableOpacity onPress={() => {
							setEditSuccessDialogVisible(false);
							navigation.goBack();
						}}>
							<Text style={styles.textButton}>Quay lại</Text>
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
		textAlign: 'left',
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

export { EditSuccessDialog };