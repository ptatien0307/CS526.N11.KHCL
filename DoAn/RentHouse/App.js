
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import Menu from './Components/Menu.js'
import DanhSachPhong from './Components/DanhSachPhong.js'
import ChiTietPhong from './Components/ChiTietPhong.js'
import GhiChu from './Components/GhiChu.js'
import ChiTietHoaDon from './Components/ChiTietHoaDon.js'
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
        <Stack.Screen name="ChiTietHoaDon" component={ChiTietHoaDon} options={{
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
  },
});
