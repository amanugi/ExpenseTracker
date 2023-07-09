import './App.css';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';


import { GlobalProvider } from './Context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <h1>Expense Tracker</h1>
      <div className="container">
        <Balance />
      </div>
      <IncomeExpense />
      <TransactionList />
      <AddTransaction /> 
    </GlobalProvider>
  );
}

export default App;
