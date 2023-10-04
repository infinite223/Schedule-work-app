import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectGroups } from "../../slices/groupsSlice";
import { Group } from "../../utils/types";
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { colors } from "../../utils/globalStyles";
import { selectWorkPlace } from "../../slices/workPlaceSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const widthScreen = Dimensions.get('screen').width

export default function Page() {
    const insets = useSafeAreaInsets();
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)
    const workPlace = useSelector(selectWorkPlace)

    const groups:Group[] = useSelector(selectGroups)

    useEffect(() => {
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
                        <MaterialCommunityIcons color={'white'} name='account-group-outline' size={25}/>
                        <View>
                          <Text style={styles.headerTitle}>{item.name}</Text>
                          <Text style={[styles.countPersons, {fontSize: 11}]}>
                            {item.users?.length} osób/a w grupie
                          </Text>
                        </View>
                      </View>
                    </View>
                    {isAdmin&&<View style={{flexDirection:'row', alignItems: 'flex-start', gap: 2}}>
                      <Link
                        asChild
                        href={{pathname: '/editGroup', params: {groupId: item?.id}}}
                      >
                        <TouchableOpacity 
                          style={{ padding: 7 }}
                        >
                          <Octicons name='person-add' size={28} color={'black'}/>
                        </TouchableOpacity>
                      </Link>

                      <Link
                        asChild
                        href={{pathname: '/editGroup', params: {groupId: item?.id}}}
                      >
                        <TouchableOpacity 
                          style={{ padding: 7 }}
                        >
                          <FontAwesome5 name='edit' size={24} color={'black'}/>
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
                            <Ionicons name='person-sharp' size={30}/> 

                            <View>
                              <Text style={styles.name}>{item.name}</Text>
                              <Text style={styles.userName}>{item.userName}</Text>
                            </View>
                          </View>

                          <Ionicons name='md-arrow-forward' size={25}/> 
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
    gap: 20
  },
  leftBox: {
    backgroundColor: colors.baseColor,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 180,
    marginBottom: 10,
    flexDirection:'row',
    alignItems: 'center',
    gap: 15
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  countPersons: {
    fontSize: 15,
    color: 'white'
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
    padding: 10,
    borderRadius: 5,
    // backgroundColor: '#eee',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    fontWeight: '700'
  },
  userName: {

  },
  email: {
    fontSize: 12,
    fontWeight: '300'
  }
})