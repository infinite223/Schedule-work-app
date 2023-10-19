import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useRef, useState } from 'react';
import DrawerContent from './drawerContent';
import { useDispatch } from 'react-redux';
import { setGroups } from '../../slices/groupsSlice';
import { setWorkPlace } from '../../slices/workPlaceSlice';
import { getGroupsInWorkPlace } from '../../services/group';
import { getWorkPlace } from '../../services/workPlace';
import { getUser } from '../../services/user';
import { colors } from '../../utils/globalStyles';
import { Platform } from 'react-native'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { setSelectedGroupId } from '../../slices/invokeFunction';
import { Group } from '../../utils/types';
import { setLogsInStorage } from '../../utils/functions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Layout() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        if(jsonValue != null) {
          if(!JSON.parse(jsonValue).user.id) {
            router.push('/login')
          }

          const userFromDb =  await getUser(JSON.parse(jsonValue).authToken, JSON.parse(jsonValue).user?.id)
          
          if(userFromDb.status === 401) {
            await AsyncStorage.removeItem('my-key');
    
            router.push('/')
            
            router.push('/messageModal')
            router.setParams({ message: "Zostałeś automatycznie wylogowany", type: 'ERROR' })
          }

          const user = await userFromDb.json()

          if(user && user.workPlaceId) {
            await AsyncStorage.setItem('my-key', JSON.stringify({authToken: JSON.parse(jsonValue).authToken, user}))

            const workPlace = await getWorkPlace(JSON.parse(jsonValue).authToken, user.workPlaceId)
            if(workPlace.status === 200) {
              dispatch(setWorkPlace(await workPlace.json()))
            }
            else if(workPlace.status === 401){
              router.push('/messageModal')
              router.setParams({ message: "Nie jesteś przydzielony do żadnego miejsca pracy", type: 'ERROR' })
            }
            else {
              alert('Coś poszło nie tak, spróbuj włączyć od nowa aplikacje') 
            }
          }
        
        }                
      } catch (e) {
        alert('Coś poszło nie tak, spróbuj włączyć od nowa aplikacje') 
        setLogsInStorage({file: '/drawer/layout', error: 'trycatch', date: new Date()})
      }
    };

    getData()
  }, [])

  useEffect(() => {
    const tryGetGroupsData = async () => {
      const jsonValue = await AsyncStorage.getItem('my-key');

      if(jsonValue != null && JSON.parse(jsonValue)?.user?.workPlaceId) {
        const groups = await getGroupsInWorkPlace(
          JSON.parse(jsonValue).authToken, JSON.parse(jsonValue)?.user?.workPlaceId)
        
        if(groups.status === 200) {
          const groupsData = await groups.json()
          dispatch(setGroups(groupsData))
          const findMyGroup = groupsData.find((group: Group) => group.id === JSON.parse(jsonValue)?.user?.groupId)
          if(findMyGroup) {
            dispatch(setSelectedGroupId(findMyGroup.id))
          }
        } else {
          setLogsInStorage({file: '/drawer/layout', error: 'error tryGetGroupsData', date: new Date()})
        }
      }
    }

    tryGetGroupsData()

  }, [])

 

  return (
    <Drawer       
      drawerContent={() => <DrawerContent/>}
      screenOptions={{
        headerTitleStyle: { fontSize: 18 }
      }}
    >
      <Drawer.Screen
        name="schedule" 
        options={{
          drawerLabel: "Home",
          title: `Harmonogram`,
          headerTitleStyle: { fontSize: 18, color: 'white' },
          headerStyle: {backgroundColor: colors.baseColor},
          headerTintColor:'white',
        }}
      />
      <Drawer.Screen
        name="profile" 
        options={{
          title: "Twój profil",
          headerTintColor:'black',
        }}
      />
      <Drawer.Screen
        name="groups" 
        options={{
          title: "Dostępne grupy",
          headerTintColor:'black',
        }}
      />
      <Drawer.Screen
        name="timelineWork" 
        options={{
          title: "Najbliższe dni pracy",
          headerTintColor:'black',
        }}
      />
      <Drawer.Screen
        name="settings" 
        options={{
          title: "Ustawienia",
          headerTintColor:'black',
        }}
      />
    </Drawer>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}