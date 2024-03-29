import { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { fetchRoomListForCreateBill } from '../database/actions/roomActions';


export default function App({ navigation, route }) {
	const isFocused = useIsFocused();

	const [roomList, setRoomList] = useState([]);
	const [selectedRoomId, setSelectedRoomId] = useState(null);

	let month = new Date().getMonth() + 1;
	let year = new Date().getFullYear();

	// Get room list from database
	useEffect(() => {
		const loadRoomList = async () => {
			const rooms = await fetchRoomListForCreateBill().catch((error) => { });
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
			}}>
			<View style={[styles.room, styles.myBackground]}>
				<View>
					<Text style={styles.styleRoomName}>{item.name}</Text>
				</View>

				<View>
					<Text>
						TÌNH TRẠNG:
						<Text style={{ color: item.bills_count > 0 ? '#6bec4b' : 'red' }}>
							{item.bills_count > 0 ? ` Đã lập ${item.bills_count} hóa đơn` : ' Chưa lập hóa đơn'}
						</Text>
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			{/* Day */}
			<View style={styles.containerdate}>
				<Text style={[styles.date]}>
					{' '}
					Tháng {month} / {year}
				</Text>
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
		backgroundColor: '#d9d9d9'
	},

	body: {
		width: '100%',
		minHeight: '50%',
		maxHeight: '90%',
		padding: 8,
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
		backgroundColor: 'white',
		borderRadius: 10,
		borderLeftColor: '#6bec4b',
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
		backgroundColor: '#6bec4b',
		borderRadius: 10,
		padding: 8,
		margin: 8,
	},

	date: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 8,
		color: 'white',
	},
});
