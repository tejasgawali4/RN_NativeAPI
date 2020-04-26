import { ADD_PLACE , LOAD_PLACES } from "./places-action";
import Place from "../models/place";

const initialState = {
    places : []
};

export default (state = initialState, action) => {

    switch(action.type){
        case LOAD_PLACES:
            return {
                places : state.places
            };
        case ADD_PLACE : 

            const newplace = new Place(new Date(),action.placeData.title);

            return {
                places : state.places.concat(newplace)
            };

        default :
            return state;
    };
};