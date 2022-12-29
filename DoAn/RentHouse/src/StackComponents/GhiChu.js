import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { ModalAdd, ModalEdit } from '../Dialogs/modal.js';
import { alertDeleteDialog, alertEmptyDialog, editSuccessDialog, deleteSuccessDialog, successDialog } from '../Dialogs/dialog.js';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation, route }) {

    const [notes, setNotes] = useState(route.params.notes)



    const [editItemID, setEditItemID] = useState()
    const [inputText, setInputText] = useState('')



    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)


    const handleDeleteNote = async (deleteNote) => {
        let isConfirm = await alertDeleteDialog('Xóa ghi chú', 'Bạn có chắc muốn xóa ghi chú này ?')
        if (isConfirm) {
            const newNoteList = notes.reduce((res, currNote) => {
                if (currNote.id != deleteNote.id)
                    res.push(currNote)
                return res
            }, [])
            setNotes(newNoteList) // set local notes
            route.params.setNotes(newNoteList) // set global notes
            deleteSuccessDialog()
        }
    }

    const handleEditNote = (note) => {
        setIsEditModalVisible(true)
        setInputText(note.noteContent)
        setEditItemID(note.id)
    }

    // BACK-END ___ ADD NOTE
    const handleAddNote = () => {
        setIsAddModalVisible(true)
        successDialog('Thêm ghi chú thành công.')
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.note, styles.myBackground]}>
                <View style={styles.noteContent}>
                    <Text>{item.id}. {item.noteContent}</Text>
                </View>

                <View style={styles.noteIcon}>
                    {/* <TouchableOpacity onPress={() => { handleEditNote(item) }}>
                        <FontAwesomeIcon name="pencil" size={20} style={[styles.icon, { display: mountEdit ? 'flex' : 'none' }]} />
                    </TouchableOpacity> */}


                    <TouchableOpacity onPress={() => { handleDeleteNote(item) }}>
                        <FontAwesomeIcon name="remove" size={25} style={[styles.icon]} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }





    return (
        <View style={styles.container}>



            {/* Body */}
            <View style={styles.body}>
                {/* View notes */}
                <FlatList
                    data={notes}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}>
                </FlatList>

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
                setGlobalNotes={route.params.setNotes}
                chooseItemEdit={1}>
            </ModalEdit>

            {/* Modal for add note */}
            <ModalAdd
                setIsAddModalVisible={setIsAddModalVisible}
                isAddModalVisible={isAddModalVisible}
                setInputText={setInputText}
                inputText={inputText}
                alertEmptyDialog={alertEmptyDialog}
                notes={notes}
                setLocalNotes={setNotes}
                setGlobalNotes={route.params.setNotes}>
            </ModalAdd>


            <TouchableOpacity style={styles.addButton} onPress={() => { handleAddRoom() }}>
                <FontAwesomeIcon name="plus-circle" size={35} color='white' />

            </TouchableOpacity >
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
        width: '90%',
        minHeight: '50%',
        maxHeight: '100%',
        paddingLeft: 8,
        zIndex: -99
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
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    noteIcon: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 4,
    },



    subMenuContainer: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '50%',
        height: '200%',
        position: 'absolute',
        top: 70,
        right: 40,
        backgroundColor: '#dfdfdf',
        justifyContent: 'center'
    },
    subMenu: {
        width: '100%',
        height: '33%',
        justifyContent: 'center',
    },


    stackTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textBold: {
        fontWeight: 'bold',
    },
    textBoldRight: {
        fontWeight: 'bold',
        textAlign: 'right',
    },
    btnContainer: {
        width: '100%',
        height: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(223,223,223,0.8)',
        position: 'absolute',
        bottom: 0,
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
    addButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
});
