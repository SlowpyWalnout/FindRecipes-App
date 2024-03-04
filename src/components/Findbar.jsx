import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Findbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query); // Envia la consulta de búsqueda al componente padre cuando se activa la búsqueda
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search your favorite recipe..."
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9254e',
    padding: 15,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    height: 50,
    width: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    borderRadius: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginBottom: 0,
    width: 300,
  },
  input: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    fontSize: 20,
  },
});

export default Findbar;
