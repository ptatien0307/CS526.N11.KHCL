import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated } from 'react-native';
import { useEffect, useState, useRef } from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function App({ navigation, route }) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to menu button */}
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableOpacity>

                    <Text style={styles.stackTitle}>CHI TIẾT HÓA ĐƠN</Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    header: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#dfdfdf',
        marginBottom: 8,
        paddingLeft: 8,
        borderBottomWidth: 2,
    },

    headerTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    stackTitle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },


})