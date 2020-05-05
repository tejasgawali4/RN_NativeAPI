export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE';
import * as FileSystem from 'expo-file-system';
import { insertPlace,fetchPlaces } from '../helpers/db';

export const addPlace = (title,image) => {
    return async dispatch => {
        
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
                'Test Address',
                15.6,
                12.3);

            console.log(dbResult);

        }catch(err){
            console.log(err);
            throw err;
        }

        dispatch({ type : ADD_PLACE , placeData : { 
            id : dbResult.insertId, 
            title : title , 
            imageUri : newPath }});
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