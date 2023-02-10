import {
	StyleSheet,
	View,
	Text,
	FlatList,
	SectionList,
	TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { fetchBillList } from '../database/actions/billActions';
import { formatVNCurrency } from '../utils/utils';

export default function App({ navigation }) {
	const isFocused = useIsFocused();
	const [billList, setBillList] = useState([]);

	useEffect(() => {
		const loadBillList = async () => {
			const bills = await fetchBillList().catch((error) => console.log(error));

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
	}, [isFocused]);

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					console.log(item);
					navigation.navigate('BillDetail', {
						selected_bill_id: item.id,
					});
				}}>
				<View style={[styles.room, styles.myBackground]}>
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
	},

	body: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	room: {
		flex: 1,
		justifyContent: 'space-around',
		paddingVertical: 12,
		marginBottom: 16,
		width: '100%',
		borderLeftWidth: 5,
	},
	billMoney: {
		width: '95%',
		height: '70%',
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
		backgroundColor: 'black',
		borderRadius: 10,
		width: '100%',
		marginBottom: 8,
	},
	sectionFooter: {
		marginBottom: 32,
		borderBottomWidth: 2,
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
	textBold: {
		fontWeight: 'bold',
	},
});
