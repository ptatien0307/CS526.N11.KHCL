import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { ModalAdd, ModalEdit } from '../helpers/modal';
import { alertDeleteDialog, alertEmptyDialog, editSuccessDialog, deleteSuccessDialog, successDialog } from '../helpers/dialog';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation, route }) {

    const [notes, setNotes] = useState(route.params.notes)

    const [mountEdit, setMountEdit] = useState(false)
    const [mounDelete, setMountDelete] = useState(false)
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false)




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

    const handleAddNote = () => {
        setIsAddModalVisible(true)
        successDialog('Thêm ghi chú thành công.')
    }

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.note, styles.myBackground]}>
                <View style={styles.noteContent}>
                    <Text>{item.id}. {item.noteContent}</Text>
                </View>

                <View style={styles.noteIcon}>
                    <TouchableOpacity onPress={() => { handleEditNote(item) }}>
                        <FontAwesomeIcon name="pencil" size={20} style={[styles.icon, { display: mountEdit ? 'flex' : 'none' }]} />
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => { handleDeleteNote(item) }}>
                        <FontAwesomeIcon name="remove" size={25} style={[styles.icon, { display: mounDelete ? 'flex' : 'none' }]} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }





    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    {/* Back to menu button */}
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableOpacity>

                    <Text style={styles.stackTitle}>GHI CHÚ</Text>


                    {/* Edit info button */}
                    <TouchableOpacity onPress={() => { setIsSubMenuVisible(!isSubMenuVisible) }}>
                        <FontAwesomeIcon name="navicon" size={35} />
                    </TouchableOpacity>

                    {isSubMenuVisible && <View style={styles.subMenuContainer}>

                        <TouchableOpacity
                            style={[styles.subMenu, { borderBottomWidth: 2 }]}
                            onPress={() => {
                                handleAddNote()
                                setIsSubMenuVisible(!isSubMenuVisible)
                            }}>
                            <Text>THÊM</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.subMenu, { borderBottomWidth: 2 }]}
                            onPress={() => {
                                setMountEdit(!mountEdit)
                                setIsSubMenuVisible(!isSubMenuVisible)
                                setMountDelete(false)
                            }}>
                            <Text>CHỈNH SỬA</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.subMenu}
                            onPress={() => {
                                setMountDelete(!mounDelete)
                                setIsSubMenuVisible(!isSubMenuVisible)
                                setMountEdit(false)
                            }}>
                            <Text>XÓA</Text>
                        </TouchableOpacity>
                    </View>}

                </View>
            </View>

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
    header: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dfdfdf',
        borderBottomWidth: 2,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    body: {
        width: '90%',
        minHeight: '50%',
        maxHeight: '90%',
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

});
