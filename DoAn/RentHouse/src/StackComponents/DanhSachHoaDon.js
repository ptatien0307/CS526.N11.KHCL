import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useState } from "react";


import Icon from "react-native-vector-icons/FontAwesome";

export default function App({ navigation, route }) {


	return (
		<View style={styles.container}>

			{/* Header */}
			<View style={[styles.header]}>

				<View style={styles.headerTop}>
					{/* Back to menu button */}
					<TouchableOpacity onPress={() => { navigation.navigate("Menu"); }}>
						<Icon name="arrow-left" size={35} />
					</TouchableOpacity>

					{/* Title */}
					<Text style={styles.stackTitle}>DANH SÁCH HÓA ĐƠN</Text>

				</View>
			</View>


			{/* Body */}
			<View style={styles.body}>



			</View>


		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	header: {
		width: '100%',
		height: '10%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#dfdfdf',
		paddingLeft: 8,
		borderBottomWidth: 2,
	},
	headerTop: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
	body: {
		height: '90%',
		width: '95%',
	},

	stackTitle: {
		marginLeft: 32,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	myBackground: {
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
	},

});
