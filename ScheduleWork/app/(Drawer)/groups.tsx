import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectGroups } from "../../slices/groupsSlice";
import { Group } from "../../utils/types";
import { Ionicons } from "@expo/vector-icons";

const widthScreen = Dimensions.get('screen').width

export default function Page() {
    const [selectedDate, setSelectedDate] = useState('');
    const insets = useSafeAreaInsets();
    const router = useRouter()

    const groups:Group[] = useSelector(selectGroups)

  return (
    <SafeAreaProvider style={[styles.container]}>
        <FlatList
          contentContainerStyle={{ flex: 1}}
          data={groups}
          renderItem={({ item }) => 
              <View
                style={styles.groupContainer}
              >
                  <Text style={styles.headerTitle}>{item.name}</Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700'
  },
  description: {
    fontSize: 15
  },
  groupContainer: {
    width: widthScreen,
    paddingHorizontal: 15,
    borderColor: '#ddd',
    borderBottomWidth: 1
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