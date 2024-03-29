import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Modal
} from 'react-native';
import { useEffect, useState } from 'react';
import { fetchNoteContent, updateNote } from '../database/actions/noteActions';
import { EmptyDialog } from '../Dialogs/EmptyDialog';
import { EditSuccessDialog } from '../Dialogs/EditSuccessDialog';

export default function EditModal({ navigation, route }) {
	const selected_note_id = route.params.selected_note_id;

	const [noteContent, setNoteContent] = useState('');

	const [emptyDialogVisible, setEmptyDialogVisible] = useState(false);
	const [editSuccessDialogVisible, setEditSuccessDialogVisible] = useState(false);

	useEffect(() => {
		const loadNote = async () => {
			const note = await fetchNoteContent(selected_note_id)
				.catch((error) => { });
			setNoteContent(note.content);
		};

		loadNote();
	}, []);

	const handleSave = async () => {
		if (noteContent.length === 0) {
			setEmptyDialogVisible(true);
		}
		else {
			const updatedNote = async () => {
				await updateNote({
					id: selected_note_id,
					content: noteContent
				})
					.then(() => setEditSuccessDialogVisible(true))
					.catch((error) => { });
			};

			updatedNote();
		}
	};

	return (
		<View style={styles.container}>
			<View style={[styles.textInputContainer, styles.myBorder]}>
				{/* Edit content */}
				<TextInput
					style={styles.textInputContent}
					onChangeText={(text) => {
						setNoteContent(text);
					}}
					defaultValue={noteContent}
					editable={true}
					multiline={true}
					maxLength={256}
				/>
			</View>
			{/* Save button */}
			<TouchableOpacity
				style={styles.saveButton}
				onPress={handleSave}
				defaultValue={noteContent}
			>
				<Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
					LƯU CHỈNH SỬA
				</Text>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={emptyDialogVisible}
				onRequestClose={() => { setEmptyDialogVisible(false); }}>
				<EmptyDialog
					setEmptyDialogVisible={setEmptyDialogVisible}
				/>
			</Modal>
			<Modal
				animationType="slide"
				transparent={true}
				visible={editSuccessDialogVisible}
				onRequestClose={() => setEditSuccessDialogVisible(false)}>
				<EditSuccessDialog
					setEditSuccessDialogVisible={setEditSuccessDialogVisible}
					navigation={navigation}
				/>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#d9d9d9'
	},
	textInputContainer: {
		minHeight: 50,
		flexDirection: 'row',
		marginVertical: 16,
		paddingHorizontal: 8,
		width: '90%',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	textInputContent: {
		fontSize: 20,
	},
	saveButton: {
		paddingHorizontal: 8,
		marginTop: 8,
		height: '10%',
		fontSize: 25,
		width: '90%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#6bec4b',
		borderRadius: 15,
	},

	myBorder: {
		borderColor: 'black',
		borderRadius: 15,
		borderWidth: 2,
	},
});
