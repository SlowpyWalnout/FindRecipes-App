import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

// Se define el componente para representar y mostrar las categorías
export default function CheckboxComponent({ onChange }) {
    // Array que contiene las categorías del checkbox 
    const data = ['american', 'asian', 'british', 'caribbean', 'central europe', 'chinese',
        'eastern europe', 'french', 'indian', 'italian', 'japanese', 'kosher', 'mediterranean',
        'mexican', 'middle eastern', 'nordic', 'south american', 'south east asian'];

    // Constante para guardar el estado del checkbox    
    const [categories, setCategories] = useState(data.reduce((prev, curr) => ({ ...prev, [curr]: false }), {}));

    // Constante para los cambios y actualizaciones de los estados del checkbox
    const handleCheckboxChange = (item) => {
        setCategories(prevState => {
            // Llama a la función para el cambio con las categorías seleccionadas mediante el onChange
            const updatedCategories = { ...prevState, [item]: !prevState[item] };
            onChange(Object.keys(updatedCategories).filter(category => updatedCategories[category]));
            // Se actualiza el estado del checkbox
            return updatedCategories;
        });
    };

    // Render del checkbox
    return (
        <ScrollView style={styles.container}>
            {data.map((item, index) => (
                <View key={index} style={styles.checkboxContainer}>
                    <Checkbox
                        value={categories[item]}
                        onValueChange={() => handleCheckboxChange(item)}
                        color={categories[item] ? '#eb3043' : undefined}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>{item}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

// Estilos
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