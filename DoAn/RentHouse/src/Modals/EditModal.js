import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight,
	TextInput,
} from 'react-native';
import { alertEmptyDialog, editSuccessDialog } from '../Dialogs/dialog.js';
import { useState, useEffect } from 'react';
import { updateNote, fetchNoteContent } from '../database/actions/noteActions.js';

export default function EditModal({ navigation, route }) {
	const selected_note_id = route.params.selected_note_id
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		const loadNote = async () => {
			const note = await fetchNoteContent(selected_note_id)
				.catch((error) => console.log(error));
			setInputText(note.content);
		};

		loadNote();
	}, [])

	const handleSave = async () => {
		if (inputText === '')
			alertEmptyDialog();
		else {
			await updateNote({
				id: selected_note_id,
				content: inputText
			})
			editSuccessDialog();
			navigation.goBack()
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.modalContainer}>
				<View style={[styles.modalView, styles.myBorder]}>
					{/* Title modal */}
					<Text style={[styles.textTitle, styles.myBorder]}>
						{' '}
						Change Text
					</Text>

					{/* Edit content */}
					<TextInput
						style={[styles.myBorder]}
						onChangeText={(text) => {
							setInputText(text);
						}}
						defaultValue={inputText}
						editable={true}
						multiline={false}
						maxLength={256}
					></TextInput>

					{/* Save button */}
					<TouchableHighlight
						style={styles.saveButton}
						onPress={handleSave}
					>
						<Text style={{ fontSize: 20 }}>SAVE</Text>
					</TouchableHighlight>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	modalContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalView: {
		width: '80%',
		height: '80%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	saveButton: {
		marginTop: 8,
		width: '30%',
		height: '10%',
		fontSize: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textTitle: {
		marginVertical: 8,
		paddingHorizontal: 8,
		width: 'auto',
		fontSize: 25,
		textAlign: 'center',
		backgroundColor: 'black',
		color: 'white',
	},
	myBorder: {
		borderColor: 'black',
		borderRadius: 15,
		borderWidth: 2,
	},
});
