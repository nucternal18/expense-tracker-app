// @ts-nocheck
import React, {useContext, useEffect} from 'react';
import { GlobalContext} from '../Context/GlobalState';
import Transaction from './Transaction';

const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map((transaction, id) => (
                    <Transaction key={id} transaction={transaction}/>
                ))}
            </ul>
        </>
    )
}

export default TransactionList
