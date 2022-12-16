import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { app_styles } from './mystyles.js';


import Menu from './src/StackComponents/Menu.js'
import DanhSachPhong from './src/StackComponents/DanhSachPhong.js'
import ChiTietPhong from './src/StackComponents/ChiTietPhong.js'
import GhiChu from './src/StackComponents/GhiChu.js'
import ChiTietHoaDon from './src/StackComponents/ChiTietHoaDon.js'
import ChiTietNguoiO from './src/StackComponents/ChiTietNguoiO.js'
import ThemNguoiO from './src/StackComponents/ThemNguoiO.js'
import ChinhSuaCHiTietNguoiO from './src/StackComponents/ChinhSuaChiTietNguoiO.js'
import ThuTienHoaDon from './src/StackComponents/ThuTienHoaDon.js'
import DanhSachHoaDon from './src/StackComponents/DanhSachHoaDon.js'
import ThietLapDichVu from './src/StackComponents/ThietLapDichVu.js'
import HuongDan from './src/StackComponents/HuongDan.js'
import LapHoaDon from './src/StackComponents/LapHoaDon.js'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="DanhSachPhong" component={DanhSachPhong} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="ChiTietPhong" component={ChiTietPhong} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="ChiTietNguoiO" component={ChiTietNguoiO} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="ThemNguoiO" component={ThemNguoiO} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="ChinhSuaCHiTietNguoiO" component={ChinhSuaCHiTietNguoiO} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="ChiTietHoaDon" component={ChiTietHoaDon} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="DanhSachHoaDon" component={DanhSachHoaDon} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="ThietLapDichVu" component={ThietLapDichVu} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="HuongDan" component={HuongDan} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="GhiChu" component={GhiChu} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="LapHoaDon" component={LapHoaDon} options={{
          headerShown: false,
        }} />
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

