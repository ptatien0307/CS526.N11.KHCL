import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

import { useIsFocused } from '@react-navigation/native';
import { fetchRoomList } from '../database/actions/roomActions';

export default function App({ navigation, route }) {
	const [roomList, setRoomList] = useState([]);
	const [selectedRoomId, setSelectedRoomId] = useState(null);
	const isFocused = useIsFocused();

	// Get room list from database
	useEffect(() => {
		const loadRoomList = async () => {
			const rooms = await fetchRoomList().catch((err) => console.log(err));
			setRoomList(rooms);
		};

		loadRoomList();
	}, [isFocused]);

	const renderItem = ({ item }) => {
		return (
			// Go to room's details
			<TouchableOpacity
				onPress={() => {
					setSelectedRoomId(item.id);
					navigation.navigate('RoomDetail', {
						selected_room_id: item.id,
					});
				}}>
				<View style={[styles.room, styles.myBackground]}>
					<View>
						<Text style={styles.styleRoomName}>{item.name}</Text>
					</View>

					<View>
						<Text style={{ fontSize: 16 }}>TÌNH TRẠNG: {item.status}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			{/* Body */}
			<View style={styles.body}>
				<FlatList
					data={roomList}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					extraData={selectedRoomId}
				/>

				<TouchableOpacity
					style={styles.addButton}
					onPress={() => {
						navigation.navigate('AddNewRoom');
					}}>
					<Icon name="plus-circle" size={35} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 4,
		paddingTop: 8,
		backgroundColor: '#d9d9d9',
	},

	body: {
		height: '100%',
		width: '100%',
	},
	room: {
		flex: 1,
		justifyContent: 'center',
		padding: 16,
		marginBottom: 8,
		width: '100%',
		borderLeftWidth: 5,
	},
	styleRoomName: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	addButton: {
		backgroundColor: '#6bec4b',
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		position: 'absolute',
		bottom: 8,
		right: 8,
	},

	myBackground: {
		backgroundColor: 'white',
		borderRadius: 10,
		borderLeftColor: '#6bec4b'
	},
});
