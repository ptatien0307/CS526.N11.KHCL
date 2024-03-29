import { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	TextInput,
	Modal,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

import {
	fetchNoteList,
	deleteNote,
	insertNote,
} from '../database/actions/noteActions';
import { useForceUpdate } from '../utils/utils';
import { Dimensions } from 'react-native';

import { EmptyDialog } from '../Dialogs/EmptyDialog';

const wh = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function App({ navigation, route }) {
	const isFocused = useIsFocused();
	const [noteContent, setNoteContent] = useState('');
	const [noteList, setNoteList] = useState([]);
	const [forceUpdate, forceUpdateId] = useForceUpdate();

	const [emptyDialogVisible, setEmptyDialogVisible] = useState(false);

	// Get note list from database
	useEffect(() => {
		const loadNoteList = async () => {
			const notes = await fetchNoteList().catch((error) => {});

			setNoteList(notes);
		};

		loadNoteList();
	}, [isFocused, forceUpdateId]);

	const handleAddNote = () => {
		if (noteContent.length === 0) {
			setEmptyDialogVisible(true);
		} else {
			const insertedNote = async () => {
				await insertNote(noteContent, forceUpdate).catch((error) => {});
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
						selected_note_id: item.id,
					});
				}}>
				<View style={styles.noteContent}>
					<Text style={{ fontSize: 20 }}>{item.content}</Text>
				</View>

				<View style={styles.noteIcon}>
					<TouchableOpacity onPress={() => deleteNote(item.id, forceUpdate)}>
						<FontAwesome
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

					<TouchableOpacity onPress={handleAddNote}>
						<FontAwesome name="plus-circle" size={30} />
					</TouchableOpacity>
				</View>

				{/* View notes */}
				<FlatList
					data={noteList}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={emptyDialogVisible}
				onRequestClose={() => setEmptyDialogVisible(false)}>
				<EmptyDialog setEmptyDialogVisible={setEmptyDialogVisible} />
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
		backgroundColor: '#d9d9d9',
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
		height: vh / 12,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textInputContent: {
		fontSize: 20,
		width: '90%',
	},

	note: {
		flexDirection: 'row',
		paddingHorizontal: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderLeftWidth: 5,
		width: '100%',
		marginBottom: 16,
		borderLeftColor: '#6bec4b',
	},
	noteContent: {
		minHeight: 50,
		width: '90%',
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
		backgroundColor: 'white',
	},
	myBackground: {
		backgroundColor: 'white',
		borderRadius: 10,
	},
});
