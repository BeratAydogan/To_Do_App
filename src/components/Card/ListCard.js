import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const ListCard = ({ item, index, onRemove, onEdit, onToggle }) => {
  const [localValue, setLocalValue] = useState(item.text);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalValue(item.text);
  }, [item.text]);

  const handleSave = () => {
    onEdit(localValue);
    setIsEditing(false);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <CheckBox
        value={item.ischecked}
        onValueChange={onToggle}
      />

      {isEditing ? (
        <TextInput
          value={localValue}
          onChangeText={setLocalValue}
          onBlur={handleSave} 
          style={{ borderBottomWidth: 1, flex: 1 }}
          autoFocus
        />
      ) : (
        <Text style={{ flex: 1 }}>{item.text}</Text>
       
      )}

      <TouchableOpacity onPress={onRemove}>
        <Text style={{ color: 'red', fontSize: 30 }}>-</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (isEditing) {
            handleSave();
          } else {
            setIsEditing(true);
          }
        }}
      >
        <Text style={{ color: isEditing ? 'green' : 'blue', fontSize: 20 }}>
          {isEditing ? 'Kaydet' : 'Düzenle'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListCard;
