import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todoSlice'

const Add = () => {

    const [input, setInput] = useState('');

    // how to initiate useDispatch - since we are giving something to the state
    const dispatch = useDispatch();

    const addTodoHandler = (e) => {
        e.preventDefault();

        // dispatch ko call karo
        dispatch(addTodo(input));
        
        // a better practice to clean the input field
        setInput('');
    }

    return (
        <form onSubmit={addTodoHandler} className="space-x-3 mt-12 mb-12 w-[100%] flex justify-center">
            <input
                type="text"
                className="bg-gray-800 rounded border w-[50%] border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter a Todo..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                Add Todo
            </button>
        </form>
    )
}

export default Add