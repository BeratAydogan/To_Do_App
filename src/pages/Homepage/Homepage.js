import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, AsyncStorage, Button,TextInput, FlatList } from 'react-native'



export default Homepage = () =>{

    const [todoList, setTodoList] = useState([])
    const [query, setQuery] = useState()

    const ToDoCard = ({item, index}) => {
        return(
            <View>
                <Text>{item} - {index}</Text>
            </View>
        )
    }

    return(
        <View>
            <Text>HomePage</Text>
            <TextInput placeholder="Enter Todo" onChangeText={(text) => {setQuery(text)}}/>
            <Button title="+" onPress={() => {setTodoList([...todoList, query])}}/>
            
            <FlatList
            data={todoList}
            renderItem={({item, index}) =><ToDoCard item={item} index={index}/>}
            keyExtractor={(item,index)=>index.toString()}
            />
        </View>
    )
}