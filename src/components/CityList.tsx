// src/components/CityList.tsx
import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface City {
    name: string;
    latitude: number;
    longitude: number;
}

interface CityListProps {
    cities: City[];
    onCitySelect: (city: City) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, onCitySelect }) => {
    return (
        <FlatList
            data={cities}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onCitySelect(item)}>
                    <Text style={styles.cityItem}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    cityItem: {
        padding: 10,
        fontSize: 18,
    },
});

export default CityList; 
