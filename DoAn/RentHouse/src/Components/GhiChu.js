import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, Alert } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { ModalAdd, ModalEdit } from './Modal';
export default function App({ navigation, route }) {

    const [notes, setNotes] = useState(route.params.notes)

    const [mountEdit, setMountEdit] = useState(false)
    const [mounDelete, setMountDelete] = useState(false)
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false)




    const [editItemID, setEditItemID] = useState()
    const [inputText, setInputText] = useState('')



    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)




    const alertEmptyDialog = () => {
        Alert.alert(
            "Lỗi",
            "Nội dung ghi chú bị bỏ trống.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }

    const alertDeleteDialog = () => {
        return new Promise((resolve) => {
            Alert.alert(
                'Xóa ghi chú',
                'Bạn có chắc chắn muốn xóa ghi chú này ?',
                [
                    { text: 'YES', onPress: () => resolve(true) },
                    { text: 'NO', onPress: () => resolve(false) }
                ],
                { cancelable: false }
            )
        })
    }

    const handleDeleteNote = async (deleteNote) => {
        let isConfirm = await alertDeleteDialog()
        if (isConfirm) {
            const newNoteList = notes.reduce((res, currNote) => {
                if (currNote.id != deleteNote.id)
                    res.push(currNote)
                return res
            }, [])
            setNotes(newNoteList) // set local notes
            route.params.setNotes(newNoteList) // set global notes
        }
    }

    const handleEditNote = (note) => {
        setIsEditModalVisible(true)
        setInputText(note.noteContent)
        setEditItemID(note.id)
    }

    const handleAddNote = () => {
        setIsAddModalVisible(true)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.note, styles.myBackground]}>
                <View style={styles.noteContent}>
                    <Text>{item.id}. {item.noteContent}</Text>
                </View>

                <View style={styles.noteIcon}>
                    <TouchableHighlight onPress={() => { handleEditNote(item) }}>
                        <FontAwesomeIcon name="pencil" size={20} style={[styles.icon, { display: mountEdit ? 'flex' : 'none' }]} />
                    </TouchableHighlight>


                    <TouchableHighlight onPress={() => { handleDeleteNote(item) }}>
                        <FontAwesomeIcon name="remove" size={25} style={[styles.icon, { display: mounDelete ? 'flex' : 'none' }]} />
                    </TouchableHighlight>
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
                    <TouchableHighlight onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableHighlight>

                    <Text style={styles.stackTitle}>GHI CHÚ</Text>


                    {/* Edit info button */}
                    <TouchableHighlight onPress={() => { setIsSubMenuVisible(!isSubMenuVisible) }}>
                        <FontAwesomeIcon name="navicon" size={35} />
                    </TouchableHighlight>
                    {isSubMenuVisible && <View style={styles.subMenuContainer}>

                        <TouchableHighlight
                            style={styles.subMenu}
                            onPress={() => {
                                handleAddNote()
                                setIsSubMenuVisible(!isSubMenuVisible)
                            }}>
                            <Text>THÊM</Text>
                        </TouchableHighlight>


                        <TouchableHighlight
                            style={styles.subMenu}
                            onPress={() => {
                                setMountEdit(!mountEdit)
                                setIsSubMenuVisible(!isSubMenuVisible)
                                setMountDelete(false)
                            }}>
                            <Text>CHỈNH SỬA</Text>
                        </TouchableHighlight>


                        <TouchableHighlight
                            style={styles.subMenu}
                            onPress={() => {
                                setMountDelete(!mounDelete)
                                setIsSubMenuVisible(!isSubMenuVisible)
                                setMountEdit(false)
                            }}>
                            <Text>XÓA</Text>
                        </TouchableHighlight>
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
        position: 'absolute',
        top: 0,
        zIndex: 99,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    body: {
        marginTop: 64,
        width: '90%',
        minHeight: '50%',
        maxHeight: '90%',
        paddingLeft: 8,
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
        backgroundColor: 'white',
        width: '50%',
        height: '150%',
        position: 'absolute',
        top: 70,
        right: 40,
        justifyContent: 'space-around'
    },
    subMenu: {
        width: '100%',
        height: '30%',
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
