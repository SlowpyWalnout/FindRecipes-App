import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Findbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query); // Envia la consulta de búsqueda al componente padre cuando se activa la búsqueda
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search recipes"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default Findbar;
