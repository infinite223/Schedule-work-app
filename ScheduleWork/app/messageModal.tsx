import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { colors, globalStyles } from '../utils/globalStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

const widthScreen = Dimensions.get('screen').width
const isWeb = Platform.OS === 'web'

export default function MessageModal() {
    const router = useRouter()
    const { type, message } = useLocalSearchParams()

    useEffect(() => {
        setTimeout(() => {
            router.back();
        }, 3500)

    }, [])

  return (
    <View style={[styles.container, globalStyles.boxShadow]}>
      <Text style={{marginHorizontal: 5, marginVertical: 8, fontWeight: '600'}}>{message}</Text>

      {type==="ERROR"?
        <MaterialIcons name="error-outline" size={20} color={colors.errorColor} />:
        <Feather name="check-circle" size={20} color={colors.successColor} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        bottom: 30,
        right: isWeb?30:'auto',
        flexDirection:'row',
        gap: 5,
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        width: isWeb?'auto':widthScreen - 50,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignSelf:'center',
        borderRadius: 50,
    }
})
