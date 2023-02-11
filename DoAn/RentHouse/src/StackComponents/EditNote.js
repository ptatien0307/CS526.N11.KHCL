import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { fetchNoteContent, updateNote } from '../database/actions/noteActions';
import { alertMissingDialog, editSuccessDialog } from '../Dialogs/dialog';

export default function EditModal({ navigation, route }) {
	const selected_note_id = route.params.selected_note_id;

	const [noteContent, setNoteContent] = useState('');

	useEffect(() => {
		const loadNote = async () => {
			const note = await fetchNoteContent(selected_note_id)
				.catch((error) => console.log(error));
			setNoteContent(note.content);
		};

		loadNote();
	}, []);

	const handleSave = () => {
		if (noteContent.length === 0) {
			alertMissingDialog();
		}
		else {
			const updatedNote = async () => {
				await updateNote({
					id: selected_note_id,
					content: noteContent
				})
					.catch((error) => console.log(error));
			};

			updatedNote();
			editSuccessDialog();
			navigation.goBack();
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	textInputContainer: {
		minHeight: 50,
		flexDirection: 'row',
		marginVertical: 16,
		paddingHorizontal: 8,
		width: '90%',
		justifyContent: 'space-between',
		alignItems: 'center',
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
		backgroundColor: 'black',
		borderRadius: 15,
		borderWidth: 2,
	},

	myBorder: {
		borderColor: 'black',
		borderRadius: 15,
		borderWidth: 2,
	},
});
