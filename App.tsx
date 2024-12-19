// App.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import CityInput from './src/components/CityInput';
import CityList from './src/components/CityList';
import citiesData from './src/utils/cities.json'; // ruta

const App = () => {
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState(citiesData);

    const handleQueryChange = (text: string) => {
        setQuery(text);
        if (text) {
            const filtered = citiesData.filter(city => city.name.toLowerCase().includes(text.toLowerCase()));
            setFilteredCities(filtered);
        } else {
            setFilteredCities(citiesData);
        }
    };

    const handleCitySelect = (city: { name: string; latitude: number; longitude: number }) => {
        Alert.alert(`Seleccionaste: ${city.name}`);
        //  ciudades más cercanas
        findNearestCities(city);
    };

    const findNearestCities = (selectedCity: { latitude: number; longitude: number }) => {
        // ciudades cercanas
        const nearestCities = citiesData
            .filter(city => city.name !== selectedCity.name) // Excluir la ciudad seleccionada
            .sort((a, b) => {
                const distanceA = getDistance(selectedCity.latitude, selectedCity.longitude, a.latitude, a.longitude);
                const distanceB = getDistance(selectedCity.latitude, selectedCity.longitude, b.latitude, b.longitude);
                return distanceA - distanceB; // Ordenar por distancia
            })
            .slice(0, 3); // Obtener las 3 ciudades más cercanas

        // Mostrar las ciudades cercanas 
        Alert.alert('Ciudades cercanas', nearestCities.map(city => city.name).join(', '));
    };

    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distancia en km
    };

    return (
        <SafeAreaView style={styles.container}>
            <CityInput query={query} onQueryChange={handleQueryChange} />
            <CityList cities={filteredCities} onCitySelect={handleCitySelect} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default App;
