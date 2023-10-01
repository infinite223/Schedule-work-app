import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import { View } from 'react-native'
import DrawerContent from './drawerContent';
import { useSelector } from 'react-redux';
import { selectGroups } from '../../slices/groupsSlice';
import { Group } from '../../utils/types';

export default function Layout() {
  const groups = useSelector(selectGroups)
  const [groupName, setGroupName] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        if(jsonValue !== null && JSON.parse(jsonValue).user?.name === null){
          router.push('/editUser')
        }
        else if(jsonValue !== null && JSON.parse(jsonValue).user?.name !== null){
          console.log(JSON.parse(jsonValue).user, 'tuu')
          setGroupName(groups.find((group: Group) => group.id === JSON.parse(jsonValue).user.groupId).name)
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