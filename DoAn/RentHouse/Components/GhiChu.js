import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation, route }) {

    const [notes, setNotes] = useState(route.params.notes)
    const [mountEdit, setMountEdit] = useState(false)
    const [editItemID, setEditItemID] = useState()




    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)

    const [inputText, setInputText] = useState('')


    const renderItem = ({ item }) => {
        return (
            <View style={styles.note}>
                <View style={styles.noteContent}>
                    <Text>{item.id}. {item.noteContent}</Text>
                </View>
                <TouchableHighlight onPress={() => { onPressEdit(item) }}>
                    <Icon name="edit" size={20} style={[styles.editIcon, { display: mountEdit ? 'flex' : 'none' }]} />
                </TouchableHighlight>
            </View>
        )
    }

    const onPressEdit = (item) => {
        setIsEditModalVisible(true)
        setInputText(item.noteContent)
        setEditItemID(item.id)
    }


    const handleAddNote = () => {
        setIsAddModalVisible(true)
    }


    const createAlertButton = () => {
        Alert.alert(
            "Error",
            "Empty note",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }



    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                {/* Back to menu button */}
                <TouchableHighlight onPress={() => { navigation.goBack() }}>
                    <Icon name="arrow-left" size={35} />
                </TouchableHighlight>

                <Text>GHI CHU</Text>


                {/* Edit info button */}
                <TouchableHighlight onPress={() => { setMountEdit(!mountEdit) }}>
                    <Icon name="edit" size={35} />
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


            {/* View edit modal */}
            <Modal
                animationType='fade'
                visible={isEditModalVisible}
                onRequestClose={() => { setIsEditModalVisible(false) }}>
                <View style={styles.modalView}>
                    <Text>Change Text:</Text>
                    <TextInput
                        onChangeText={(text) => { setInputText(text) }}
                        defaultValue={inputText}
                        editable={true}
                        multiline={false}
                        maxLength={256}>
                    </TextInput>
                    <TouchableHighlight style={styles.saveButton}
                        onPress={() => {
                            const newNote = notes.map(item => {
                                if (item.id === editItemID) {
                                    item.noteContent = inputText
                                    return item
                                }
                                return item
                            })
                            setNotes(newNote)
                            route.params.setNotes(newNote)
                            setIsEditModalVisible(false)
                        }}>
                        <Text>SAVE</Text>
                    </TouchableHighlight>
                </View>
            </Modal>


            {/* Add note button */}
            <TouchableHighlight onPress={() => { handleAddNote() }}>
                <Icon name="plus-circle" size={35} />
            </TouchableHighlight>

            {/* View add modal */}
            <Modal
                animationType='fade'
                visible={isAddModalVisible}
                onRequestClose={() => { setIsAddModalVisible(false) }}>
                <View style={styles.modalView}>
                    <TouchableHighlight onPress={() => { setIsAddModalVisible(!isAddModalVisible) }}>
                        <Icon name="times-circle" size={20} />
                    </TouchableHighlight>
                    <Text>Add note:</Text>

                    <TextInput
                        onChangeText={(text) => { setInputText(text) }}
                        defaultValue={inputText}
                        editable={true}
                        multiline={false}
                        maxLength={256}>
                    </TextInput>

                    <TouchableHighlight style={styles.saveButton}
                        onPress={() => {
                            if (inputText === '') {
                                createAlertButton()
                            }
                            else {
                                const newNote = [
                                    ...notes,
                                    {
                                        id: notes[notes.length - 1].id + 1,
                                        noteContent: inputText
                                    }]
                                setNotes(newNote)
                                route.params.setNotes(newNote)
                                setInputText('')
                                setIsAddModalVisible(false)
                            }

                        }}>
                        <Text>SAVE</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
