import { StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native';
import React, { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import CalHistory from './CalHistory';


export default function MyCalculator() {

    // Initilize useState
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [showBasicBtn, setShowBasicBtn] = useState(true);
    const [textToShow, setTextToShow] = useState('');
    const [isContinuous, setIsContinuous] = useState(true);
    const [isFirst, setIsFirst] = useState(true);
    const [showBlinker, setShowBlinker] = useState(true);
    const [showHistory, setShowHistory] = useState(false);
    const [calHistory, setCalHistory] = useState([]);
    const [historyID, setHistoryID] = useState(0);
    const { width, height } = useWindowDimensions();


    // Initialize button 
    const basicButtons = [['7', '8', '9', '/'], ['4', '5', '6', '*'], ['1', '2', '3', '-'], ['0', '.', '%', '+']];
    const additionButtons = [['sin', 'cos', 'tan', 'log'], ['ln', /*pi*/ decodeURI('%CF%80'), '^', /*square root*/decodeURI('%E2%88%9A')], ['(', ')']];
    const oneTimeButtons = ['+', '-', '*', '/', '.'];

    // Blinking
    useEffect(() => {
        const interval = setInterval(() => {
            setShowBlinker((showBlinker) => !showBlinker);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Handle button function
    const handleInputText = (button) => {
        if (button === '=') {
            let result;

            try {
                result = eval(inputText);
                result = (Math.round(result * 100) / 100).toString();
            }
            catch (e) { }
            finally {
                if (result === undefined) {
                    setOutputText('Error');
                    result = 'Error';
                }
                else
                    setOutputText(result);
                if (isContinuous)
                    setIsContinuous(false);
                else
                    setIsFirst(true);
            }

            setCalHistory([
                {
                    id: historyID + textToShow.length + result.toString().length,
                    in: textToShow,
                    out: result,
                    inFound: 0,
                    outFound: 0
                }, ...calHistory]);
            setHistoryID(historyID + 1);
        }

        else if (button === 'sin' | button === 'cos' | button === 'tan' | button === 'log' | button === 'ln') {
            // First equation (before the '=' button is pressed first time)
            if (isContinuous) {
                setTextToShow(textToShow + `${button}(`);
                setInputText(inputText + `Math.${button}(`);
            }
            else {
                // Check if the pressed button is the first button after the '=' button is pressed
                if (isFirst) {
                    setTextToShow(outputText + `${button}(`);
                    setInputText(outputText + `Math.${button}(`);
                    setIsFirst(false);
                }
                else {
                    setTextToShow(textToShow + `${button}(`);
                    setInputText(inputText + `Math.${button}(`);
                }
            }
        }
        /*pi*/
        else if (button === decodeURI('%CF%80')) {
            setTextToShow(textToShow + decodeURI('%CF%80'));
            setInputText(inputText + '3.141592654');
        }
        else if (button === '^') {
            setTextToShow(textToShow + '^(');
            setInputText(inputText + `**(`);
        }
        // square root
        else if (button === decodeURI('%E2%88%9A')) {
            setTextToShow(textToShow + `${decodeURI('%E2%88%9A')}(`);
            setInputText(inputText + `Math.sqrt(`);
        }
        else if (button === '%') {
            setTextToShow(textToShow + '%');
            setInputText(inputText + '/100');
        }
        else
            if (oneTimeButtons.includes(inputText[inputText.length - 1])) {
                // Prevent operator is next to each other, if true then dont add more character
                if (button === '+' || button === '-' || button === '*' || button === '/') {
                    setInputText(inputText);
                    setTextToShow(textToShow);
                }
                else {
                    // First equation (before the '=' button is pressed first time)
                    if (isContinuous) {
                        setInputText(inputText + button);
                        setTextToShow(textToShow + button);
                    }
                    else {
                        // Check if the pressed button is the first button after the '=' button is pressed

                        if (isFirst) {
                            setInputText(outputText + button);
                            setTextToShow(outputText + button);
                            setOutputText('');
                            setIsFirst(false);
                        }
                        else {
                            setInputText(inputText + button);
                            setTextToShow(textToShow + button);
                        }
                    }
                }
            }
            else {
                // First equation (before the '=' button is pressed first time)

                if (isContinuous) {
                    setInputText(inputText + button);
                    setTextToShow(textToShow + button);
                }
                else {
                    // Check if the pressed button is the first button after the '=' button is pressed
                    if (isFirst) {
                        setInputText(outputText + button);
                        setTextToShow(outputText + button);
                        setOutputText('');
                        setIsFirst(false);
                    }
                    else {
                        setInputText(inputText + button);
                        setTextToShow(textToShow + button);
                    }
                }
            }
    };

    return (
        <View style={[styles.container]}>
            {/* View calculator, including input, output and button */}
            <View style={[styles.calculator, { display: !showHistory ? 'flex' : 'none' }]}>

                <View style={[styles.headerContainer]}>
                    {/* Input text */}
                    <Text style={[styles.text, { fontSize: width > height ? '3rem' : '3.75rem' }]}>
                        {textToShow}
                        <Text style={[styles.text, { color: showBlinker ? 'rgb(217,129,47)' : 'rgb(1,1,1)', fontSize: width > height ? '3rem' : '3.75rem' }]}>
                            |
                        </Text>

                    </Text>

                    {/* Output text */}
                    <Text style={[styles.outText, { fontSize: width > height ? '2.5rem' : '3rem' }]}>
                        {`${outputText} `}
                    </Text>

                    {/* History icon */}
                    <Pressable
                        onPress={() => { setShowHistory(!showHistory); }}
                        style={styles.icon}>
                        {({ pressed }) => (
                            <Icon
                                name="history"
                                size={20}
                                color={pressed ? 'black' : 'rgb(218,139,48)'}
                            />
                        )}
                    </Pressable>
                </View>


                <View style={[styles.bodyContainer]}>

                    <View
                        style={[styles.buttonLayoutContainer, { flexDirection: width > height ? 'row' : 'column' }]}
                    >
                        {/* Basic Button */}

                        <View style={[styles.basicButtonsContainer, { display: showBasicBtn ? 'flex' : 'none' }]}
                        >
                            {
                                basicButtons.map((row, rowIndex) => {
                                    return (
                                        <View
                                            style={[styles.Btncontainer]}
                                            key={row + rowIndex}
                                        >
                                            {
                                                row.map((button) =>
                                                    <Pressable style={styles.btn}
                                                        key={button + row.length}
                                                        onPress={() => handleInputText(button)}>
                                                        <Text style={styles.textBtn}>{button}</Text>
                                                    </Pressable>
                                                )
                                            }
                                        </View>
                                    );
                                })
                            }
                        </View>




                        {/* Additional Button */}
                        <View style={[styles.additionalButtonsContainer, { display: width > height ? 'flex' : !showBasicBtn ? 'flex' : 'none' }]}>
                            {
                                additionButtons.map((row, rowIndex) => {
                                    return (
                                        <View
                                            style={[styles.Btncontainer]}
                                            key={rowIndex}
                                        >
                                            {
                                                row.map((button) =>
                                                    <Pressable style={styles.btn}
                                                        key={button + row.length}
                                                        onPress={() => handleInputText(button)}>
                                                        <Text style={styles.textBtn}>{button}</Text>
                                                    </Pressable>
                                                )
                                            }
                                        </View>
                                    );
                                })
                            }
                        </View>
                    </View>





                    {/* Special button */}
                    <View
                        style={styles.Btncontainer}>
                        {/* Delete character button */}
                        <Pressable
                            style={[styles.btn]}
                            onPress={() => {
                                setInputText(inputText.slice(0, -1));
                                setTextToShow(textToShow.slice(0, -1));
                                setIsFirst(false);
                            }}
                        >
                            <Text style={styles.textBtnSpec}>DEL</Text>
                        </Pressable>

                        {/* AC Button */}
                        <Pressable
                            style={styles.btn}
                            onPress={() => {
                                setInputText('');
                                setOutputText('');
                                setTextToShow('');
                                setIsContinuous(true);
                                setIsFirst(true);
                            }}>
                            <Text style={styles.textBtnSpec}>AC</Text>
                        </Pressable>

                        {/* Go to other math button */}
                        <Pressable
                            style={styles.btn}
                            onPress={() => setShowBasicBtn(!showBasicBtn)}
                            disabled={width > height ? true : false}>
                            <Text style={styles.textBtnSpec}>Math</Text>
                        </Pressable>

                        {/* Equal button */}
                        <Pressable
                            style={styles.btn}
                            onPress={() => handleInputText('=')}>
                            <Text style={styles.textBtnSpec}>=</Text>
                        </Pressable>

                    </View >
                </View>
            </View>


            {/* View history, if history is mounted, then calculator is unmounted and vice versa*/}
            <View style={[styles.history, { display: showHistory ? 'flex' : 'none' }]}>
                <CalHistory
                    myCalHistory={calHistory}
                    myDisplayHistory={showHistory}
                    mySetDisplayHistory={setShowHistory}>
                </CalHistory>
            </View>
        </View >
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(1,1,1)',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    history: {
        flex: 1,
        backgroundColor: 'blue',
        height: '100%',
        width: '100%'
    },
    calculator: {
        flex: 1,
        backgroundColor: 'rgb(1,1,1)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%'
    },
    headerContainer: {
        flex: 3,
        margin: 8,
        paddingHorizontal: 16,
        borderColor: 'white',
        borderRadius: 15,
        width: '95%',
        height: '25%',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative'
    },
    bodyContainer: {
        flex: 5,
        width: '95%',
        backgroundColor: 'rgb(1,1,1)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    // Contains both basic and additional button except 4 special button
    buttonLayoutContainer: {
        flex: 4,
        justifyContent: 'space-evenly',
        width: '100%'
    },
    basicButtonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        width: '100%'
    },
    additionalButtonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        width: '100%'
    },
    Btncontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%'
    },
    btn: {
        flex: 1,
        margin: 8,
        backgroundColor: 'rgb(26,26,26)',
        width: '20%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    textBtn: {
        color: 'white',
        fontSize: 25,
    },
    textBtnSpec: {
        color: 'rgb(218,139,48)',
        fontSize: 25,
    },
    text: {
        flex: 2,
        color: 'white',
    },
    outText: {
        flex: 1,
        color: 'rgb(218,139,48)',
    },
    icon: {
        color: 'rgb(218,139,48)',
        position: 'absolute',
        bottom: 10,
        left: 10,
    }
});
