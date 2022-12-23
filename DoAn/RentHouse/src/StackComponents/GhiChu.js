import { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";

import { ModalAdd, ModalEdit } from "../helpers/modal";
import {
	alertDeleteDialog,
	alertEmptyDialog,
	editSuccessDialog,
	deleteSuccessDialog,
	addSuccessDialog,
} from "../helpers/dialog";
import NoteItem from "../components/NoteItem";
import Icon from "react-native-vector-icons/FontAwesome";

let NOTE = [
	{
		id: 1,
		noteContent: 'Do something 1'
	},
	{
		id: 2,
		noteContent: 'Do something 2'
	},
	{
		id: 3,
		noteContent: 'Do something 3'
	},
	{
		id: 4,
		noteContent: 'Do something 4'
	},
	{
		id: 5,
		noteContent: 'Do something 5'
	},
	{
		id: 6,
		noteContent: 'Do something 5'
	},

];

export default function App({ navigation, route }) {
	const [notes, setNotes] = useState(NOTE);
	const [selectedId, setSelectedId] = useState(null);


	const [mountEdit, setMountEdit] = useState(false);
	const [mounDelete, setMountDelete] = useState(false);
	const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

	const [editItemID, setEditItemID] = useState();
	const [inputText, setInputText] = useState("");

	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);

	const handleDeleteNote = async (deleteNote) => {
		let isConfirm = await alertDeleteDialog(
			"Xóa ghi chú",
			"Bạn có chắc muốn xóa ghi chú này ?"
		);
		if (isConfirm) {
			const newNoteList = notes.reduce((res, currNote) => {
				if (currNote.id != deleteNote.id) res.push(currNote);
				return res;
			}, []);
			setNotes(newNoteList); // set local notes
			// route.params.setNotes(newNoteList); // set global notes
			deleteSuccessDialog();
		}
	};

	const handleEditNote = (note) => {
		setIsEditModalVisible(true);
		setInputText(note.noteContent);
		setEditItemID(note.id);
	};

	const handleAddNote = () => {
		setIsAddModalVisible(true);
		addSuccessDialog('Thêm ghi chú thành công.');
	};

	const renderItem = ({ item }) => {
		return (
			<NoteItem
				note={item}
				onPress={() => setSelectedId(item.id)}
			/>
		);
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.headerTop}>



					{/* Edit info button */}
					<TouchableOpacity
						onPress={() => {
							setIsSubMenuVisible(!isSubMenuVisible);
						}}
					>
						<Icon name="navicon" size={35} />
					</TouchableOpacity>

					{isSubMenuVisible && (
						<View style={styles.subMenuContainer}>
							<TouchableOpacity
								style={[
									styles.subMenu,
									{ borderBottomWidth: 2 },
								]}
								onPress={() => {
									handleAddNote();
									setIsSubMenuVisible(!isSubMenuVisible);
								}}
							>
								<Text>THÊM</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.subMenu,
									{ borderBottomWidth: 2 },
								]}
								onPress={() => {
									setMountEdit(!mountEdit);
									setIsSubMenuVisible(!isSubMenuVisible);
									setMountDelete(false);
								}}
							>
								<Text>CHỈNH SỬA</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.subMenu}
								onPress={() => {
									setMountDelete(!mounDelete);
									setIsSubMenuVisible(!isSubMenuVisible);
									setMountEdit(false);
								}}
							>
								<Text>XÓA</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>

			{/* Body */}
			<View style={styles.body}>
				{/* View notes */}
				<FlatList
					data={notes}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				></FlatList>
			</View>

			{/* Modal for edit note */}
			<ModalEdit
				setIsEditModalVisible={setIsEditModalVisible}
				isEditModalVisible={isEditModalVisible}
				editSuccessDialog={editSuccessDialog}
				editItemID={editItemID}
				setInputText={setInputText}
				inputText={inputText}
				alertEmptyDialog={alertEmptyDialog}
				notes={notes}
				// setGlobalNotes={route.params.setNotes}
				chooseItemEdit={1}
			></ModalEdit>

			{/* Modal for add note */}
			<ModalAdd
				setIsAddModalVisible={setIsAddModalVisible}
				isAddModalVisible={isAddModalVisible}
				setInputText={setInputText}
				inputText={inputText}
				alertEmptyDialog={alertEmptyDialog}
				notes={notes}
				setLocalNotes={setNotes}
			// setGlobalNotes={route.params.setNotes}
			></ModalAdd>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	header: {
		width: "100%",
		height: "10%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#dfdfdf",
		borderBottomWidth: 2,
	},
	headerTop: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	body: {
		width: "90%",
		minHeight: "50%",
		maxHeight: "90%",
		paddingLeft: 8,
		zIndex: -99,
	},
	note: {
		flexDirection: "row",
		paddingHorizontal: 8,
		justifyContent: "space-between",
		alignItems: "center",
		borderLeftWidth: 5,
		width: "100%",
		marginBottom: 16,
	},
	noteContent: {
		height: 50,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	noteIcon: {
		position: "absolute",
		right: 0,
		flexDirection: "row",
	},
	icon: {
		marginHorizontal: 4,
	},

	subMenuContainer: {
		borderWidth: 2,
		borderRadius: 10,
		backgroundColor: "white",
		width: "50%",
		height: "200%",
		position: "absolute",
		top: 70,
		right: 40,
		backgroundColor: "#dfdfdf",
		justifyContent: "center",
	},
	subMenu: {
		width: "100%",
		height: "33%",
		justifyContent: "center",
	},

	stackTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	textBold: {
		fontWeight: "bold",
	},
	textBoldRight: {
		fontWeight: "bold",
		textAlign: "right",
	},
	btnContainer: {
		width: "100%",
		height: "7%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(223,223,223,0.8)",
		position: "absolute",
		bottom: 0,
	},
	myBorder: {
		borderColor: "black",
		borderRadius: 15,
		borderWidth: 2,
	},
	myBackground: {
		backgroundColor: "#dfdfdf",
		borderRadius: 10,
	},
});
