import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity } from 'react-native';
import { storeData, getData } from '../../services/Db';
import ToDoCard from '../../components/Card/ToDoCard';
import { AddModal } from '../../components/Modal/addModal';
import { ButtonPlus } from '../../components/Button/ButtonPlus';
const ListPage =({navigation})=>{
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData('lists');
    if (data) setList(data);
  };

  const toggleModalVisible=()=>{
    setVisible(!visible)
  }

  const removeData = (id) => {
    const newList = list.filter(item => String(item.id) !== String(id)); // ID'ye göre filtrele
    setList(newList);
    storeData('lists' ,newList);
  };

  const editName = (id, newText) => {
    const array = [...list];
    const index = array.findIndex(item => String(item.id) === String(id));
    console.log("index" + id + "text" + newText)
    if (index !== -1) {
      array[index].text = newText;
      setList(array);
      storeData('lists', array);
    } else {
    }
    console.log(Date.now())

  };


  const toggleCheck = (id, value) => {
    const array = list.map(item => {
      if (item.id === id) return { ...item, ischecked: value };
      return item;
    });
    setList(array);
    storeData('lists', array);
  };

  return (
    <View style={{ padding: 16 }}>
<Text>LİSTE SAYFASI</Text>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
<TouchableOpacity onPress={() => navigation.navigate("ToDoPage", { anahtar: item.text })}>
                  <ToDoCard
            index={index}
            item={item}
            onRemove={() => removeData(item.id)}
            onEdit={(text) => editName(item.id, text)}
            onToggle={(newValue) => toggleCheck(item.id, newValue)}
          />
            </TouchableOpacity>
        
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
    todoList={list}
    setTodoList={setList}
    setVisible={ toggleModalVisible} 
    anahtar={'lists'}
  />
</Modal>
    <ButtonPlus text={'+'} func={toggleModalVisible}/>

    </View>
   
  );
};
export default ListPage;