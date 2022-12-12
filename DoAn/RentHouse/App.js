import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import Menu from './src/StackComponents/Menu.js'
import DanhSachPhong from './src/StackComponents/DanhSachPhong.js'
import ChiTietPhong from './src/StackComponents/ChiTietPhong.js'
import GhiChu from './src/StackComponents/GhiChu.js'
import ChiTietHoaDon from './src/StackComponents/ChiTietHoaDon.js'
import ChiTietNguoiO from './src/StackComponents/ChiTietNguoiO.js'
import ThemNguoiO from './src/StackComponents/ThemNguoiO.js'
import ChinhSuaCHiTietNguoiO from './src/StackComponents/ChinhSuaChiTietNguoiO.js'
import ThuTienHoaDon from './src/StackComponents/ThuTienHoaDon.js'


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
        <Stack.Screen name="ThuTienHoaDon" component={ThuTienHoaDon} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="GhiChu" component={GhiChu} options={{
          headerShown: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
