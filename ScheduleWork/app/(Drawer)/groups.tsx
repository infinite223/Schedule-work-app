import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, FlatList, TouchableOpacityBase } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectGroups } from "../../slices/groupsSlice";
import { Group } from "../../utils/types";
import { FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { colors } from "../../utils/globalStyles";
import { selectWorkPlace } from "../../slices/workPlaceSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const widthScreen = Dimensions.get('screen').width

export default function Page() {
    const [isAdmin, setIsAdmin] = useState(false)
    const workPlace = useSelector(selectWorkPlace)

    const groups:Group[] = useSelector(selectGroups)

    useEffect(() => {
      console.log('groups')

      const getData = async () => {
          const jsonValue:any = await AsyncStorage.getItem('my-key');
          const user = (jsonValue != null ? JSON.parse(jsonValue).user : null)

          setIsAdmin(workPlace.adminId === user?.id.toString())
      }

      getData()
      
  }, [])

  return (
    <SafeAreaProvider style={[styles.container]}>
        <FlatList
          contentContainerStyle={{ flex: 1}}
          data={groups}
          renderItem={({ item }) => 
              <View
                style={styles.groupContainer}
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

                      <TouchableOpacity activeOpacity={.6} style={styles.button}>
                        <Text style={{fontSize: 12, color: 'white', fontWeight: '700'}}>Zobacz grafik</Text>
                        <Ionicons name='search' size={17} color={'white'}/> 
                      </TouchableOpacity>
                    </View>
                    {isAdmin&&<View style={{flexDirection:'row', alignItems: 'center', gap: 2}}>
                      <Link
                        asChild
                        href={{pathname: '/editGroup', params: {groupId: item?.id}}}
                      >
                        <TouchableOpacity 
                          style={{ padding: 7 }}
                        >
                          <Octicons name='person-add' size={24} color={'black'}/>
                        </TouchableOpacity>
                      </Link>

                      <Link
                        asChild
                        href={{pathname: '/editGroup', params: {groupId: item?.id}}}
                      >
                        <TouchableOpacity 
                          style={{ padding: 7 }}
                        >
                          <FontAwesome5 name='edit' size={22} color={'black'}/>
                        </TouchableOpacity>
                      </Link>
                    </View>}
                  </View>

                  {item.description?.length>0&&<Text style={styles.description}>{item.description}</Text>}

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
                            {/* <Ionicons name='person-sharp' size={22}/>  */}

                            <View>
                              <Text style={styles.name}>{item.name}</Text>
                              <Text style={styles.userName}>{item.userName}</Text>
                            </View>
                          </View>

                          <Ionicons name='md-arrow-forward' size={22}/> 
                        </TouchableOpacity>
                      </Link>}
                  />
              </View>
          }
        />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, 
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10 
  },
  headerGroup: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5
  },
  button: {
    // backgroundColor: '#cfc',
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
  leftBox: {
    // backgroundColor: colors.baseColor,
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
    // color: 'white',
  },
  countPersons: {
    fontSize: 15,
    // color: 'white'
  },
  description: {
    fontSize: 14,
    fontWeight: '300'
  },
  groupContainer: {
    width: widthScreen,
    paddingHorizontal: 15,
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  option: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: '#eee',
    width: widthScreen - 30
  },
  userItem: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    // backgroundColor: '#eee',
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