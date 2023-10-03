import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import { View } from 'react-native'
import DrawerContent from './drawerContent';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroups, setGroups } from '../../slices/groupsSlice';
import { Group } from '../../utils/types';
import { useNavigation } from 'expo-router/src/useNavigation';
import { setWorkPlace } from '../../slices/workPlaceSlice';
import { getGroupsInWorkPlace } from '../../services/group';
import { getWorkPlace } from '../../services/workPlace';
import { getUser } from '../../services/user';

export default function Layout() {
  console.log('layout')

  const groups = useSelector(selectGroups)
  const [groupName, setGroupName] = useState('')
  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        if(jsonValue != null) {
          if(!JSON.parse(jsonValue).user.id) {
            router.push('/login')
          }

          const userFromDb =  await getUser(JSON.parse(jsonValue).authToken, JSON.parse(jsonValue).user?.id)
          const user = await userFromDb.json()

          if(user && user.workPlaceId) {
            await AsyncStorage.setItem('my-key', JSON.stringify({authToken: JSON.parse(jsonValue).authToken, user}))

            const workPlace = await getWorkPlace(JSON.parse(jsonValue).authToken, user.workPlaceId)
            console.log(workPlace.status)
            dispatch(setWorkPlace(await workPlace.json()))
            // console.log(workPlace.status, 'status') 

            const groups = await getGroupsInWorkPlace(JSON.parse(jsonValue).authToken, user.workPlaceId)
            dispatch(setGroups(await groups.json()))
          }
        
        }                
      } catch (e) {
        console.log(e)
        alert('error') 
      }
      
    };

    getData()
  }, [])
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