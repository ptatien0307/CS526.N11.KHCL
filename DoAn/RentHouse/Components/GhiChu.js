import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, Alert } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { ModalAdd, ModalEdit } from './Modal';
export default function App({ navigation, route }) {

    const [notes, setNotes] = useState(route.params.notes)
    const [mountEdit, setMountEdit] = useState(false)
    const [editItemID, setEditItemID] = useState()
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [inputText, setInputText] = useState('')
    const chooseItemEdit = [true, false, false]

    const alertEmptyDialog = () => {
        Alert.alert(
            "Error",
            "Empty note",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }

    const alertDeleteDialog = () => {
        return new Promise((resolve) => {
            Alert.alert(
                'Title',
                'Message',
                [
                    { text: 'YES', onPress: () => resolve(true) },
                    { text: 'NO', onPress: () => resolve(false) }
                ],
                { cancelable: false }
            )
        })
    }

    const handleDeleteItem = async (deleteItem) => {
        let isConfirm = await alertDeleteDialog()
        if (isConfirm) {
            const newNote = notes.reduce((res, currItem) => {
                if (currItem.id != deleteItem.id)
                    res.push(currItem)
                return res
            }, [])
            setNotes(newNote) // set local notes
            route.params.setNotes(newNote) // set global notes
        }
    }

    const handleEditItem = (item) => {
        setIsEditModalVisible(true)
        setInputText(item.noteContent)
        setEditItemID(item.id)
    }

    const handleAddNote = () => {
        setIsAddModalVisible(true)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.note}>
                <View style={styles.noteContent}>
                    <Text>{item.id}. {item.noteContent}</Text>
                </View>

                <View style={styles.viewIcon}>
                    <TouchableHighlight onPress={() => { handleEditItem(item) }}>
                        <FontAwesomeIcon name="pencil" size={20} style={[styles.icon, { display: mountEdit ? 'flex' : 'none' }]} />
                    </TouchableHighlight>


                    <TouchableHighlight onPress={() => { handleDeleteItem(item) }}>
                        <FontAwesomeIcon name="remove" size={25} style={[styles.icon, { display: mountEdit ? 'flex' : 'none' }]} />
                    </TouchableHighlight>
                </View>
            </View>
        )
    }





    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                {/* Back to menu button */}
                <TouchableHighlight onPress={() => { navigation.goBack() }}>
                    <FontAwesomeIcon name="arrow-left" size={35} />
                </TouchableHighlight>

                <Text>GHI CHÚ</Text>


                {/* Edit info button */}
                <TouchableHighlight onPress={() => { setMountEdit(!mountEdit) }}>
                    <FontAwesomeIcon name="edit" size={35} />
                </TouchableHighlight>
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
                chooseItemEdit={chooseItemEdit}>
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


            {/* Add note button */}
            <TouchableHighlight style={styles.addButton} onPress={() => { handleAddNote() }}>
                <View>
                    <Text style={styles.textTitle}>+ THÊM GHI CHÚ</Text>
                </View>
            </TouchableHighlight >
        </View >
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
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
        marginVertical: 8,
        paddingHorizontal: 8,
    },
    body: {
        width: '90%',
        minHeight: '50%',
        maxHeight: '80%',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    },
    note: {
        margin: 8,
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noteContent: {
        height: 25,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
    },
    viewIcon: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 4,
    },







    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    textBold: {
        fontWeight: 'bold',
    },
    textBoldRight: {
        fontWeight: 'bold',
        textAlign: 'right',
    },
    addButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        position: 'absolute',
        bottom: 8,
    },
    myBorder: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    }

});
