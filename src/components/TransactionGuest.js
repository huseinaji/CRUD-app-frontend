import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionGuest = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get('http://localhost:5000/transaction', {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
    // console.log(response.data);
    setData(response.data)
  }
  return (
    <div>Total transaksi = {data.totalTransaction}</div>
  )
}

export default TransactionGuest