import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import DrawerContent from './drawerContent';
import { useDispatch } from 'react-redux';
import { setGroups } from '../../slices/groupsSlice';
import { setWorkPlace } from '../../slices/workPlaceSlice';
import { getGroupsInWorkPlace } from '../../services/group';
import { getWorkPlace } from '../../services/workPlace';
import { getUser } from '../../services/user';
import { getAllUsersInDay } from '../../services/userInDay';
import { colors } from '../../utils/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

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
          const user = await userFromDb.json()

          if(user && user.workPlaceId) {
            await AsyncStorage.setItem('my-key', JSON.stringify({authToken: JSON.parse(jsonValue).authToken, user}))

            const workPlace = await getWorkPlace(JSON.parse(jsonValue).authToken, user.workPlaceId)
            console.log(workPlace.status)
            dispatch(setWorkPlace(await workPlace.json()))

            const groups = await getGroupsInWorkPlace(JSON.parse(jsonValue).authToken, user.workPlaceId)
            dispatch(setGroups(await groups.json()))
          }
        
        }                
      } catch (e) {
        alert('Coś poszło nie tak, spróbuj włączyć od nowa aplikacje') 
      }
    };

    getData()
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
        }}
      />
      <Drawer.Screen
        name="groups" 
        options={{
          title: "Dostępne grupy",
        }}
      />
      <Drawer.Screen
        name="timelineWork" 
        options={{
          title: "Najbliższe dni pracy",
        }}
      />
      <Drawer.Screen
        name="settings" 
        options={{
          title: "Ustawienia",
        }}
      />
    </Drawer>
  );
}