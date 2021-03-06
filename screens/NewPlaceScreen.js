import React, { useState, useCallback } from 'react';
import { 
    StyleSheet, 
    Text, 
    View , 
    ScrollView , 
    Button , 
    TextInput } from 'react-native';
import Colors from '../constants/Colors';
import * as placeActions from '../store/places-action';
import {useDispatch } from 'react-redux';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {

    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        // you could add validati
        setTitleValue(text);
    };

    const locationPickedHandler = useCallback(location => {
        console.log("Location Picked.",location);
        setSelectedLocation(location);
    }, []);

    const savePlaceHandler = () => {
        dispatch(placeActions.addPlace(titleValue,selectedImage,selectedLocation));
        props.navigation.goBack();
    };

    const imageTakenHandler = imagePath =>{
        setSelectedImage(imagePath);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.title}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                    />
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <LocationPicker 
                    navigation={props.navigation}
                    onLocationPicked={locationPickedHandler}/>
                <Button 
                    title='Save Place' 
                    color={Colors.primary} 
                    onPress={savePlaceHandler}
                    />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions =  { headerTitle: 'New Place'};

const styles = StyleSheet.create({
    form: {
        margin : 30
    },
    title : {
        fontSize : 18,
        marginBottom : 15
    },
    Input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;
