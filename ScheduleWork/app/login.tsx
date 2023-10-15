import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, FlatList, FlatListProps } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import { colors, globalStyles } from '../utils/globalStyles'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { authenticateEmail, sendEmail } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from './../assets/images/logo.png'

const widthScreen = Dimensions.get('screen').width
const widthFlatList = Platform.OS ==='web'?450:widthScreen
const isWeb = Platform.OS === 'web'

const stagesLogin = [
    {
        header: 'Podaj swój email by dołączyć',
        input: 'Email',
        type: 'Email',
        buttonText: 'Zweryfikuj'
    },
    {
        header: 'Wpisz kod otrzymany na maila',
        input: 'Kod ',
        type: 'Code',
        buttonText: 'Zaluguj się'
    }
]

const Page = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const [emailSended, setEmailSended] = useState('')

  const flatListRef = useRef<FlatList>(null)
  const [index, setIndex] = useState(0)

  const hendleClickButton = async () => {   
    if(inputValue.length>4){
        if(index){
            const res = await authenticateEmail(emailSended, inputValue)
            console.log(res)

            if(res.ok){
                const userData = await res.json()
                await AsyncStorage.setItem('my-key',  JSON.stringify(userData));

                 router.push('/(Drawer)/schedule')

                 router.push('/messageModal')
                 router.setParams({ message: `Udało się zalogować`, type: 'SUCCESS' })                
            }
            else {
                router.push('/messageModal')
                router.setParams({ message: "Nie prawidłowy kod", type: 'ERROR' })
            }    
        }
        else {
            const res = await sendEmail(inputValue)

            if(res === 'SUCCESS'){
                setEmailSended(inputValue)

                router.push('/messageModal')
                router.setParams({ message: `Kod został wysłany na: ${inputValue}`, type: 'SUCCESS' })
                
                goToNextStep()
            }
            else {
                router.push('/messageModal')
                router.setParams({ message: `Coś poszło nie tak`, type: 'ERROR' })
            }              
        }
       
        setInputValue('')
    }
    else {
        const errorType = index?"Kod":"Email"

        router.push('/messageModal')
        router.setParams({ message: `${errorType} musi być dłuższy`, type: 'ERROR' })
    }
  }

    const goToNextStep = () => {
        setIndex(index + 1)
        flatListRef?.current?.scrollToOffset({
            offset: (index+1) * widthScreen,
            animated: true
        })
    }

    const goBack = () => {
        if(!index){
            router.back()
        }
        else {
            setIndex(index - 1)
            flatListRef?.current?.scrollToIndex({index: 0, animated: true})
        }
    }
 
  return (
    <View style={styles.container}>
        <TouchableOpacity 
            onPress={goBack}
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
                    color="#2b3" 
                />
                <Text style={styles.headerText}>Tworzenie konta</Text>
            </View>
            <Image style={{width: 255, height: 70}} source={logo}/>

            <View style={{height: 200}}>
                <FlatList
                    scrollEnabled={false}
                    ref={flatListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={stagesLogin}
                    style={{maxWidth: widthFlatList}}
                    renderItem={({ item }) =>
                        <View style={{alignItems:'center', gap: 10, width: widthFlatList}}>
                            <Text style={styles.text}>
                                {item.header}
                            </Text>
            
                            <TextInput
                                placeholder={item.input}
                                style={[styles.emailInput, globalStyles.boxShadow]}
                                value={inputValue}
                                onChangeText={setInputValue}
                                textContentType={index?'oneTimeCode':'emailAddress'}
                                keyboardType={index?'numeric':'default'}
                                placeholderTextColor={'rgba(23, 23, 23, .4)'}
                            />
            
                            <TouchableOpacity 
                                onPress={hendleClickButton}
                                style={[styles.sendButton, globalStyles.boxShadow]}
                            >
                                <Text style={{color: 'white', fontWeight: '700'}}>
                                    {item.buttonText}
                                </Text>
                                <Ionicons name="arrow-forward-outline" size={20} color="white" />
            
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
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
        backgroundColor: '#fff',
        padding: 10,
        position:'absolute',
        left: 20,
        top: isWeb?20:50
    },
    header: {
        alignItems: 'center'
    },
    headerText: {
        fontSize: 14,
        marginVertical: 10,
        fontWeight:'300'
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
        marginBottom: 20
    },
    text: {
        marginHorizontal: 30,
        maxWidth: 300,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '700',
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
        maxWidth: 400
    }
})

export default Page