import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlaceDetailScreen = props => {
    return (
        <View styles={styles.container}>
            <Text>PlaceDetailScreen</Text>
        </View>
    );
};

PlaceDetailScreen.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('placeTitle')
    };
  };

const styles = StyleSheet.create({
    container: {

    },
});

export default PlaceDetailScreen;
