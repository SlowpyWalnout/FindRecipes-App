import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import RecipeSheet from './src/components/recipesheet';
import CheckboxComponent from './src/components/checkbox';
import Findbar from './src/components/Findbar';

export default function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [] = useState('');
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const categoryQueryParam = categories.length > 0 ? `&cuisineType=${categories.join(',')}` : '';
      // Esta constante funciona para las categorías, en este caso es para los países que se seleccionen en el checkbox
      // categories.length > 0 funcionará para las categorías seleccionadas, en caso de que alguna categoría este seleccionada esta se mostrará en el cuisineType que es el formato de la documentación de la API para llamar
      // Si no hay categorías seleccionas entonces será vacío
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}${categoryQueryParam}&app_id=38f71c94&app_key=0f8e5f1d4850a323555c2dc751ea1459`);
      // Llamada de la API
      const data = await response.json();
      setRecipeData(data);
      setError(null);
    } catch (error) {
      // En caso de error mostrar el error
      console.error(error);
      setError('Error fetching Recipe data');
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') { // Se llama a la función fetchRecipes cuando hay cambios
      fetchRecipes();
    }
  }, [searchQuery, categories]); // Los cambios que se llaman de la función buscar y categorías

  const handleCheckboxChange = (selectedCategories) => { // Llamando a la función del checkbox cuando se selecciona una categoría, manejando sus cambios mediante el handleCheckboxChange
    setCategories(selectedCategories);
  };

  // Renderizado de la app
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <Findbar onSearch={setSearchQuery} />
      <Text style={styles.instructionsText}>Select the food type that your prefer.</Text>
        {error && <Text>{error}</Text>}
        <CheckboxComponent onChange={handleCheckboxChange} />
        <ScrollView style={styles.recipeContainer}>
          {recipeData && recipeData.hits && recipeData.hits.map(hit => {
            const { recipe } = hit;
            return (
              <RecipeSheet
                key={recipe.uri}
                dietlabels={recipe.dietLabels}
                foodcategory={recipe.cuisineType}
                RecipeTitle={recipe.label}
                ingredients={recipe.ingredientLines} image={recipe.image}
                weight={recipe.totalWeight}
                procedure={recipe.url}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    paddingTop: 20,
  },
  recipeContainer: {
    marginTop: 10,
    width: '100%',
  },
  instructionsText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'regular',
    textAlign: 'center',
  },
});
