import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const DeleteDialog = (props) =>{
    const CloseModal = (userChoice) =>
    {
        props.setConfirmDelete(userChoice)
        props.setDeleteDialogVisible(false)
    }
    return(
        <View style={styles.container}>
            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
            <Text style={styles.textTitle}> {props.title} </Text>
            <Text style={styles.message}> {props.message}</Text>
            <View>
                <View>
                    <TouchableOpacity 
                    onPress={CloseModal(true)}> 
                    <Text>Xóa</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                    onPress={CloseModal(false)}>
                    <Text>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
    textMessage: {
		fontSize: 18,
		textAlign: 'center',
	},
})

export{DeleteDialog}
