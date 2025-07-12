// src/pages/Homepage.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal } from 'react-native';
import { storeData, getData } from '../../services/Db';
import ToDoCard from '../../components/Card/ToDoCard';
import { AddModal } from '../../components/Modal/addModal';

const ToDoListPage = ({route}) => {
const anahtar = route.params?.anahtar ?? 'defaultDeğer'; 

  const [todoList, setTodoList] = useState([]);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData(anahtar);
    if (data) setTodoList(data);
  };

  const toggleModalVisible=()=>{
    setVisible(!visible)
  }

  const removeData = (id) => {
    const newToDoList = todoList.filter(item => String(item.id) !== String(id)); // ID'ye göre filtrele
    setTodoList(newToDoList);
    storeData(anahtar ,newToDoList);
  };

  const editData = (id, newText) => {
    const array = [...todoList];
    const index = array.findIndex(item => String(item.id) === String(id));
    console.log("index" + id + "text" + newText)
    if (index !== -1) {
      array[index].text = newText;
      setTodoList(array);
      storeData(anahtar, array);
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
    storeData(anahtar, array);
  };

  return (
    <View style={{ padding: 16 }}>
<Text>ToDo Sayfası</Text>
      <Button title="+" onPress={() => setVisible(true)} />
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

<Modal
  visible={visible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setVisible(false)}
>
  <AddModal
    query={query}
    setQuery={setQuery}
    todoList={todoList}
    setTodoList={setTodoList}
    setVisible={ toggleModalVisible}
    anahtar={anahtar}
  />
</Modal>
    </View>
   
  );
};

export default ToDoListPage;
