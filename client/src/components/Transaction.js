import React, { useContext} from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { numberWithCommas } from '../utils/format';


const Transaction = ({ transaction }) => {
    console.log(transaction)
    const { id, data: { amount, text } } = transaction;

    const { deleteTransaction } = useContext(GlobalContext);
    const sign = amount < 0 ? '-' : '+';

    return (
      <div>
        <li className={amount < 0 ? 'minus' : 'plus'}>
          {text}{' '}
          <span>
            {sign}${Math.abs(numberWithCommas(amount))}
          </span>
          <button onClick={() => deleteTransaction(id)} className='delete-btn'>
            x
          </button>
        </li>
      </div>
    );
}

export default Transaction
