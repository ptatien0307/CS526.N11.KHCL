import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const ErrorDialog = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.modal}>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 10 }}>
					<FontAwesome name="times-circle" size={30} color='red' />
					<Text style={styles.textTitle}> Lỗi </Text>
				</View>
				<Text style={styles.message}> {props.message}</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 10 }}>
					<View style={styles.button}>
						<TouchableOpacity onPress={() => props.setErrorDialogVisible(false)}>
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
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#ffffff",
		flexDirection: 'column',
		height: '25%',
		width: '80%',
		margin: 50,
		padding: 20,
		borderRadius: 30,
	},
	textTitle: {
		fontSize: 25,
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
	},
	textButton: {
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold',
	}
});

export { ErrorDialog };