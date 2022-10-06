import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Transaction = () => {
  const [transaction, setTrans] = useState([]);
  const [queryDate, setQueryDate] = useState('');
  const [queryName, setQueryName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const editTransaction = async () => {
    navigate(`/transaction/admin/edit/${id}`)
  }

  const deleteTransaction = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/transaction/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
      });
      getUsers();
    } catch(error) {
      console.log(error)
    }
  }

  const filterData = async(e) => {
    e.preventDefault();
    console.log(queryName, queryDate);
    console.log(window.localStorage.getItem('token'))
    const result = await axios.get(`http://localhost:5000/transaction/filter`, {
      params: {
        name: queryName,
        date: queryDate
      }, 
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    })
    setTrans(result.data.data)
  }

  const getUsers = async () => {
    console.log(window.localStorage.getItem('token'))
    const response = await axios.get('http://localhost:5000/transaction', {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
    setTrans(response.data.data)
  }
  return (
    <div className="container is-fluid">
      <h4 className="title mt-3 has-text-black has-text-centered">Data Transaksi</h4>
      <div className="columns mt-5 is-centered">
        <div className="column is-one-quarter">
          <form action="" className="box">
            <div className="field">
              <label htmlFor="" className="label">Filter Data</label>
              <div className="control has-icons-left">
                <input 
                  type="date" 
                  placeholder="date" 
                  className="input"
                  value={queryDate}
                  onChange={(e) => setQueryDate(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Product Name" 
                  className="input"
                  value={queryName}
                  onChange={(e) => setQueryName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <button onClick={filterData} className="button is-success is-fullwidth">
                Apply
              </button>
            </div>
          </form>
        </div>
        <div className="column is-three-quarters">
          <table className='table is-stripped is-fullwidth'>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Transaction Date</th>
                <th>User Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((trans, index) => (
                <tr key={trans.id}>
                  <td>{index + 1}</td>
                  <td>{trans.name}</td>
                  <td>{trans.date}</td>
                  <td>{trans.userId}</td>
                  <td>
                    <Link
                      to={`edit/${trans.id}`}
                      onClick={editTransaction}
                      className='button is-small is-info'
                    >
                      Edit
                    </Link>
                    <button onClick={() => deleteTransaction(trans.id)} className='button is-small is-danger'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Transaction