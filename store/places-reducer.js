import { ADD_PLACE , SET_PLACE } from "./places-action";
import Place from "../models/place";

const initialState = {
    places : []
};

export default (state = initialState, action) => {

    switch(action.type){
        case SET_PLACE:
            return {
                places : action.places.map(
                    pl => new Place(pl.id,pl.title,pl.imageUri)
                )
            };
        case ADD_PLACE : 
            const newplace = new Place(action.placeData.id.toString(),action.placeData.title,action.placeData.imageUri);
            return {
                places : state.places.concat(newplace)
            };

        default :
            return state;
    };
};