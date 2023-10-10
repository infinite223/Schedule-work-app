import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { colors, globalStyles } from '../../utils/globalStyles'

interface DayProps {
    id: number,
    isSelected: boolean
}

const Day:FC<DayProps> = ({ id, isSelected }) => {
  return (
    <View
        style={[styles.container, {backgroundColor: isSelected?colors.baseColor:'white'}]}
    >
      <Text style={styles.textDay}>
        {id}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        width: 40, height: 40
    },
    textDay: {
        fontSize: 14
    }
})

export default Day