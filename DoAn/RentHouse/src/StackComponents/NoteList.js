import { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
	fetchNoteList,
	deleteNote,
	insertNote,
} from '../database/actions/noteActions';
import { alertMissingDialog } from '../Dialogs/dialog';
import { useForceUpdate } from '../utils/utils';

export default function App({ navigation, route }) {
	const isFocused = useIsFocused();
	const [noteContent, setNoteContent] = useState('');
	const [noteList, setNoteList] = useState([]);
	const [forceUpdate, forceUpdateId] = useForceUpdate();

	// Get note list from database
	useEffect(() => {
		const loadNoteList = async () => {
			const notes = await fetchNoteList().catch((error) => console.log(error));

			setNoteList(notes);
		};

		loadNoteList();
	}, [isFocused, forceUpdateId]);

	const handleAddNote = () => {
		if (noteContent.length === 0) {
			alertMissingDialog();
		}
		else {
			const insertedNote = async () => {
				await insertNote(noteContent, forceUpdate)
					.catch((error) => console.log(error));
			};

			insertedNote();
			setNoteContent('');
		}
	};

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={[styles.note, styles.myBackground]}
				onPress={() => {
					navigation.navigate('EditNote', {
						selected_note_id: item.id
					});
				}}
			>
				<View style={styles.noteContent}>
					<Text style={{ fontSize: 20 }}>
						{item.content}
					</Text>
				</View>

				<View style={styles.noteIcon}>
					<TouchableOpacity
						onPress={() => deleteNote(item.id, forceUpdate)}
					>
						<FontAwesomeIcon
							name="remove"
							size={25}
							style={{ marginHorizontal: 4 }}
						/>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			{/* Body */}
			<View style={styles.body}>
				<View style={[styles.textInputContainer, styles.myBorder]}>
					<TextInput
						style={styles.textInputContent}
						placeholder="Nhập nội dung ghi chú ..."
						onChangeText={(text) => setNoteContent(text)}
						value={noteContent}
					/>

					<TouchableOpacity
						onPress={handleAddNote}>
						<FontAwesomeIcon name="plus-circle" size={30} />
					</TouchableOpacity>
				</View>

				{/* View notes */}
				<FlatList
					data={noteList}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
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
	},

	body: {
		width: '100%',
		minHeight: '50%',
		maxHeight: '100%',
		paddingHorizontal: 8,
	},

	textInputContainer: {
		flexDirection: 'row',
		marginVertical: 16,
		paddingHorizontal: 8,
		height: 50,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textInputContent: {
		flex: 9,
		fontSize: 20,
	},

	note: {
		flexDirection: 'row',
		paddingHorizontal: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderLeftWidth: 5,
		width: '100%',
		marginBottom: 16,
	},
	noteContent: {
		minHeight: 50,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	noteIcon: {
		position: 'absolute',
		right: 0,
		flexDirection: 'row',
	},

	myBorder: {
		borderColor: 'black',
		borderRadius: 15,
		borderWidth: 2,
	},
	myBackground: {
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
	},
});
