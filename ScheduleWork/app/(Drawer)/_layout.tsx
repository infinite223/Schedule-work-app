import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { View } from 'react-native'
import DrawerContent from './drawerContent';

export default function Layout() {
  const groupName = "Kierowcy"
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        if(jsonValue !== null && JSON.parse(jsonValue).user?.name === null){
          router.push('/editUser')
        }

      } catch (e) {
        // error reading value
      }
    };

    getData()
  }, [])

  return (
    <Drawer       
      drawerContent={() => <DrawerContent/>}
    >
      <Drawer.Screen
        name="schedule" 
        options={{
          drawerLabel: "Home",
          title: `Harmonogram ${groupName}`,
          headerTitleStyle: { fontSize: 18 },
        }}
      />
      <Drawer.Screen
        name="profile" 
        options={{
          drawerLabel: "User",
          title: "Twój profil",
        }}
      />
    </Drawer>
  );
}