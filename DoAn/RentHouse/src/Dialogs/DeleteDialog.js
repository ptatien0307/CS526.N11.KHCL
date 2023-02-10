import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const DeleteDialog = (props) => {
	const CloseModal = (userChoice) => {
		props.setConfirmDelete(userChoice);
		props.setDeleteDialogVisible(false);
	};
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
				<FontAwesomeIcon name="exclamation-circle" size={35} color='red' />
				<Text style={styles.textTitle}> {props.title} </Text>

			</View>
			<Text style={styles.message}> {props.message}</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View>
					<TouchableOpacity onPress={() => CloseModal(true)}>
						<Text>Xóa</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity onPress={() => CloseModal(false)}>
						<Text>Quay lại</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white',
	},
	textTitle: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textMessage: {
		fontSize: 18,
		textAlign: 'center',
	},
});

export { DeleteDialog };
