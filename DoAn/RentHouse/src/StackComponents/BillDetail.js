import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { printAsync } from 'expo-print';

import ThuTienHoaDon from './CollectMoney.js';
import { fetchBillDetails } from '../database/actions/billActions.js';
import {
	useForceUpdate,
	formatVNCurrency,
	formatHTMLBill,
} from '../utils/utils.js';

const wh = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function App({ route }) {
	const selected_bill_id = route.params.selected_bill_id;

	const isFocused = useIsFocused();
	const [billDetails, setBillDetails] = useState({});
	const [isThuTienModal, setIsThuTienModal] = useState(false);
	const [forceUpdate, forceUpdateId] = useForceUpdate();

	const handlePrintBill = async () => {
		const html = formatHTMLBill(billDetails);
		await printAsync({ html });
	};


	useEffect(() => {
		const loadBillDetails = async () => {
			const bill = await fetchBillDetails(selected_bill_id).catch((error) =>
				console.log(error)
			);

			setBillDetails(bill);
		};

		loadBillDetails();
	}, [forceUpdateId, isFocused]);

	return (
		<View style={styles.container}>
			<ScrollView
				style={{ width: '100%' }}
				contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
				{/* Bill detail */}
				<View style={[styles.billDetail, styles.myBorder]}>
					{/* Name and day */}
					<View>
						<Text style={styles.textTitle}>{billDetails.room_name}</Text>
						<Text style={styles.textTitle}>{billDetails.created_at}</Text>
					</View>

					{/* Price */}
					<View style={[styles.detailItem, styles.myBackground]}>
						<View>
							<Text style={styles.subText}>Tiền phòng</Text>
							<Text style={styles.subText}>
								{`Số tháng: ${billDetails.number_of_months}, số ngày: ${billDetails.number_of_days}`}
							</Text>
							<Text style={styles.textBold}>
								{formatVNCurrency(billDetails.rental_fee)}/tháng
							</Text>
						</View>
						<View>
							<Text style={styles.subText}>Thành tiền</Text>
							<Text style={styles.textBoldRight}>
								{formatVNCurrency(
									billDetails.rental_fee * billDetails.number_of_months +
									Math.round(billDetails.rental_fee / 30) *
									billDetails.number_of_days
								)}
							</Text>
						</View>
					</View>

					{/* Electricity */}
					<View style={[styles.detailItem, styles.myBackground]}>
						<View>
							<Text style={styles.subText}>Tiền điện</Text>
							<Text style={styles.subText}>
								{`Số cũ: ${billDetails.old_electricity_number}, số mới: ${billDetails.new_electricity_number}`}
							</Text>
							<Text style={styles.textBold}>
								{`${billDetails.new_electricity_number -
									billDetails.old_electricity_number
									} KWh x ${formatVNCurrency(billDetails.electricity_fee)}/KWh`}
							</Text>
						</View>
						<View>
							<Text style={styles.subText}>Thành tiền</Text>
							<Text style={styles.textBoldRight}>
								{formatVNCurrency(
									(billDetails.new_electricity_number -
										billDetails.old_electricity_number) *
									billDetails.electricity_fee
								)}
							</Text>
						</View>
					</View>

					{/* Water */}
					<View style={[styles.detailItem, styles.myBackground]}>
						<View>
							<Text style={styles.subText}>Tiền nước</Text>
							<Text style={styles.subText}>
								{`Số cũ: ${billDetails.old_water_number}, số mới: ${billDetails.new_water_number}`}
							</Text>
							<Text style={styles.textBold}>
								{`${billDetails.new_water_number - billDetails.old_water_number
									} khối x ${formatVNCurrency(billDetails.water_fee)}/khối`}
							</Text>
						</View>
						<View>
							<Text style={styles.subText}>Thành tiền</Text>
							<Text style={styles.textBoldRight}>
								{formatVNCurrency(
									(billDetails.new_water_number -
										billDetails.old_water_number) *
									billDetails.water_fee
								)}
							</Text>
						</View>
					</View>

					{/* Garbage */}
					<View style={[styles.detailItem, styles.myBackground]}>
						<View>
							<Text style={styles.subText}>Tiền rác</Text>
						</View>
						<View>
							<Text style={styles.subText}>Thành tiền</Text>
							<Text style={styles.textBoldRight}>
								{formatVNCurrency(billDetails.garbage_fee)}
							</Text>
						</View>
					</View>

					{/* Internet */}
					<View style={[styles.detailItem, styles.myBackground]}>
						<View>
							<Text style={styles.subText}>Tiền Internet</Text>
						</View>
						<View>
							<Text style={styles.subText}>Thành tiền</Text>
							<Text style={styles.textBoldRight}>
								{formatVNCurrency(billDetails.internet_fee)}
							</Text>
						</View>
					</View>

					{/* Credit */}
					<View style={[styles.detailItem, styles.myBackground]}>
						<View>
							<Text style={styles.subText}>Giảm trừ</Text>
						</View>
						<View>
							<Text style={styles.textBoldRight}>
								{formatVNCurrency(billDetails.credit)}
							</Text>
						</View>
					</View>

					{/* Others fee */}
					<View style={[styles.detailItem, styles.myBackground]}>
						<View>
							<Text style={styles.subText}>Thu thêm</Text>
						</View>
						<View>
							<Text style={styles.textBoldRight}>
								{formatVNCurrency(billDetails.others_fee)}
							</Text>
						</View>
					</View>

					{/* Total */}
					<View style={[styles.detailItemRight, styles.myBackground]}>
						<Text style={styles.subText}>Tổng cộng kỳ này</Text>
						<Text style={styles.textBoldRight}>
							{formatVNCurrency(billDetails.total)}
						</Text>
					</View>
				</View>

				{/* Sum */}
				<View style={[styles.sum, styles.myBorder]}>
					<View style={[styles.detailItemRight, { borderBottomWidth: 2 }]}>
						<Text style={styles.subText}>Khách đã trả</Text>
						<Text style={styles.textBoldRight}>
							{formatVNCurrency(billDetails.total - billDetails.remained)}
						</Text>
					</View>
					<View style={[styles.detailItem, styles.myBackground]}>
						<View>
							<Text style={styles.subText}>Số lần thu</Text>
							<Text style={styles.textBold}>{billDetails.paid_time} lần</Text>
						</View>
						<View>
							<Text style={styles.subText}>Tổng phải thu</Text>
							<Text style={styles.textBoldRight}>
								{formatVNCurrency(billDetails.remained)}
							</Text>
						</View>
					</View>
				</View>

				<TouchableOpacity
					style={[
						styles.button,
						{ backgroundColor: billDetails.remained ? 'black' : 'green' },
					]}
					onPress={() => {
						setIsThuTienModal(true);
					}}
					disabled={!billDetails.remained}>
					<Text style={styles.textTitleWhite}>
						{billDetails.remained ? `THU TIỀN HÓA ĐƠN` : `HÓA ĐƠN ĐÃ ĐƯỢC THU`}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.button,
						{ marginBottom: vh / 10, backgroundColor: 'black' },
					]}
					onPress={handlePrintBill}>
					<Text style={styles.textTitleWhite}>IN HÓA ĐƠN</Text>
				</TouchableOpacity>

				{/* Update current bill */}
				{isThuTienModal && (
					<ThuTienHoaDon
						billDetails={billDetails}
						forceUpdate={forceUpdate}
						setIsThuTienModal={setIsThuTienModal}
					/>
				)}
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 4,
	},
	billDetail: {
		width: '100%',
		height: 'auto',
		alignItems: 'center',
		padding: 4,
	},
	detailItem: {
		width: '100%',
		minHeight: vh / 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 8,
		marginTop: 8,
	},
	detailItemRight: {
		width: '100%',
		minHeight: vh / 10,
		justifyContent: 'center',
		alignItems: 'flex-end',
		paddingRight: 8,
		marginTop: 8,
	},
	sum: {
		width: '100%',
		height: 'auto',
		alignItems: 'center',
		marginTop: vh / 30,
		padding: 4,
	},

	button: {
		width: '100%',
		height: '5%',
		borderRadius: 10,
		justifyContent: 'center',
		alignContent: 'center',
		marginVertical: 16,
	},
	subText: {
		fontSize: 16,
	},
	textTitleWhite: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textBold: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	textBoldRight: {
		fontWeight: 'bold',
		textAlign: 'right',
		fontSize: 16,
	},
	myBackground: {
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
	},
	myBorder: {
		borderColor: 'black',
		borderRadius: 15,
		borderWidth: 2,
	},
});
