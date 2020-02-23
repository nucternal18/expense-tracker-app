import React, { useContext} from 'react';
import { GlobalContext } from '../Context/GlobalState';


const Transaction = ({ transaction: { text, amount, id } }) => {
    const { deleteTransaction } = useContext(GlobalContext);
    const sign = amount < 0 ? '-' : '+';

    return (
        <div>
            <li className={amount < 0 ? "minus" : "plus"}>
                {text} <span>{sign}${Math.abs(amount)}</span>
                <button onClick={() => deleteTransaction(id) } className='delete-btn'>x</button>
            </li>
        </div>
    );
}

export default Transaction
