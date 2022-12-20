import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { fetchRoomList } from "../database/actions/roomActions";
import RoomItem from "../components/RoomItem";

export default function App({ navigation }) {
	const [roomList, setRoomList] = useState([]);
	const [selectedRoomId, setSelectedRoomId] = useState(null);

	// Get room list from database
	useEffect(() => {
		async function loadRoomList() {
			const rooms = await fetchRoomList().catch((error) => console.log(error));
			setRoomList(rooms);
		}

		loadRoomList();
	}, []);

	console.log(roomList);

	// The renderItem function provides an object to its function. This object does not contain a property named room, hence the code
	// renderItem = {({ room }) => renderList(room)}
	// does not work. The property is called item. Each item is one element in the provided data array. In this case it is called room.
	// 3 - 4 days wasted on this shit.

	const renderItem = ({ item }) => {
		console.log(item.name);
		return (
			< RoomItem
				room={item}
				onPress={() => {
					setSelectedRoomId(item.id);
					navigation.navigate("ChiTietPhong");
				}}
			/>
		);
	};

	const handleAddRoom = () => {

	};

	if (!roomList)
		return null;

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
			</View>

			{/* Add room button */}
			<TouchableOpacity
				style={styles.addButton}
				onPress={() => {
					handleAddRoom();
				}}
			>
				<View>
					<Text style={styles.textTitleWhite}>+ THÊM PHÒNG</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	header: {
		width: "100%",
		height: "10%",
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "#dfdfdf",
		paddingLeft: 8,
		borderBottomWidth: 2,
	},
	headerTop: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	body: {
		height: "90%",
		width: "95%",
	},
	room: {
		flex: 1,
		justifyContent: "center",
		paddingLeft: 16,
		paddingVertical: 16,
		marginBottom: 8,
		width: "100%",
		borderLeftWidth: 5,
	},

	styleRoomName: {
		fontWeight: "bold",
	},
	addButton: {
		backgroundColor: "black",
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 4,
		position: "absolute",
		bottom: 8,
	},

	stackTitle: {
		marginLeft: 32,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	textTitleWhite: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
	},
	myBackground: {
		backgroundColor: "#dfdfdf",
		borderRadius: 10,
	},
});
