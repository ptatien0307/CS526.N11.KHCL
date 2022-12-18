import * as Sqlite from "expo-sqlite";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";


const db = Sqlite.openDatabase("renthouse.db");

export default function App({ navigation }) {
	const [roomList, setRoomList] = useState(null);

	// Get room list from database
	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM rooms",
				[],
				(_, { rows: { _array } }) => {
					console.log(_array);
					setRoomList(_array);
				},
			);
		});

	}, []);

	const renderItem = ({ item }) => {

		return (
			// Go to specific room
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("ChiTietPhong", {});
				}}
			>
				<View style={[styles.room, styles.myBackground]}>
					{/* Room name */}
					<View>
						<Text style={styles.styleRoomName}>
							{item.name}
						</Text>
					</View>

					{/* Room status */}
					<View>
						<Text>TÌNH TRẠNG: {item.status !== "Còn trống" ? item.customer_count : item.status}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const handleAddRoom = () => {

	};

	return (
		<View style={styles.container}>
			{/* Body */}
			<View style={styles.body}>
				{/* View rooms */}
				<FlatList
					data={roomList}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				></FlatList>
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
}

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
