import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
import RecipeSheet from './src/components/recipesheet';
import CheckboxComponent from './src/components/checkbox';

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

  const handleSearch = () => { // Busqueda de las recetas llamando a la función cuando se activa la busqueda
    fetchRecipes();
  };

  const handleCheckboxChange = (selectedCategories) => { // Llamando a la función del checkbox cuando se selecciona una categoría, manejando sus cambios mediante el handleCheckboxChange
    setCategories(selectedCategories);
  };

  // Renderizado de la app
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    borderRadius: 6,
  },
});
