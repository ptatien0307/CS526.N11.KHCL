import { StyleSheet, View, Text, TouchableHighlight, TextInput } from 'react-native';
import { alertEmptyDialog } from '../Dialogs/dialog.js';
import { useState } from 'react';

export default function AddModal({ navigation, route }) {
    const [inputText, setInputText] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <View style={[styles.modalView, styles.myBorder]}>

                    {/* Title modal */}
                    <Text style={[styles.textTitle, styles.myBorder]} >Add note</Text>

                    {/* Edit content */}
                    <TextInput
                        style={[styles.myBorder, styles.text]}
                        onChangeText={(text) => { setInputText(text) }}
                        placeholder={'Nhập...'}
                        editable={true}
                        multiline={false}
                        maxLength={256}>
                    </TextInput>


                    {/* Save button */}
                    <TouchableHighlight style={[styles.saveButton, styles.myBorder]}
                        onPress={() => {
                            if (inputText === '')
                                alertEmptyDialog()
                            else {
                                // Handle add note
                            }

                        }}>
                        <Text style={{ fontSize: 20 }}>SAVE</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View >
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
        color: 'white'
    },
    myBorder: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    },
});
