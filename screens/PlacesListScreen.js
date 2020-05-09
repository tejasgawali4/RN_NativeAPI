import React,{useEffect} from 'react';
import { StyleSheet, Text, View , FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector , useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from  '../store/places-action';

const PlacesListScreen = props => {

    const places = useSelector(state => state.places.places);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);
    

    if(places.length === 0){
        return (
            <View style={styles.container}>
                <Text>No Places Found</Text>
            </View>
        );
    };

    return (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id.toString()}
          renderItem={itemData => (
            <PlaceItem
              image={itemData.item.imageUri}
              title={itemData.item.title}
              address={itemData.item.address}
              onSelect={() => {
                props.navigation.navigate('PlaceDetail', {
                    placeTitle: itemData.item.title,
                    placeId: itemData.item.id
                });
              }}
            />
          )}
        />
      );
};

PlacesListScreen.navigationOptions = navData => {
    return {
      headerTitle: 'All Places',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              navData.navigation.navigate('NewPlace');
            }}
          />
        </HeaderButtons>
      )
    };
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
});

export default PlacesListScreen;
