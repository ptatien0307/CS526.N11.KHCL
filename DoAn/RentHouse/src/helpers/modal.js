import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight,
	Modal,
	TextInput,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export function ModalAdd(params) {
	return (
		<View style={styles.container}>
			{/* View add modal */}
			<Modal
				animationType="fade"
				visible={params.isAddModalVisible}
				onRequestClose={() => {
					params.setIsAddModalVisible(false);
				}}
			>
				<View style={styles.modalContainer}>
					<View style={[styles.modalView, styles.myBorder]}>
						{/* Close button */}
						<View
							style={{ position: "absolute", top: 10, right: 10 }}
						>
							<TouchableHighlight
								onPress={() => {
									params.setIsAddModalVisible(
										!params.isAddModalVisible
									);
								}}
							>
								<FontAwesomeIcon
									name="times-circle"
									size={35}
								/>
							</TouchableHighlight>
						</View>

						{/* Title modal */}
						<Text style={[styles.textTitle, styles.myBorder]}>
							Add note
						</Text>

						{/* Edit content */}
						<TextInput
							style={[styles.myBorder, styles.text]}
							onChangeText={(text) => {
								params.setInputText(text);
							}}
							defaultValue={params.inputText}
							editable={true}
							multiline={false}
							maxLength={256}
						></TextInput>

						{/* Save button */}
						<TouchableHighlight
							style={[styles.saveButton, styles.myBorder]}
							onPress={() => {
								let newNote = [];
								if (params.inputText === "")
									params.alertEmptyDialog();
								else {
									if (params.notes.length === 0) {
										newNote = [
											{
												id: 1,
												noteContent: params.inputText,
											},
										];
									} else {
										newNote = [
											...params.notes,
											{
												id:
													params.notes[
														params.notes.length - 1
													].id + 1,
												noteContent: params.inputText,
											},
										];
									}
									params.setLocalNotes(newNote); // set local notes
									params.setGlobalNotes(newNote); // set global note
									params.setInputText("");
									params.setIsAddModalVisible(false);
								}
							}}
						>
							<Text style={{ fontSize: 20 }}>SAVE</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export function ModalEdit(params) {
	const editNote = () => {
		// If edit content is empty, notify alert
		if (params.inputText === '')
			params.alertEmptyDialog();
		else {
			const newNote = params.notes.map(item => {
				if (item.id === params.editItemID) {
					item.noteContent = params.inputText;
					return item;
				}
				return item;
			});
			params.setGlobalNotes(newNote); // Set for global note
			params.setInputText('');
			params.setIsEditModalVisible(false);
			params.editSuccessDialog();

		}
	};

	// BACK-END ___ EDIT ROOM INFORMATION (basic info)
	const editRoom = () => {
		// If edit content is empty, notify alert
		if (params.inputText === '')
			params.alertEmptyDialog();
		else {
			params.setCurrRoom({ ...params.currRoom, [params.editItemContent]: params.inputText });
			const newRoomList = params.roomList.map(item => {
				if (item.id === params.editItemID) {
					item[params.editItemContent] = params.inputText;
					return item;
				}
				return item;
			});
			params.setGlobalRoomList(newRoomList);
			params.setRoomList(newRoomList);
			params.setInputText('');
			params.setIsEditModalVisible(false);
			params.editSuccessDialog();

		}
	};




	return (
		<View style={styles.container}>
			<Modal
				animationType="fade"
				visible={params.isEditModalVisible}
				onRequestClose={() => {
					params.setIsEditModalVisible(false);
				}}
			>
				<View style={styles.modalContainer}>
					<View style={[styles.modalView, styles.myBorder]}>
						{/* Close button */}
						<View
							style={{ position: "absolute", top: 10, right: 10 }}
						>
							<TouchableHighlight
								onPress={() => {
									params.setIsEditModalVisible(
										!params.isEditModalVisible
									);
								}}
							>
								<FontAwesomeIcon
									name="times-circle"
									size={20}
								/>
							</TouchableHighlight>
						</View>

						{/* Title modal */}
						<Text style={[styles.textTitle, styles.myBorder]}>
							{" "}
							Change Text
						</Text>

						{/* Edit content */}
						<TextInput
							style={[styles.myBorder]}
							onChangeText={(text) => {
								params.setInputText(text);
							}}
							defaultValue={params.inputText}
							editable={true}
							multiline={false}
							maxLength={256}
						></TextInput>

						{/* Save button */}
						<TouchableHighlight
							style={styles.saveButton}
							onPress={() => {
								if (params.chooseItemEdit === 1) editNote();
								else if (params.chooseItemEdit === 2)
									editRoom();
							}}
						>
							<Text style={{ fontSize: 20 }}>SAVE</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	modalContainer: {
		flex: 1,
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	modalView: {
		width: "80%",
		height: "80%",
		alignItems: "center",
		justifyContent: "center",
	},
	saveButton: {
		marginTop: 8,
		width: "30%",
		height: "10%",
		fontSize: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	textTitle: {
		marginVertical: 8,
		paddingHorizontal: 8,
		width: "auto",
		fontSize: 25,
		textAlign: "center",
		backgroundColor: "black",
		color: "white",
	},
	myBorder: {
		borderColor: "black",
		borderRadius: 15,
		borderWidth: 2,
	},
});
