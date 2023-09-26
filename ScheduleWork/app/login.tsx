import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { colors, globalStyles } from '../utils/globalStyles'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const widthScreen = Dimensions.get('screen').width

const login = () => {
  const router = useRouter()

  const loadingTest = () => {
    router.push('/messageModal')
    router.setParams({ message: "Coś pooszło nie tak oło nie tak", type: 'SUCCESS' })

    // router.push('/loadingModal')

    // setTimeout(() => {
    //     router.push('/login')
    // }, 5000)
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity 
            onPress={() => router.back()}
            style={[styles.backButton, globalStyles.boxShadow]}
        >
            <Ionicons name="arrow-back-sharp" size={20} color="black" />
        </TouchableOpacity>

        <View>

        </View>
        
        <View style={{alignItems:'center', gap: 20}}>
            <View style={styles.header}>
                <MaterialCommunityIcons 
                    name="account-plus-outline" 
                    size={35} 
                    color="#888" 
                />
                <Text style={styles.headerText}>Tworzenie konta</Text>
            </View>

            <Text style={styles.text}>
                Podaj email by dołączyć
            </Text>

            <TextInput
                placeholder='Email'
                style={[styles.emailInput, globalStyles.boxShadow]}
            />

            <TouchableOpacity 
                onPress={() =>loadingTest()}
                style={[styles.sendButton, globalStyles.boxShadow]}
            >
                <Text style={{color: 'white', fontWeight: '700'}}>
                    Wyślij mi kod
                </Text>
                <Ionicons name="arrow-forward-outline" size={20} color="white" />

            </TouchableOpacity>
        </View>

        <Text style={styles.descriptionText}>
            Dostęp do miejsca pracy jest nadawany automatycznie przez pracodawce poprzez przypisanie adresu email do miejsca pracy.
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'space-between', 
        flex: 1,
        gap: 30,
        backgroundColor:'white'
    },
    backButton: {
        borderRadius: 50, 
        backgroundColor: '#eee',
        padding: 10,
        position:'absolute',
        left: 20,
        top: 50
    },
    header: {
        alignItems: 'center'
    },
    headerText: {
        fontSize: 17,
        marginVertical: 20,
        fontWeight:'400'
    },
    sendButton: {
        borderRadius: 50, 
        backgroundColor: colors.baseColor, 
        paddingHorizontal:20, 
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems:'center',
        marginTop: 20,
        gap: 15
    },
    descriptionText: {
        textAlign: 'center',
        marginHorizontal: 50,
        fontWeight: '300',
        maxWidth: 300,
        fontSize: 12,
        marginBottom: 10
    },
    text: {
        marginHorizontal: 30,
        maxWidth: 300,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '900',
        marginBottom: 20
    },
    emailInput: {
        borderWidth: 0, 
        borderColor: '#aaa',
        backgroundColor: 'white',
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: widthScreen - 50,
    }
})

export default login