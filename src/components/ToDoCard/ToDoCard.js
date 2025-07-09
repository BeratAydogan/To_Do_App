import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const ToDoCard = ({item, index, onRemove, onEdit, onToggle }) => {
  const [localValue, setLocalValue] = useState(item.text);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <CheckBox value={item.ischecked} onValueChange={onToggle} />
      <TextInput
        value={item.text}
        onChangeText={(text) => {
          setLocalValue(text);
          setIsEditing(true);
        }}
        style={{ borderBottomWidth: 1, flex: 1 }}
      />
      <TouchableOpacity onPress={onRemove}>
        <Text style={{ color: 'red', fontSize: 30 }}>-</Text>
      </TouchableOpacity>
      {isEditing && (
        <TouchableOpacity onPress={onEdit(index,localValue)}>
          <Text style={{ color: 'green', fontSize: 20 }}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default ToDoCard