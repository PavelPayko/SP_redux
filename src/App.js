import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, ADD_MANY_CUSTOMERS, asyncManyCustomersAction, removeCustomerAction } from './store/customerReducer';
import { addCashAction, asyncAddCashAction, asyncGetCashAction, getCashAction } from './store/cashReducer';
import { fetchCustomers } from './thunkAsyncActions/customers';

function App() {

  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)

  const getCash = (amount) => {
    dispatch(getCashAction(amount))
  }

  const addCash = (amount) => {
    dispatch(addCashAction(amount))
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (id) => {
    dispatch(removeCustomerAction(id))
  }

  return (
    <div className="App">
      <div>{cash}</div>
      <div>
        <button onClick={() => addCash(Number(prompt()))}>Add cash</button>
        <button onClick={() => getCash(Number(prompt()))}>Get cash</button>
      </div>
      <div>
        <button onClick={() => dispatch(asyncAddCashAction())}>Async add cash saga</button>
        <button onClick={() => dispatch(asyncGetCashAction())}>Async get cash saga</button>
      </div>
      <div>
        <button onClick={() => addCustomer(prompt())}>Add customer</button>
        <button onClick={() => dispatch(fetchCustomers())}>Add customers async</button>
        <button onClick={() => dispatch(asyncManyCustomersAction())}>Add customers async saga</button>
      </div>
      <div>
        {customers.length > 0
          ? customers.map(customer => (
            <div>
              {customer.name}
              <button onClick={() => removeCustomer(customer.id)}>Remove customer</button>
            </div>
          ))
          : 'Клиентов нет'
        }
      </div>
    </div>
  );
}

export default App;
