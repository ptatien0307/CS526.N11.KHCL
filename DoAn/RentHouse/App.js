import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useEffect } from 'react';
import { app_styles } from './mystyles.js';

import Menu from './src/StackComponents/Menu.js';
import RoomList from './src/StackComponents/RoomList.js';
import AddNewRoom from './src/StackComponents/AddNewRoom.js';
import RoomDetail from './src/StackComponents/RoomDetail.js';
import EditBasicInfo from './src/StackComponents/EditBasicInfo.js';
import EditRoomService from './src/StackComponents/EditRoomService.js';

import NoteList from './src/StackComponents/NoteList.js';
import EditNote from './src/StackComponents/EditNote.js';

import BillDetail from './src/StackComponents/BillDetail.js';

import MemberDetail from './src/StackComponents/MemberDetail.js';
import AddMember from './src/StackComponents/AddMember.js';
import EditMember from './src/StackComponents/EditMember.js';

import BillList from './src/StackComponents/BillList.js';
import CreateBill from './src/StackComponents/CreateBill.js';
import CreateBillDetail from './src/StackComponents/CreateBillDetail.js';

import Infor from './src/StackComponents/Infor.js';

import Service from './src/StackComponents/Service.js';
import EditService from './src/StackComponents/EditService.js';

const Stack = createNativeStackNavigator();

import {
	createDatabase,
	deleteDatabase,
	enableForeignKeys,
	enableAutoVacuum,
	vacuum,
} from './src/database/db.js';

export default function App() {
	// Initialize database
	useEffect(() => {
		enableForeignKeys();
		deleteDatabase();
		enableAutoVacuum();
		vacuum();
		createDatabase();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Menu"
					component={Menu}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name="RoomList" component={RoomList} options={{ title: 'Danh sách phòng' }}/>
				<Stack.Screen name="AddNewRoom" component={AddNewRoom} options={{ title: 'Thêm phòng' }}/>

				<Stack.Screen name="RoomDetail" component={RoomDetail} options={{ title: 'Thông tin phòng' }}/>
				<Stack.Screen name="EditBasicInfo" component={EditBasicInfo} options={{ title: 'Chỉnh sửa thông tin phòng' }}/>
				<Stack.Screen name="EditRoomService" component={EditRoomService} options={{ title: 'Chỉnh sửa dịch vụ phòng' }}/>

				<Stack.Screen name="MemberDetail" component={MemberDetail} options={{ title: 'Thông tin khách thuê' }}/>
				<Stack.Screen name="AddMember" component={AddMember} options={{ title: 'Thêm khách thuê' }}/>
				<Stack.Screen name="EditMember" component={EditMember} options={{ title: 'Chỉnh thông tin khách' }}/>

				<Stack.Screen name="BillList" component={BillList} options={{ title: 'Danh sách hóa đơn' }} />
				<Stack.Screen name="BillDetail" component={BillDetail} options={{ title: 'Chi tiết hóa đơn' }}/>

				<Stack.Screen name="CreateBill" component={CreateBill} options={{ title: 'Danh sách phòng' }}/>
				<Stack.Screen name="CreateBillDetail" component={CreateBillDetail} options={{ title: 'Lập hóa đơn' }}/>

				<Stack.Screen name="Infor" component={Infor} options={{ title: 'Thông tin trọ' }} />

				<Stack.Screen name="NoteList" component={NoteList} options={{ title: 'Ghi chú' }}/>

				<Stack.Screen name="Service" component={Service} options={{ title: 'Dịch vụ' }}/>
				<Stack.Screen name="EditService" component={EditService} options={{ title: 'Cài đặt dịch vụ' }}/>

				<Stack.Screen name="EditNote" component={EditNote} options={{ title: 'Chi tiết ghi chú' }}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

// de lam sau
// const MyTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: app_styles.gray,
//   },
// };
