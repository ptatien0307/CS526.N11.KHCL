import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { fetchNoteList } from '../database/actions/noteActions';

import { useForceUpdate } from '../utils/utils';

export default function EditModal({ navigation, route }) {
	const noteID = route.params.noteID;
	const [noteContent, setNoteContent] = useState(route.params.noteContent);

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
					maxLength={256}></TextInput>
			</View>
			{/* Save button */}
			<TouchableOpacity
				style={styles.saveButton}
				onPress={() => {
					if (noteContent === '') return alert('Chưa nhập nội dung ghi chú');
					else {
						// Handle edit note
					}
				}}>
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
