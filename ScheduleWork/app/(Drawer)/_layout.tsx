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

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('my-key');
  //       if(jsonValue !== null && JSON.parse(jsonValue).user?.name === null){
  //         router.push('/editUser')
  //       }
  //       else if(jsonValue !== null && JSON.parse(jsonValue).user?.name !== null){
  //         console.log(groups, 'tuu')
  //         setGroupName(groups.find((group: Group) => group.id === JSON.parse(jsonValue).user.groupId).name)
  //       }
  //     } catch (e) { 
  //       // error reading value
  //     }
  //   };

  //   getData()
  // }, [groups])

  return (
    <Drawer       
      drawerContent={() => <DrawerContent/>}
    >
      <Drawer.Screen
        name="schedule" 
        options={{
          drawerLabel: "Home",
          title: `Harmonogram`,
          headerTitleStyle: { fontSize: 18 },
        }}
      />
      <Drawer.Screen
        name="profile" 
        options={{
          title: "Twój profil",
        }}
      />
      <Drawer.Screen
        name="groups" 
        options={{
          title: "Grupy",
        }}
      />
    </Drawer>
  );
}