import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import RecipeSheet from './src/components/recipesheet';

export default function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=38f71c94&app_key=0f8e5f1d4850a323555c2dc751ea1459`);
      const data = await response.json();
      setRecipeData(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error fetching Recipe data');
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchRecipes();
    }
  }, [searchQuery]);

  const handleSearch = () => {
    fetchRecipes();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Recipe Search Engine</Text>
      <TextInput
        style={styles.input}
        placeholder="Search recipes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button
        title="Search"
        onPress={handleSearch}
      />

      {error && <Text>{error}</Text>}

      <ScrollView style={styles.recipeContainer}>
        {recipeData && recipeData.hits && recipeData.hits.map(hit => {
          const { recipe } = hit;
          return (
            
            <RecipeSheet
              key={recipe.uri}
              dietlabels={recipe.dietLabels}
              foodcategory={recipe.cuisineType}
              RecipeTitle={recipe.label}
              ingredients={recipe.ingredientLines}              image={recipe.image}
              weight={recipe.totalWeight}
              procedure={recipe.url}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 30,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  recipeContainer: {
    marginTop: 10,
    width: '100%',
  },
  recipe: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ingredients: {
    fontSize: 16,
  },
  appTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#9ec6b8',
    width: 280,
    height: 35,
    color: 'white',
    borderRadius:6,
  },
});
