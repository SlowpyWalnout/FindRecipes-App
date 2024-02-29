import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {


  useEffect(() => {
  
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

    fetchRecipeApp();

  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!recipeData) {
    return <Text>Searching</Text>;
  }

  return (
    <View>
      {recipeData.hits.map(hit =>{
        const {recipe} = hit;
        return (
          <View key={recipe.uri}>
            <Text style={styles.title}> Nombre de la receta: {recipe.label}</Text>
          
          </View>

        );

      })}

    </View>
  );

  
}

const styles = StyleSheet.create({
  title: {
    fontSize:20,
    fontVariant: 'bold',
    color:'black',
  },
});