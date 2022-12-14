import * as Sqlite from "expo-sqlite";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

const db = Sqlite.openDatabase("renthouse.db");

export default function App({ navigation, route }) {
	const [roomList, setRoomList] = useState(route.params.roomList);
	const renderItem = ({ item }) => {
		return (
			// Go to specific room
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("ChiTietPhong", {
						currRoom: roomList[item.id - 1],
						roomList,
						setRoomList,
						setGlobalRoomList: route.params.setRoomList,
					});
				}}
			>
				<View style={[styles.room, styles.myBackground]}>
					{/* Room name */}
					<View>
						<Text style={styles.styleRoomName}>
							{item.roomName}
						</Text>
					</View>

					{/* Room status */}
					<View>
						<Text>TÌNH TRẠNG: {item.roomStatus}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const handleAddRoom = () => {
		useEffect(() => {
			db.transaction((tx) => {
				tx.executeSql(
					"select * from rooms",
					[],
					(_, { rows: { _array } }) => {
						setRoomList(...roomList, _array);
						route.params.setRoomList(...roomList, _array);
					}
				);
			});
		});
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={[styles.header]}>
				<View style={styles.headerTop}>
					{/* Back to menu button */}
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Menu");
						}}
					>
						<Icon name="arrow-left" size={35} />
					</TouchableOpacity>

					{/* Title */}
					<Text style={styles.stackTitle}>DANH SÁCH PHÒNG</Text>
				</View>
			</View>

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
