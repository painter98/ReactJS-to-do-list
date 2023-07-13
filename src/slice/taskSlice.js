import {createSlice} from '@reduxjs/toolkit';

const initialState = { //initial state of the task list
    task: JSON.parse(localStorage.getItem('tasks')) || []
}

export const taskSlice = createSlice({ //the reducer part of the redux --> taking the initial state and action needs to be updated 
    name:'task',
    initialState,
    reducers:{
        addTask:(state,action) => {
            state.task = [...state.task,(action.payload)];
        },
        deleteTask:(state,action) => {
            state.task = action.payload;
        },
        updateTask:(state,action) => {
            state.task = action.payload;
        }
    }
})

export const {addTask,deleteTask,updateTask} = taskSlice.actions;
export default taskSlice.reducer;

