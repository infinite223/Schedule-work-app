import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link, router  } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { selectGroups, setGroups } from "../../slices/groupsSlice";
import { Group, User } from "../../utils/types";
import { FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { colors, globalStyles } from "../../utils/globalStyles";
import { selectWorkPlace } from "../../slices/workPlaceSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeUserFromGroup, updateUser } from "../../services/user";
import { getGroupsInWorkPlace } from "../../services/group";
import { setSelectedGroupId } from "../../slices/invokeFunction";

const widthScreen = Dimensions.get('screen').width

export default function Page() {
    const [isAdmin, setIsAdmin] = useState(false)
    const workPlace = useSelector(selectWorkPlace)
    const dispatch = useDispatch()
    const groups:Group[] = useSelector(selectGroups)

    useEffect(() => {
      const getData = async () => {
          const jsonValue:any = await AsyncStorage.getItem('my-key');
          const user = (jsonValue != null ? JSON.parse(jsonValue).user : null)

          setIsAdmin(workPlace.adminId === user?.id.toString())
      }

      getData()
      
  }, [])

  const tryRemoveUserFromGroup = async (user: User) => {
    const jsonValue = await AsyncStorage.getItem('my-key');

    if(jsonValue != null) {
        const res = await removeUserFromGroup(
            JSON.parse(jsonValue).authToken,
            user.id,
            user.groupId
        )
        console.log(res.status)

        if(res.status === 200) {
            const groups = await getGroupsInWorkPlace(
                    JSON.parse(jsonValue).authToken, 
                    JSON.parse(jsonValue)?.user.workPlaceId
                )
              
            if(groups.status === 200) {
                dispatch(setGroups(await groups.json()))
                router.back()
            }
        }
    }
  }

  return (
    <View style={[styles.container]}>
        <FlatList
          style={{flex:1}}
          contentContainerStyle={{ gap: 10}}
          data={groups}
          overScrollMode="never"
          renderItem={({ item }) => 
              <View
                style={[styles.groupContainer, globalStyles.boxShadow]}
              >
                  <View style={styles.headerGroup}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                      <View style={styles.leftBox}>
                        <MaterialCommunityIcons color={'black'} name='account-group' size={27}/>
                        <View>
                          <Text style={styles.headerTitle}>{item.name}</Text>
                          <Text style={[styles.countPersons, {fontSize: 11}]}>
                            {item.users?.length} osób/a w grupie
                          </Text>
                        </View>
                      </View>
                    </View>
                    {isAdmin&&<View style={{flexDirection:'row', alignItems: 'center', gap: 2}}>
                      <Link
                        asChild
                        href={{pathname: '/addUserToGroup', 
                        params: {
                          groupId: item?.id,
                          groupName: item.name,
                        }}}
                      >
                        <TouchableOpacity 
                          style={{ padding: 7 }}
                        >
                          <Octicons name='person-add' size={22} color={'black'}/>
                        </TouchableOpacity>
                      </Link>

                      <Link
                        asChild
                        href={{pathname: '/editGroup', params: {
                          groupId: item?.id,
                          groupName: item.name,
                          groupDescription: item.description?item.description: ''
                        }}}
                      >
                        <TouchableOpacity 
                          style={{ padding: 7 }}
                        >
                          <FontAwesome5 name='edit' size={20} color={'black'}/>
                        </TouchableOpacity>
                      </Link>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(setSelectedGroupId(item.id))
                          router.push('/(Drawer)/schedule')
                        }} 
                        
                        activeOpacity={.6} 
                        style={styles.button}
                      >
                        <Text style={{fontSize: 12, color: 'white', fontWeight: '700'}}>Zobacz grafik</Text>
                        <Ionicons name='search' size={17} color={'white'}/> 
                      </TouchableOpacity>
                    </View>}
                  </View>

                  {item.description?.length>0&&
                    <Text style={styles.description}>
                      <Text style={{fontWeight: '300'}}>Opis:</Text> {item.description}
                    </Text>
                  }

                  <FlatList
                    data={item.users}
                    renderItem={({ item }) => 
                      <Link 
                        asChild
                        href={{
                          pathname: '/(Drawer)/profile',
                          params: { userId: item.id },
                        }}
                      >
                        <TouchableOpacity style={styles.userItem}>
                          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
                            <View>
                              <Text style={styles.name}>{item.name}</Text>
                              <Text style={styles.userName}>{item.userName}</Text>
                            </View>
                          </View>

                          <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {isAdmin&&<TouchableOpacity onPress={() => tryRemoveUserFromGroup(item)} style={{paddingHorizontal: 10}}>
                              <Ionicons name='ios-trash-outline' size={24}/>
                            </TouchableOpacity>}

                            <Ionicons name='md-arrow-forward' size={22}/> 
                          </View>
                         
                        </TouchableOpacity>
                      </Link>}
                  />
                  {(!item.users || item.users?.length===0)&&
                    <View style={styles.nousersError}>
                      <Text style={styles.text}>W tej grupie nie ma jeszcze osób...</Text>
                    </View>
                    } 
              </View>
          }
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, 
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10, 
  },
  headerGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5
  },
  button: {
    backgroundColor: colors.baseColor,
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 8,
    maxWidth: 100,
    flexDirection:'row',
    alignItems:'center',
    gap: 5,
    height: 50
  },
  nousersError: {

  },
  text: {
    paddingBottom: 5,
    fontWeight: '300',
    fontSize: 12
  },
  leftBox: {
    borderRadius: 50,
    paddingLeft: 8,
    paddingVertical: 8,
    width: 145,
    marginBottom: 10,
    flexDirection:'row',
    alignItems: 'center',
    gap: 15,
    height: 50
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  countPersons: {
    fontSize: 15,
  },
  description: {
    fontSize: 14,
    fontWeight: '400'
  },
  groupContainer: {
    width: widthScreen,
    paddingHorizontal: 15,
    backgroundColor:'white',
    paddingVertical: 5,
  },
  option: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: '#eee',
    width: widthScreen - 30
  },
  userItem: {
    paddingHorizontal: 5 ,
    paddingVertical: 7,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 14,
    fontWeight: '700'
  },
  userName: {
    fontSize: 13
  },
  email: {
    fontSize: 12,
    fontWeight: '300'
  }
})