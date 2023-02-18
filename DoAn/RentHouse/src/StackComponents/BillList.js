import {
	StyleSheet,
	View,
	Text,
	SectionList,
	TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { useIsFocused } from '@react-navigation/native';
import { fetchBillList, deleteBill } from '../database/actions/billActions';
import { formatVNCurrency, useForceUpdate } from '../utils/utils';

import { Dimensions } from 'react-native';

const wh = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function App({ navigation }) {
	const isFocused = useIsFocused();
	const [billList, setBillList] = useState([]);
	const [forceUpdateBillList, forceUpdateBillListID] = useForceUpdate();

	useEffect(() => {
		const loadBillList = async () => {
			const bills = await fetchBillList().catch((error) => { });

			const data = bills.reduce((accumulator, currentValue) => {
				const monthYear = currentValue.month + '/' + currentValue.year;

				const monthYearGroup = accumulator.find(
					(groupOfMonthYear) => groupOfMonthYear.title === monthYear
				);

				if (monthYearGroup) {
					monthYearGroup.data.push(currentValue);
				} else {
					accumulator.push({
						title: monthYear,
						data: [currentValue],
					});
				}

				return accumulator;
			}, []);

			setBillList(data);
		};

		loadBillList();
	}, [isFocused, forceUpdateBillListID]);

	const handleDeleteBill = async (billID) => {
		await deleteBill(billID, forceUpdateBillList).catch((error) => { });
	};

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('BillDetail', {
						selected_bill_id: item.id,
					});
				}}>
				<View style={[styles.room, styles.myBackground]}>
					<View style={styles.billInfo}>
						{/* Room name */}
						<View>
							<Text style={styles.styleRoomName}>
								{item.room_name} - {item.created_at}
							</Text>
						</View>

						{/* Bill money: total, collected, remained */}
						<View style={styles.billMoney}>
							{/* Total */}
							<View style={[styles.myBorder, styles.money]}>
								<Text>Tổng tiền:</Text>
								<Text style={styles.textBold}>
									{formatVNCurrency(item.total)}
								</Text>
							</View>

							{/* Collected */}
							<View
								style={[
									styles.myBorder,
									styles.money,
									{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									},
								]}>
								<View>
									<Text>Đã thu:</Text>
									<Text style={styles.textBold}>
										{formatVNCurrency(item.total - item.remained)}
									</Text>
								</View>
							</View>

							{/* Remained */}
							<View style={[styles.myBorder, styles.money]}>
								<Text>Còn lại: </Text>
								<Text style={styles.textBold}>
									{formatVNCurrency(item.remained)}
								</Text>
							</View>
						</View>
					</View>

					<TouchableOpacity
						onPress={() => {
							handleDeleteBill(item.id);
						}}
						style={[styles.deleteIcon]}>
						<FontAwesome
							name="remove"
							size={25}
							style={{ color: 'white' }}
						/>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.body}>
				<SectionList
					sections={billList}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					renderSectionHeader={({ section: { title } }) => (
						<View style={styles.sectionHeader}>
							<Text style={styles.sectionText}>{title}</Text>
						</View>
					)}
					renderSectionFooter={({ section: { title } }) => (
						<View style={styles.sectionFooter}></View>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#d9d9d9',
	},

	body: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	room: {
		flex: 1,
		marginBottom: 16,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
	},
	billMoney: {
		width: '95%',
		height: '80%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	money: {
		paddingLeft: 8,
		paddingVertical: 8,
		width: '30%',
		height: '80%',
		justifyContent: 'center',
	},

	styleRoomName: {
		paddingLeft: 8,
		fontWeight: 'bold',
		fontSize: 17,
	},
	sectionText: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		color: 'white',
	},

	sectionHeader: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#6bec4b',
		borderRadius: 10,
		width: '100%',
		marginBottom: 8,
		height: vh / 17,
	},
	sectionFooter: {
		marginBottom: 32,
		borderBottomWidth: 2,
	},

	myBackground: {
		backgroundColor: 'white',
		borderRadius: 10,
	},
	myBorder: {
		borderColor: 'black',
		borderRadius: 15,
		borderWidth: 2,
	},
	textBold: {
		fontWeight: 'bold',
	},
	billInfo: {
		width: '95%',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
	},
	deleteIcon: {
		position: 'absolute',
		right: 0,
		backgroundColor: 'black',
		height: '130%',
		width: '10%',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
});
