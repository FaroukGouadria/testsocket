import * as React from 'react';
import { View, Text } from 'react-native';

export default function Favoris({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Favoris')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Favoris Screen</Text>
        </View>
    );
}