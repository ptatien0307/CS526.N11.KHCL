import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function App({ navigation }) {
	return (
		<View style={styles.container}>
			{/* Header */}
			<View View style={[styles.header, styles.myBackground]}>
				<Text style={styles.textTitle}>TÊN NHÀ TRỌ</Text>
			</View>

			{/* Container */}
			<View style={styles.body}>

				{/* Row */}
				<View style={styles.row}>

					{/* Go to room list */}
					<TouchableOpacity TouchableOpacity
						style={[styles.feature, styles.myBackground]}
						onPress={() => {
							navigation.navigate("DanhSachPhong");
						}}
					>
						<Text style={styles.textTitle}>DANH SÁCH PHÒNG</Text>

					</TouchableOpacity>

					{/* Go to bill */}
					<TouchableOpacity
						style={[styles.feature, styles.myBackground]}
						onPress={() => { navigation.navigate("LapHoaDon", {}); }}>
						<Text style={styles.textTitle}>LẬP HÓA ĐƠN</Text>
					</TouchableOpacity >

				</View >


				{/* Row */}
				<View style={styles.row}>

					{/* Thu tien hoa don */}
					<TouchableOpacity
						style={[styles.feature, styles.myBackground]}
						onPress={() => { navigation.navigate("DanhSachHoaDon", { billList, setBillList }); }}>
						<Text style={styles.textTitle}>THU TIỀN HÓA ĐƠN</Text>
					</TouchableOpacity>

					{/* Ghi chu */}
					<TouchableOpacity
						style={[styles.feature, styles.myBackground]}
						onPress={() => { navigation.navigate("GhiChu", { notes, setNotes }); }}>
						<Text style={styles.textTitle}>GHI CHÚ</Text>
					</TouchableOpacity>

				</View >

				{/* Row */}
				<View style={styles.row}>

					{/* Cai dat dich vu */}
					<TouchableOpacity
						style={[styles.feature, styles.myBackground]}
						onPress={() => { navigation.navigate("DanhSachHoaDon", {}); }}>
						<Text style={styles.textTitle}>THU TIỀN HÓA ĐƠN</Text>
					</TouchableOpacity>

					{/* Ghi chu */}
					<TouchableOpacity
						style={[styles.feature, styles.myBackground]}
						onPress={() => { navigation.navigate("HuongDan", {}); }}>
						<Text style={styles.textTitle}>HƯỚNG DẪN</Text>
					</TouchableOpacity>

				</View >

			</View >


		</View >
	);

}
const styles = StyleSheet.create({
	container: {
		height: "100%",
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "#ffffff",
	},
	header: {
		marginTop: 12,
		flex: 1,
		width: "90%",
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
		flex: 4,
		width: "90%",
	},
	row: {
		width: "100%",
		height: "33%",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	feature: {
		width: "45%",
		height: "85%",
		alignItems: "center",
		justifyContent: "space-evenly",
	},

	myBackground: {
		backgroundColor: "#dfdfdf",
		borderRadius: 10,
	},

	textTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});
