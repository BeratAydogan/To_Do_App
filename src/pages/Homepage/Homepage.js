import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { add } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';


export default Homepage = () => {

  const [todoList, setTodoList] = useState([])
  const [query, setQuery] = useState()
  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData();
    if (data) setTodoList(data);
    console.log("aaaaaaaaaa")
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

  const removeData = (index) => {
    try {
      const array = todoList
      if (index != -1) {
        array.splice(index, 1)
        setTodoList(array)
        storeData(array)
        fetchData()
      }
    } catch (error) {

    }
  }
  const editData = (index, query) => {
    try {
      const array = todoList
      if (index != -1) {
        array[index].text = query
        setTodoList(array)
        storeData(array)
        fetchData()
      }
    } catch (error) {

    }
  }

  const toggleCheck = (index, value) => {
    try {
      const array = todoList
      if (index != -1) {
        array[index].ischecked = value
        setTodoList(array)
        storeData(array)
        fetchData()
      }
    } catch (error) {

    }
  }


  const addItem = (query) => {
    if (!query) return;
    const updatedList = [...todoList, { text: query, ischecked: false }]
    setTodoList(updatedList)
    storeData(updatedList)
    setQuery("")
  }
  const ToDoCard = ({ item, index }) => {
    const [localValue, setLocalValue] = useState(item.text);
    const [isEditing, setIsEditing] = useState(false)
    return (
      <View style={{ flexDirection: 'row' }}>
        <CheckBox value={item.ischecked} onValueChange={(newValue) => { toggleCheck(index, newValue); }} />
        <TextInput value={localValue} onChangeText={(item) => { setLocalValue(item); setIsEditing(true) }} />

        <TouchableOpacity onPress={() => removeData(index)}>
          <Text style={{ color: 'red', fontSize: 30, alignContent: 'center', }}>-</Text>
        </TouchableOpacity>

        {isEditing &&
          (
            <TouchableOpacity onPress={() => { editData(index, localValue); }}>
              <Text style={{ color: 'green', fontSize: 20, alignContent: 'center', }}>Edit</Text>
            </TouchableOpacity>
          )}

      </View>
    )
  }

  return (
    <View>
      <Text>HomePage</Text>
      <TextInput placeholder="Enter Todo" value={query} onChangeText={(text) => { setQuery(text) }} />
      <Button title="+" onPress={() => {
        addItem(query)
      }} />

      <FlatList
        data={todoList}
        renderItem={({ item, index }) => <ToDoCard item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}