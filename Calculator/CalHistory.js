import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
export default function CalHistory(props) {

    const [searchedHistory, setSearchedHistory] = useState([])
    const [searchText, setSearchText] = useState('')


    // Copy calculation history
    useEffect(() => {
        setSearchedHistory([...props.myCalHistory])
    }, [props.myCalHistory])




    return (
        <View style={[styles.container,
        { display: props.myDisplayHistory ? 'flex' : 'none' }]}>
            {/* History icon, click to hide history */}
            <Pressable
                onPress={() => { props.mySetDisplayHistory(!props.myDisplayHistory) }}
                style={[styles.icon]}>
                {({ pressed }) => (
                    <Icon
                        name="history"
                        size={20}
                        color={pressed ? 'black' : 'rgb(218,139,48)'}
                    />
                )}
            </Pressable>


            {/* View search*/}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.search}
                    placeholder="Please enter text..."
                    onChangeText={inputText => setSearchText(inputText)}>
                </TextInput>
            </View>


            {/* View History */}
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {
                        searchedHistory.filter(element => {
                            // if searchText is empty, refresh searchedHistory
                            if (searchText === '') {
                                element.inFound = 0
                                element.outFound = 0
                            }
                            else {
                                // check if input or output text includes searchText
                                if (element.in.includes(searchText) && searchText !== '')
                                    element.inFound = 1
                                else
                                    element.inFound = 0

                                if (element.out.includes(searchText) && searchText !== '')
                                    element.outFound = 1
                                else
                                    element.outFound = 0
                            }


                            // return pair of input and output if one of the two includes searchText
                            return element.in.includes(searchText) || element.out.includes(searchText)
                        }).map(element =>

                            // Highlight background of input or output or both if including searchText
                            <View style={styles.box}>
                                {/*View input text */}
                                <Text style={[styles.inputText,
                                {
                                    backgroundColor: element.inFound ? 'rgb(217,129,47)' : 'none',
                                    color: element.inFound ? 'black' : 'rgba(128,128,128,0.5)'
                                }]}>
                                    {element.in}</Text>

                                {/*View output text */}
                                <Text style={[styles.outputText,
                                {
                                    backgroundColor: element.outFound ? 'rgb(217,129,47)' : 'none',
                                    color: element.outFound ? 'black' : 'white'
                                }]}>
                                    {'=' + element.out}</Text>
                            </View>
                        )
                    }


                </ScrollView >
            </View>



        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(1,1,1)',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        position: 'absolute'
    },

    scrollContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    searchContainer: {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: 'rgb(1,1,1)',
        width: '98%',
        height: 50,
        paddingLeft: 8,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 99,
    },
    search: {
        marginLeft: 16,
        fontSize: 15,
        opacity: 0.5,
        color: '#fff',
        width: '100%'
    },
    inputText: {
        color: 'rgb(119,119,119)',
        fontSize: 20,
    },
    outputText: {
        color: 'white',
        fontSize: 30,
    },
    box: {
        borderBottomColor: 'rgba(128,128,128,0.5)',
        borderBottomWidth: 2,
        marginRight: 8,
        marginBottom: 8,
        width: '100%',
        height: 80,
    },
    icon: {
        marginRight: 8,
        margin: 8,
        zIndex: 99,
    }
})
