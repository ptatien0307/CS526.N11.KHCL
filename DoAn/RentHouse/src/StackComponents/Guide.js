import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { ModalAdd, ModalEdit } from '../Dialogs/modal.js';
import { alertDeleteDialog, alertEmptyDialog, editSuccessDialog, deleteSuccessDialog, addSuccessDialog } from '../Dialogs/dialog.js';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation, route }) {




    return (
        <View style={styles.container}>



            {/* Body */}
            <View style={styles.body}>


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
        width: '90%',
        minHeight: '50%',
        maxHeight: '90%',
        paddingLeft: 8,
        zIndex: -99
    },
    stackTitle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
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
