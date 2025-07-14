import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'

const window = Dimensions.get('window');

export const ButtonPlus = ({ text, func }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={func}>
            <Text style={styles.txtBtn}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        bottom: -100,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: 'red',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    txtBtn: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    }
});
