import React, {createContext, useReducer} from "react";
import AppReducer from './AppReducer';
import axios from 'axios';


// initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

//Create Context
export const GlobalContext = createContext(initialState);

// In order to access this state(initailState) from other components
// we, need to use provider

// Provider Component
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    
    // Actions
    async function getTransactions() {
        try {
            //res will contain the response from the api
            const res = await axios.get('/api/v1/transactions');
            
            dispatch ({
                type: "GET_TRANSACTIONS",
                payload: res.data.data
            });
        } 
        catch (err) {
            dispatch ({
                type: "TRANSACTIONS_ERROR",
                payload: err.response.data.error
            });
        }
    }

    async function addTransaction(transaction){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config); 
            
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        }
        catch (err) {
            dispatch ({
                type: "TRANSACTIONS_ERROR",
                payload: err.response.data.error
            });
        }
    }

    async function deleteTransaction(id){

        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });   
        } 
        catch (err) {
            dispatch ({
                type: "TRANSACTIONS_ERROR",
                payload: err.response.data.error
            });
        }
    }

    // children are basically components in our app.js file
    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        getTransactions,
        addTransaction,
        deleteTransaction,
        error:state.error,
        loading:state.loading
    }}>
        {children}                    
    </GlobalContext.Provider>);
}