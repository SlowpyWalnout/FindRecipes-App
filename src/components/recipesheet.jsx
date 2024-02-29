import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";

const RecipeSheet = (props) => {
    const { name, image, description, ingredients } = props;
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{name}</Text>
                    <Text style={styles.cardText}>{description}</Text>
                    <Text style={styles.cardText}>{ingredients}</Text>
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
    cardText: {
        fontSize: 16,
        marginVertical: 10,
    },

});
export default RecipeSheet;