// @ts-nocheck
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'
import axios from 'axios';

//Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
}


// Create createContext
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getTransactions() {
        try {
            const res = await axios.get('/transactions');
            const { data } = res.data;
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response,
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id,
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response,
            });
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/transactions', transaction)
            console.log(res.data.data)
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response,
            });
        }
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        getTransactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
    }}>
        {children}
    </GlobalContext.Provider>);
}