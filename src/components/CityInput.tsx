// src/components/CityInput.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface CityInputProps {
    query: string;
    onQueryChange: (text: string) => void;
}

const CityInput: React.FC<CityInputProps> = ({ query, onQueryChange }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder="Buscar ciudad..."
            value={query}
            onChangeText={onQueryChange}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default CityInput;