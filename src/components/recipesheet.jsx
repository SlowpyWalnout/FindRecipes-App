import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Linking } from "react-native";

const RecipeSheet = (props) => {
    const { RecipeTitle, ingredients, procedure, image, weight, foodcategory, dietlabels } = props;
    let ingredientsArray;
    if (Array.isArray(ingredients)) {
        ingredientsArray = ingredients;
    } else if (typeof ingredients === 'string') {
        ingredientsArray = ingredients.split(', ');
    } else {
        ingredientsArray = [];
    }
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.cardBody}>

                    <Text style={styles.foodcategory}>{foodcategory}</Text>
                    {/* <Text style={styles.foodcategory}>{dietlabels}</Text> */}
                    <Text style={styles.cardTitle}>{RecipeTitle}</Text>
                    <Text style={styles.ingredientsText}>Ingredients</Text>
                    <FlatList
                        data={ingredientsArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.ingredient}>• {item}</Text>
                        )}
                        scrollEnabled={false}
                    />
                    <Text style={styles.weightText}>{parseFloat(weight).toFixed(2)} g</Text>
                    <TouchableOpacity style={styles.viewRecipeButton} onPress={() => Linking.openURL(procedure)}>
                        <Text style={styles.viewRecipeButtonText}>View Recipe</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    card: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardBody: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    cardIngredients: {
        fontSize: 18,
    },
    ingredientsText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 8,
        borderRadius: 5,
    },
    weightText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 8,
        padding: 5,        
        backgroundColor: '#fccfd5',
        borderRadius: 5,
        width: "40%",
    },

    foodcategory: {
        borderColor: "#eb3b5a",
        color: "#eb3b5a",
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'flex-start',
        padding: 5,
        textAlign: "center",
        fontSize: 18,
    },
    viewRecipeButton: {
        backgroundColor: "#d9254e",
        width: "100%",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    viewRecipeButtonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
});
export default RecipeSheet;