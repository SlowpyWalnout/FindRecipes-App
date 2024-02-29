import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import RecipeSheet from './src/components/recipesheet';

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
    <View style = {styles.container}>
      <ScrollView>
        <RecipeSheet
          name="Pizza"
          image="https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg"
          description="This is a pizza"
          ingredients="Flour, Cheese, Tomato, Olive, Mushroom"
        />
        <RecipeSheet
          name="Burger"
          image={"https://sevilla.abc.es/contenidopromocionado/wp-content/uploads/sites/2/2019/09/portada-wp-burguer.jpeg"}
          description="This is a burger"
          ingredients="Bread, Cheese, Tomato, Onion, Meat"
        />
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
    marginTop: 20,
    height: "100%",
  },
});