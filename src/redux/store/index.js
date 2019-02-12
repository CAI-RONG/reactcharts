import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from '../reducers';


const persistConfig={
    key:'root',
    storage:storage,
    whitelist:['authReducer']
}

const pReducer=persistReducer(persistConfig, reducer);

export const store=createStore(pReducer);
export const persistor=persistStore(store);