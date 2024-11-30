import { createSlice, nanoid } from "@reduxjs/toolkit";

// const initialState = {
//     todos: [{
//         id: '1',
//         task: 'Do not add this',
//         completed: false,
//         editing: false
//     }],
// }

const loadTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [{
        id: '1',
        task: 'Do not add this',
        completed: false,
        editing: false}];
};

const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: loadTodosFromLocalStorage(),
    },
    reducers: {
        // we will always have access to state and action in reducers
        // state helps us to get the current state and update it
        // action helps us to get the payload like id to remove a todo
        // in reducers we don't just have to declare the methods like in contextAPI but we have to define them as well
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                task: action.payload,
                completed: false,
                editing: false
            }
            // ab yaha pe hum state ko update bhi to krenge using state
            // we have defined its name to be todos above in the initialState
            state.todos.push(newTodo)
            saveTodosToLocalStorage(state.todos);
        },
        removeTodo: (state, action) => {
            const id = action.payload
            state.todos = state.todos.filter(todo => todo.id !== id)
            saveTodosToLocalStorage(state.todos);
        },
        toggleEdit: (state, action) => {
            const id = action.payload
            state.todos = state.todos.map(todo => todo.id === id ? { ...todo, editing: !todo.editing } : todo)
            saveTodosToLocalStorage(state.todos);
        },
        updateTodo: (state, action) => {
            const { id, task } = action.payload
            state.todos = state.todos.map(todo => todo.id === id ? { ...todo, task } : todo)
            saveTodosToLocalStorage(state.todos);
        },

    }
})


// ab individual reducers ko export krna h
export const { addTodo, removeTodo, updateTodo, toggleEdit } = todoSlice.actions

// store ke liye we have to export reducer
export default todoSlice.reducer
