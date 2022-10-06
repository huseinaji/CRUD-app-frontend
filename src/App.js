import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Edit from './components/Edit';
import Login from "./components/Login";
import Transaction from "./components/Transaction";
import TransactionGuest from './components/TransactionGuest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/transaction/admin' element={<Transaction/>}/>
        <Route path='/transaction/guest' element={<TransactionGuest/>}/>
        <Route path='/transaction/admin/edit/:id' element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
