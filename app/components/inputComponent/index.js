import React from 'react';
import { TextInput, View, Text } from 'react-native';
import {StyleSheet} from 'react-native';

function InputComponent() {
    return (
        <View style={styles.container}>
            <Text>TITLE</Text>
            <TextInput style={styles.textInput} editable={false} placeholder='PLACEHOLDER'/>            
        </View>
    )
}

export default InputComponent;

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    textInput:{
        minHeight: 50
    }
});
