import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//local imports
import { Dishes } from './reducers/dishesReducer';
import { Comments } from './reducers/commentsReducer';
import { Leaders } from './reducers/leadersReducer';
import { Promotions } from './reducers/promoReducer';

export const ConfigureStore = ()=>{
    const store = createStore(combineReducers({
        dishes: Dishes,
        comments: Comments,
        leaders: Leaders,
        promotions: Promotions
    }),
    applyMiddleware(thunk)
    );
    
    return store;
};


