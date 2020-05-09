export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE';
import * as FileSystem from 'expo-file-system';
import { insertPlace,fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const addPlace = (title,image,location) => {
    return async dispatch => {

        console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
        );
      
        if (!response.ok) {
            console.log('google API failed');
            throw new Error('Something went wrong!');
        }
      
        const resData = await response.json();
        console.log(resData);
        if (!resData.results) {
            console.log('Result not found');
            throw new Error('Something went wrong!');
        }

        const address = resData.results[0].formatted_address;

        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try{
            FileSystem.moveAsync({
                from : image,
                to : newPath
            });  
            
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                location.lat,
                location.lng);

            dispatch({ type : ADD_PLACE , placeData : { 
                id : dbResult.insertId, 
                title : title , 
                imageUri : newPath,
                address : address,
                coords : {
                    lat : location.lat,
                    lng : location.lng
                }  
            }});

        }catch(err){
            console.log(err);
            throw err;
        }
    };
};

export const loadPlaces = () => {
    return async dispatch => { 
        try{
            const dbResult = await fetchPlaces();
            console.log(dbResult);
            dispatch({type : SET_PLACE ,places: dbResult.rows._array });
        }catch(err){
            console.log(err);
            throw err;
        }
    };
};