import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { app_styles } from './mystyles.js';

import Menu from './src/StackComponents/Menu.js';
import RoomList from './src/StackComponents/RoomList.js';
import RoomDetail from './src/StackComponents/RoomDetail.js';
import NoteList from './src/StackComponents/NoteList.js';
import BillDetail from './src/StackComponents/BillDetail.js';
import MemberDetail from './src/StackComponents/MemberDetail.js';
import AddMember from './src/StackComponents/AddMember.js';
import EditMember from './src/StackComponents/EditMember.js';
import BillList from './src/StackComponents/BillList.js';
import Guide from './src/StackComponents/Guide.js';
import CreateBill from './src/StackComponents/CreateBill.js';
import Service from './src/StackComponents/Service.js';

import AddModal from './src/Modals/AddModal.js';
import EditModal from './src/Modals/EditModal.js';

const Stack = createNativeStackNavigator();

import { createDatabase, deleteDatabse } from './src/database/db.js';

export default function App() {
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
				<Stack.Screen name="RoomList" component={RoomList} />
				<Stack.Screen name="RoomDetail" component={RoomDetail} />
				<Stack.Screen name="MemberDetail" component={MemberDetail} />
				<Stack.Screen name="AddMember" component={AddMember} />
				<Stack.Screen name="EditMember" component={EditMember} />
				<Stack.Screen name="BillDetail" component={BillDetail} />
				<Stack.Screen name="BillList" component={BillList} />
				<Stack.Screen name="Guide" component={Guide} />
				<Stack.Screen name="NoteList" component={NoteList} />
				<Stack.Screen name="CreateBill" component={CreateBill} />
				<Stack.Screen name="Service" component={Service} />

				<Stack.Screen name="AddModal" component={AddModal} />
				<Stack.Screen name="EditModal" component={EditModal} />
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
