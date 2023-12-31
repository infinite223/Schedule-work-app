import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const widthScreen = Dimensions.get('screen').width

export default function Page() {
    const logout = async () => {
        await AsyncStorage.removeItem('my-key');
    
        router.push('/')
    }
   
  return (
    <SafeAreaProvider style={[styles.container]}>
        <View></View>

        <View style={styles.options}>
          <TouchableOpacity 
              onPress={() => router.push('/informationModal')}
              style={[styles.option]}
          >
              <Ionicons name="md-information-circle-outline" size={27}/>
              <Text style={styles.optionText}>Informacje o aplikacji</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              onPress={() => router.push('/logsListModal')}
              style={[styles.option]}
          >
              <Ionicons name="md-alert-outline" size={27}/>
              <Text style={styles.optionText}>Zapisane logi w apliacji</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              onPress={() => {}}
              style={[styles.option]}
              disabled
          >
              <Ionicons name="notifications-outline" size={25} color={'lightgray'}/>
              <Text style={[styles.optionText, {color: 'lightgray'}]}>Powiadomienia</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              onPress={logout}
              style={[styles.option, {backgroundColor: '#eee', marginTop: 10}]}
          >
              <Ionicons name="log-out-outline" size={25} color={'#f33'}/>
              <Text style={styles.optionText}>Wyloguj mnie</Text>
          </TouchableOpacity>
          <Text style={styles.appVersion}>Schedule work v1.0.1</Text>
        </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, 
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingBottom: 20,
    justifyContent: 'space-between' 
  },
  options: {
    gap: 5
  },
  option: {
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems:'center',
    gap: 10,
    width: widthScreen - 30
  },
  optionText: {
    fontWeight: '600',
  },
  appVersion: {
    fontWeight: '400',
    fontSize: 10,
    alignSelf:'center',
    paddingVertical: 5
  }
})