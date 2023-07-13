//global store management 

import taskReducer from './slice/taskSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer:{
        task:taskReducer
    }
})

export default store;