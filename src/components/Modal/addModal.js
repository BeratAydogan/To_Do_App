import React from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { storeData } from '../../services/Db';

export const AddModal = ({ query, setQuery, todoList, setTodoList, setVisible,anahtar }) => {

  const addItem = () => {
    if (!query) return;
    const newItem = { id: Date.now(), text: query, ischecked: false };
    const updatedList = [...todoList, newItem];
    setTodoList(updatedList);
    storeData(anahtar, updatedList);
    setQuery('');
    setVisible(); // ekledikten sonra modal kapatılsın
  };

  return (
    <SafeAreaView style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>To-Do giriniz</Text>
        <TextInput
          placeholder="Enter Todo"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <View style={styles.buttonGroup}>
          <Button title="Ekle" onPress={addItem} />
          <Button title="Kapat" onPress={setVisible} color="red" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // yarı saydam arkaplan
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
