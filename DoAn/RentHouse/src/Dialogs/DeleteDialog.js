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
			<View style={styles.modal}>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 10,}}>
					<FontAwesomeIcon name="exclamation-circle" size={35} color='red' />
					<Text style={styles.textTitle}> {props.title} </Text>
				</View>
				<Text style={styles.message}> {props.message}</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 10,}}>
					<View style = {styles.button}>
						<TouchableOpacity onPress={() => CloseModal(true)}>
							<Text>Xóa</Text>
						</TouchableOpacity>
					</View>
					<View style = {styles.button}>
						<TouchableOpacity onPress={() => CloseModal(false)}>
							<Text>Quay lại</Text>
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
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#ffffff",
		flexDirection:'column',
		height: 200,
		margin: 50,
		padding: 20,
		borderRadius: 30,
		flex: 1
	},
	textTitle: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textMessage: {
		fontSize: 30,
		textAlign: 'center',
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export { DeleteDialog };
