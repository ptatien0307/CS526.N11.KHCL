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
			const bills = await fetchBillList()
				.catch((error) => console.log(error));

			const data = bills.reduce((accumulator, currentValue) => {
				const monthYear = currentValue.month_year;

				const monthYearGroup = accumulator.find((groupOfMonthYear) => groupOfMonthYear.title === monthYear);

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

					{/* Room status */}
					<View style={styles.bodyTop}>
						<View>
							<Text style={styles.textBody}>Tổng tiền</Text>
							<Text style={styles.textBody}>{formatVNCurrency(item.total, 2)}</Text>
						</View>
						<View>
							<Text style={styles.textBody}>Đã thu</Text>
							<Text style={styles.textBody}>{formatVNCurrency(item.total - item.remained, 2)}</Text>
						</View>
						<View>
							<Text style={styles.textBody}>Còn lại</Text>
							<Text style={styles.textBody}>{formatVNCurrency(item.remained, 2)}</Text>
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
						<Text>{title}</Text>
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
	},
	header: {
		width: '100%',
		height: '10%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#dfdfdf',
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
		height: '100%',
		width: '100%',
	},
	bodyTop: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
	room: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 16,
		paddingVertical: 16,
		marginBottom: 8,
		width: '100%',
		borderLeftWidth: 5,
	},

	styleRoomName: {
		fontWeight: 'bold',
	},

	stackTitle: {
		marginLeft: 32,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		flexDirection: 'row',
	},
	myBackground: {
		backgroundColor: '#dfdfdf',
		borderRadius: 10,
	},
	textBody: {
		fontSize: 15,
		textAlign: 'center',
	},
});
