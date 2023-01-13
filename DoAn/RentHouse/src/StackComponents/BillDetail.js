import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import ThuTienHoaDon from './CollectMoney.js';
import { fetchBillDetails } from '../database/actions/billActions.js';
import { useForceUpdate } from '../utils/utils.js';
import { formatCurrency } from 'react-native-format-currency';

export default function App({ navigation, route }) {
	const selected_bill_id = route.params.selected_bill_id;

	const [billDetails, setBillDetails] = useState({});
	const [isThuTienModal, setIsThuTienModal] = useState(false);
	const [forceUpdate, forceUpdateId] = useForceUpdate();
	useEffect(() => {
		const loadBillDetails = async () => {
			const bill = await fetchBillDetails(selected_bill_id).catch((error) =>
				console.log(error)
			);

			setBillDetails(bill);

			console.log(bill);
		};

		loadBillDetails();
	}, [forceUpdateId]);

	return (
		<View style={styles.container}>
			<ScrollView
				style={{ width: '100%' }}
				contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
			>
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
								<Text>Tiền phòng</Text>
								<Text style={styles.textBold}>
									30 ngày, giá: {billDetails.rental_fee}đ
								</Text>
							</View>
							<View>
								<Text>Thành tiền</Text>
								<Text style={styles.textBoldRight}>
									{billDetails.rental_fee}đ
								</Text>
							</View>
						</View>
						{/* Price */}
						<View style={[styles.detailItem, styles.myBackground]}>
							<View>
								<Text>Tiền phòng</Text>
								<Text style={styles.textBold}>
									30 ngày, giá:
									{
										formatCurrency({
											amount: String(billDetails.rental_fee),
											code: 'VND',
										})[0]
									}
								</Text>
							</View>
							<View>
								<Text>Thành tiền</Text>
								<Text style={styles.textBoldRight}>
									{
										formatCurrency({
											amount: String(billDetails.rental_fee),
											code: 'VND',
										})[0]
									}
								</Text>
							</View>
						</View>

						{/* Electricity */}
						<View style={[styles.detailItem, styles.myBackground]}>
							<View>
								<Text>Tiền điện</Text>
								<Text>
									{`Số cũ: ${billDetails.old_electricity_number}, số mới: ${billDetails.new_electricity_number}`}
								</Text>
								<Text style={styles.textBold}>
									{`${billDetails.new_electricity_number - billDetails.old_electricity_number} KWh x ${billDetails.electricity_fee}đ`}
								</Text>
							</View>
							<View>
								<Text>Thành tiền</Text>
								<Text style={styles.textBoldRight}>
									{`${(billDetails.new_electricity_number - billDetails.old_electricity_number) * billDetails.electricity_fee}đ`}
								</Text>
							</View>
						</View>

						{/* Water */}
						<View style={[styles.detailItem, styles.myBackground]}>
							<View>
								<Text>Tiền nước</Text>
								<Text>
									{`Số cũ: ${billDetails.old_water_number}, số mới: ${billDetails.new_water_number}`}
								</Text>
								<Text style={styles.textBold}>
									{`${billDetails.new_water_number - billDetails.old_water_number} VND/m3 x ${billDetails.water_fee}đ`}
								</Text>
							</View>
							<View>
								<Text>Thành tiền</Text>
								<Text style={styles.textBoldRight}>
									{`${(billDetails.new_water_number - billDetails.old_water_number) * billDetails.water_fee}đ`}
								</Text>
							</View>
						</View>

						{/* Credit */}
						<View style={[styles.detailItem, styles.myBackground]}>
							<View>
								<Text>Giảm trừ</Text>
							</View>
							<View>
								<Text>Thành tiền</Text>
								<Text style={styles.textBoldRight}>
									{`${billDetails.credit}đ`}
								</Text>
							</View>
						</View>

						{/* Others fee */}
						<View style={[styles.detailItem, styles.myBackground]}>
							<View>
								<Text>Thu thêm</Text>
							</View>
							<View>
								<Text>Thành tiền</Text>
								<Text style={styles.textBoldRight}>
									{`${billDetails.others_fee}đ`}
								</Text>
							</View>
						</View>

						{/* Total */}
						<View style={[styles.detailItemRight, styles.myBackground]}>
							<Text>Tổng cộng kỳ này</Text>
							<Text style={styles.textBoldRight}>
								{billDetails.total}đ
							</Text>
						</View>
					</View>

					{/* Sum */}
					<View style={[styles.sum, styles.myBorder]}>
						<View
							style={[
								styles.detailItemRight,
								{ borderBottomWidth: 2 },
							]}
						>
							<Text>Khách đã trả</Text>
							<Text style={styles.textBoldRight}>
								{billDetails.total - billDetails.remained}đ
							</Text>
						</View>
						<View style={[styles.detailItem, styles.myBackground]}>
							<View>
								<Text>Số lần thu</Text>
								<Text style={styles.textBold}>
									{billDetails.paid_time} lần
								</Text>
							</View>
							<View>
								<Text>Tổng phải thu</Text>
								<Text style={styles.textBoldRight}>
									{billDetails.remained}đ
								</Text>
							</View>
						</View>
					</View>

					<TouchableOpacity
						style={styles.collectButton}
						onPress={() => {
							setIsThuTienModal(true);
						}}
					>
						<Text style={styles.textTitleWhite}>THU TIỀN HÓA ĐƠN</Text>
					</TouchableOpacity>

					{/* Update current bill */}
					{isThuTienModal && (
						<ThuTienHoaDon
							billDetails={billDetails}
							forceUpdate={forceUpdate}
							setIsThuTienModal={setIsThuTienModal}
						></ThuTienHoaDon>
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
	},
	billDetail: {
		width: '90%',
		height: 'auto',
		alignItems: 'center',
		paddingBottom: 4,
	},
	detailItem: {
		width: '90%',
		minHeight: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 8,
		marginTop: 8,
	},
	detailItemRight: {
		width: '90%',
		minHeight: 75,
		justifyContent: 'center',
		alignItems: 'flex-end',
		paddingRight: 8,
		marginTop: 8,
	},
	sum: {
		width: '90%',
		height: 'auto',
		alignItems: 'center',
		marginTop: 8,
		paddingBottom: 4,
	},

	collectButton: {
		width: '90%',
		height: '5%',
		borderRadius: 10,
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: 'black',
		marginTop: 8,
		marginBottom: 16,
	},

	stackTitle: {
		marginLeft: 32,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
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
	},
	textBoldRight: {
		fontWeight: 'bold',
		textAlign: 'right',
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
