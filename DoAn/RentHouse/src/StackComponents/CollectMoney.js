import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Animated,
	Modal,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { ErrorDialog } from '../Dialogs/ErrorDialog';
import { EmptyDialog } from '../Dialogs/EmptyDialog';
import { SuccessDialog } from '../Dialogs/SuccessDialog';
import { updateBill } from '../database/actions/billActions.js';
import { formatVNCurrency } from '../utils/utils.js';

export default function App({ billDetails, forceUpdate, setIsThuTienModal }) {
	const inAnimetedValue = useRef(new Animated.Value(470)).current;
	const outAnimetedValue = useRef(new Animated.Value(0)).current;

	const [inputText, setInputText] = useState('');
	const [errorDialogVisible, setErrorDialogVisible] = useState(false);
	const [emptyDialogVisible, setEmptyDialogVisible] = useState(false);
	const [successDialogVisible, setSuccessDialogVisible] = useState(false);
	const [messageSuccesDialog, setMessageSuccessDialog] = useState('');

	const handlePartialPayment = () => {
		if (inputText === '') {
			setEmptyDialogVisible(true);
		} else if (parseInt(inputText.replace(/\W+/g, '')) > billDetails.remained) {
			setErrorDialogVisible(true);
		} else {
			const remained =
				billDetails.remained - parseInt(inputText.replace(/\W+/g, ''));
			const count = ++billDetails.paid_time;

			const updatedBill = async () => {
				await updateBill(
					{
						...billDetails,
						remained: remained,
						paid_time: count,
						status: remained ? 'Chưa thanh toán' : 'Đã thanh toán',
					},
					forceUpdate
				).catch((error) => { });
			};

			updatedBill();
			setMessageSuccessDialog(
				`Đã thu thành công ${formatVNCurrency(inputText)}. ${billDetails.room_name
				} còn nợ ${formatVNCurrency(remained)}`
			);
			setSuccessDialogVisible(true);

			setInputText('');
		}
	};

	const handleFullPayment = () => {
		const updatedBill = async () => {
			await updateBill(
				{
					...billDetails,
					remained: 0,
					paid_time: ++billDetails.paid_time,
					status: 'Đã thanh toán',
				},
				forceUpdate
			).catch((error) => { });
		};

		updatedBill();
		setMessageSuccessDialog(
			`Đã thu thành công ${formatVNCurrency(billDetails.remained)}. ${billDetails.room_name
			} đã thanh toán hết.`
		);
		setSuccessDialogVisible(true);

		setInputText('');
	};

	useEffect(() => {
		Animated.timing(inAnimetedValue, {
			toValue: 0,
			duration: 250,
			useNativeDriver: false,
		}).start();
	}, [inAnimetedValue]);

	const slideOutAnimation = () => {
		return new Promise((resolve) => {
			Animated.timing(outAnimetedValue, {
				toValue: 470,
				duration: 250,
				useNativeDriver: false,
			}).start(() => resolve(1));
		});
	};

	const handleClose = async () => {
		await slideOutAnimation().catch((error) => { });
		setIsThuTienModal(false);
	};

	return (
		<View style={[styles.container]}>
			<Animated.View
				style={[
					styles.modal,
					{
						transform: [
							{ translateY: outAnimetedValue },
							{ translateY: inAnimetedValue },
						],
					},
				]}>
				{/* Header */}
				<View style={[styles.header]}>
					<View style={styles.headerTop}>
						<Text style={styles.stackTitle}>THU TIỀN</Text>

						<TouchableOpacity onPress={handleClose}>
							<FontAwesome name="times-circle" size={40} />
						</TouchableOpacity>
					</View>
				</View>

				{/* Body */}
				<View style={styles.body}>
					<View style={styles.nhap}>
						<Text style={{ fontSize: 25 }}>Nhập số tiền khách trả:</Text>
					</View>

					<TextInput
						style={[styles.input, styles.myBorder]}
						onChangeText={(text) => {
							setInputText(formatVNCurrency(text.replace(/\W+/g, ''), 2));
						}}
						placeholder={'Nhập số tiền ...'}
						defaultValue={inputText}
						keyboardType={'numeric'}
					/>

					<View style={[styles.thieu, styles.myBackground]}>
						<Text style={{ fontSize: 20 }}>Khách còn thiếu:</Text>
						<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
							{formatVNCurrency(billDetails.remained)}
						</Text>
					</View>

					<TouchableOpacity
						style={styles.button}
						onPress={handlePartialPayment}>
						<FontAwesome
							name="dollar"
							size={25}
							style={{ color: 'white', marginRight: 16 }}
						/>

						<Text
							style={{
								fontSize: 25,
								fontWeight: 'bold',
								color: 'white',
							}}>
							THU TIỀN
						</Text>
					</TouchableOpacity>

					{
						// Full payment button only appears when the payment is not entered by the user (e.g inputText === '')
						!inputText && (
							<TouchableOpacity
								style={[styles.button, { backgroundColor: 'green' }]}
								onPress={handleFullPayment}>
								<Text
									style={{
										fontSize: 20,
										fontWeight: 'bold',
										color: 'white',
									}}>
									THANH TOÁN HÓA ĐƠN 1 LẦN
								</Text>
							</TouchableOpacity>
						)
					}
				</View>
			</Animated.View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={errorDialogVisible}
				onRequestClose={() => {
					setErrorDialogVisible(false);
				}}>
				<ErrorDialog
					message={'Vui lòng nhập số tiền nhỏ hơn số tiền mà phòng còn thiếu.'}
					setErrorDialogVisible={setErrorDialogVisible}
				/>
			</Modal>
			<Modal
				animationType="slide"
				transparent={true}
				visible={emptyDialogVisible}
				onRequestClose={() => {
					setEmptyDialogVisible(false);
				}}>
				<EmptyDialog setEmptyDialogVisible={setEmptyDialogVisible} />
			</Modal>

			<Modal
				animationType="slide"
				transparent={true}
				visible={successDialogVisible}
				onRequestClose={() => {
					setSuccessDialogVisible(false);
				}}>
				<SuccessDialog
					setSuccessDialogVisible={setSuccessDialogVisible}
					message={messageSuccesDialog}
					callback={handleClose}
				/>
			</Modal>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'rgba(0,0,0,0.5)',
		zIndex: 999,
		position: 'absolute',
	},
	modal: {
		width: '100%',
		height: '40%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		position: 'absolute',
		bottom: 0,
		backgroundColor: 'white',
	},

	header: {
		width: '100%',
		height: '15%',
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

	body: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	nhap: {
		width: '90%',
		height: '10%',
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginBottom: 8,
	},
	input: {
		width: '90%',
		height: '10%',
		marginBottom: 16,
		paddingLeft: 16,
	},
	thieu: {
		width: '90%',
		height: '15%',
		alignItems: 'flex-end',
		justifyContent: 'space-around',
		paddingHorizontal: 16,
		marginBottom: 48,
	},
	button: {
		backgroundColor: 'black',
		borderRadius: 10,
		width: '90%',
		height: '10%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 16,
	},

	stackTitle: {
		marginLeft: 8,
		marginRight: 128,
		fontSize: 35,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	myBackground: {
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
	},
	myBorder: {
		borderColor: 'black',
		borderRadius: 10,
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
