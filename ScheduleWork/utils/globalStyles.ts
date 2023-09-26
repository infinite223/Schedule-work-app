import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    center: {
        justifyContent:'center',
        alignItems: 'center'
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export const colors = {
    baseColor: '#12cf21',
    errorColor: '#fc2244',
    successColor: '#44aa44'
}