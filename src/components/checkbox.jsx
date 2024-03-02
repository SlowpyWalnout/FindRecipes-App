import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function CheckboxComponent() {
  const data = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese',
      'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 'Mediterranean',
      'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian'];

  const [checkedItems, setCheckedItems] = useState(data.reduce((prev, curr) => ({ ...prev, [curr]: false }), {}));

  const handleCheckboxChange = (item) => {
    setCheckedItems(prevState => ({ ...prevState, [item]: !prevState[item] }));
  };

  return (
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <Checkbox
            value={checkedItems[item]}
            onValueChange={() => handleCheckboxChange(item)}
            color={checkedItems[item] ? '#4630EB' : undefined}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});