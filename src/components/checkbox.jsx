import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

// Se define el componente para representar y mostrar las categorías
export default function CheckboxComponent({ onChange }) {
    // Función para poner en mayúsculas la primera letra
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // Array que contiene las categorías del checkbox 
    const data = ['american', 'asian', 'british', 'caribbean', 'central europe', 'chinese',
        'eastern europe', 'french', 'indian', 'italian', 'japanese', 'kosher', 'mediterranean',
        'mexican', 'middle eastern', 'nordic', 'south american', 'south east asian'];

    // Constante para guardar el estado del checkbox    
    const [categories, setCategories] = useState(data.reduce((prev, curr) => ({ ...prev, [curr]: false }), {}));

    // Constante para los cambios y actualizaciones de los estados del checkbox
    const handleCheckboxChange = (item) => {
        setCategories(prevState => {
            // Establecer todas las casillas de verificación en false
            const updatedCategories = Object.keys(prevState).reduce((result, key) => {
                result[key] = false;
                return result;
            }, {});
    
            // Establecer solo la casilla de verificación seleccionada en true
            updatedCategories[item] = true;
    
            // Llama a la función para el cambio con las categorías seleccionadas mediante el onChange
            onChange(Object.keys(updatedCategories).filter(category => updatedCategories[category]));
    
            // Se actualiza el estado del checkbox
            return updatedCategories;
        });
    };

    // Render del checkbox
    return (
        <ScrollView style={styles.container} horizontal={true}>
            {data.map((item, index) => (
                <View key={index} style={styles.checkboxContainer}>
                    <Checkbox
                        value={categories[item]}
                        onValueChange={() => handleCheckboxChange(item)}
                        color={categories[item] ? '#eb3043' : undefined}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>{capitalizeFirstLetter(item)}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        paddingTop: 0, 
        backgroundColor: '#fff',
        width: '100%',
        height: 100,    
    },
    checkboxContainer: {
        width: 'auto',
        height: 50,
        flexDirection: 'row',
        marginBottom: 5,
        borderColor: '#eb3b5a',
        borderWidth: 1,
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 50,

    },
    checkbox: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 28,
        height: 28,
        paddingStart: 0,
        borderColor: '#eb3043',
    },
    label: {
        marginStart: 10,
        alignSelf: 'center',
        fontSize: 15,
        color: 'black',
        fontWeight: 'semibold',
    },
    instructionsText: {
        paddingLeft: 10,
        fontSize: 18,
        color: 'black',
        fontSize: 20,
        marginVertical: 8,
        borderRadius: 5,
    },
});