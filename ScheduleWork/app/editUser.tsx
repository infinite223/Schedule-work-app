import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { globalStyles } from '../utils/globalStyles'

const editUser = () => {
  return (
    <View>
        <TextInput
            placeholder='Imię'
            style={[styles.input, globalStyles.boxShadow]}
        />

        <TextInput
            placeholder='Nazwa użytkownika (nickname)'
            style={[styles.input, globalStyles.boxShadow]}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        
    }
})

export default editUser