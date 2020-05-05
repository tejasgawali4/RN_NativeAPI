import React, { useState, useEffect, useCallback } from 'react';
import MapView, { Marker }  from 'react-native-maps';
import { StyleSheet,TouchableOpacity,Text, Dimensions  } from 'react-native';

const MapScreen = props => {

   const [selectedLocation, setSelectedLocation] = useState();

    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event => {
      console.log(event.nativeEvent.coordinate);
        setSelectedLocation({
          lat : event.nativeEvent.coordinate.latitude,
          lng: event.nativeEvent.coordinate.longitude
        })
    };

    const savePickedLocationHandler = useCallback(()=>{
          if(!selectedLocation){
            return;
          }
          props.navigation.navigate('NewPlace',{pickedLocation : selectedLocation});
    },[]);

    useEffect(() => {0
        props.navigation.setParams({saveLocation : savePickedLocationHandler})
    },[selectLocationHandler]);

    let markerCoordinates;

    if (selectedLocation) {
      markerCoordinates = {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng
      };
    }
      
    return (<MapView 
                style={styles.mapStyle}       
                region={mapRegion}
                onPress={selectLocationHandler}>
                {markerCoordinates && (
                        <Marker title="Picked Location" coordinate={markerCoordinates} />
                )}            
            </MapView> );
    };

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    // const readonly = navData.navigation.getParam('readonly');
    // if (readonly) {
    //   return {};
    // }
    return {
      headerRight: (
        <TouchableOpacity style={styles.headerButton} onPress={()=>{saveFn}}>
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
