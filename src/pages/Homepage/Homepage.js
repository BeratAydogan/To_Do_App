import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button,TextInput, FlatList, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default Homepage = () =>{

    const [todoList, setTodoList] = useState([])
    const [query, setQuery] = useState()

    useEffect(() => {
  
  fetchData();
}, []);

const fetchData = async () => {
    const data = await getData();
    if (data) setTodoList(data);
  };

    const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-key', jsonValue);
  } catch (e) {
    // saving error
  }
};

    const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

    const removeData = (index) =>{
        try {
            const array = todoList
            if(index!=-1){
                array.splice(index,1)
                setTodoList(array)
                storeData(array)
                fetchData()
            }
        } catch (error) {
            
        }
    }

    const submitText=()=>{
      setQuery("")
    }

    const ToDoCard = ({item, index}) => {
        return(
            <View style={{flexDirection:'row'}}>
                <Text>{item} - {index}</Text>
                <TouchableOpacity onPress={()=>removeData(index)}>
                <Text style={{color:'red', fontSize:30, alignContent:'center',}}>-</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <View>
            <Text>HomePage</Text>
            <TextInput placeholder="Enter Todo" value={query} onChangeText={(text) => {setQuery(text)}}/>
            <Button title="+" onPress={() => {
              if(query)
              setTodoList([...todoList, query])
              storeData(todoList)
              setQuery("")
            }}/>
            
            <FlatList
            data={todoList}
            renderItem={({item, index}) =><ToDoCard item={item} index={index}/>}
            keyExtractor={(item,index)=>index.toString()}
            />
        </View>
    )
}