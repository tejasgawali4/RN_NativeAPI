import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet,TouchableOpacity,Text, Dimensions } from 'react-native';

const MapScreen = props => {

    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
      
    return (<MapView 
                style={styles.mapStyle}       
                region={mapRegion}
            />);
};

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    const readonly = navData.navigation.getParam('readonly');
    if (readonly) {
      return {};
    }
    return {
      headerRight: (
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      )
    };
};

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default MapScreen;
