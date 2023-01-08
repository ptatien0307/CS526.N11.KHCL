import { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import {
	alertDeleteDialog,
	alertEmptyDialog,
	editSuccessDialog,
	deleteSuccessDialog,
	addSuccessDialog,
} from '../Dialogs/dialog.js';

import { fetchRoomListInUse } from '../database/actions/roomActions';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation, route }) {
	const isFocused = useIsFocused();

	const [roomList, setRoomList] = useState([]);
	const [selectedRoomId, setSelectedRoomId] = useState(null);

	let month = new Date().getMonth() + 1;
	let year = new Date().getFullYear();

	// Get room list from database
	useEffect(() => {
		const loadRoomList = async () => {
			const rooms = await fetchRoomListInUse()
				.catch((error) => console.log(error));
			setRoomList(rooms);
		};

		loadRoomList();
	}, [isFocused]);


	const renderItem = ({ item }) => (
		// Ghi chi so dich vu modal
		<TouchableOpacity
			onPress={() => {
				setSelectedRoomId(item.id);
				navigation.navigate('CreateBillDetail', {
					selected_room_id: item.id,
				});
			}}
		>
			<View style={[styles.room, styles.myBackground]}>
				<View>
					<Text style={styles.styleRoomName}>{item.name}</Text>
				</View>

				<View>
					<Text>TÌNH TRẠNG: {item.status}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>

			{/* Day */}
			<View style={styles.containerdate}>
				<Text style={[styles.date]}> Tháng {month} / {year}</Text>
			</View>

			{/* Body */}
			<View style={styles.body}>


				<FlatList
					data={roomList}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					extraData={selectedRoomId}
				/>
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
		minHeight: '50%',
		maxHeight: '90%',
		paddingLeft: 8,
	},

	stackTitle: {
		marginLeft: 32,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	myBorder: {
		borderColor: 'black',
		borderRadius: 15,
		borderWidth: 2,
	},
	myBackground: {
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
	},

	styleRoomName: {
		fontWeight: 'bold',
	},

	room: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 16,
		paddingVertical: 16,
		marginBottom: 8,
		width: '100%',
		borderLeftWidth: 5,
	},

	containerdate: {
		width: '95%',
		height: '10%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
		padding: 8,
		margin: 8,
	},

	date: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 8,
	},
});
