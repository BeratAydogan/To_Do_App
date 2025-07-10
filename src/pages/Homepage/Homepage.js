// src/pages/Homepage.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { storeData, getData } from '../../services/DB';
import ToDoCard from '../../components/ToDoCard/ToDoCard';

const Homepage = () => {
  const [todoList, setTodoList] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData();
    if (data) setTodoList(data);
  };

const addItem = (query) => {
  if (!query) return;
  const newItem = { id: Date.now(), text: query, ischecked: false };
  const updatedList = [...todoList, newItem];
  setTodoList(updatedList);
  storeData(updatedList);
  setQuery('');
};

const removeData = (id) => {
  const newToDoList = todoList.filter(item => String(item.id) !== String(id)); // ID'ye göre filtrele
  setTodoList(newToDoList);
  storeData(newToDoList);
};

const editData = (id, newText) => {
  const array = [...todoList];
  const index = array.findIndex(item => String(item.id) === String(id));
  console.log("index" + id +"text"+ newText)
  if (index !== -1) {
    array[index].text = newText;
    setTodoList(array);
    storeData(array);
  } else {
  }
    console.log(Date.now())

};


 const toggleCheck = (id, value) => {
  const array = todoList.map(item => {
    if (item.id === id) return { ...item, ischecked: value };
    return item;
  });
  setTodoList(array);
  storeData(array);
};

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24 }}>HomePage</Text>
      <TextInput
        placeholder="Enter Todo"
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="+" onPress={() => addItem(query)} />
<FlatList
  data={todoList}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item, index }) => (
    <ToDoCard
      index={index}
      item={item}
      onRemove={() => removeData(item.id)}
      onEdit={(text) => editData(item.id, text)}
onToggle={(newValue) => toggleCheck(item.id, newValue)}
    />
  )}
/>

    
    </View>
  );
};

export default Homepage;
