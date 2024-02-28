import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function App() {

  
  const [recipe, setRecipe] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);

  const fetchRecipeApp = async () => {
    try {
      const res = await fetch('https://api.edamam.com/doc/open-api/recipe-search-v2.json');
      const data = await res.json();
      setRecipeData(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error fetching Recipe data');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});