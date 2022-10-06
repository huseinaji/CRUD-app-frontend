import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
const Edit = () => {
  const { id } = useParams();
  const navigate = new useNavigate();
  const [name, setName] = useState("");

  const updateTrans = async (e) => {
    e.preventDefault();
    console.log(window.localStorage.getItem('token'));
    await axios.patch(`http://localhost:5000/transaction/update/${id}`, { name }, 
    {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
    navigate(`/transaction/admin`)
  }
  return (
    <div className="container">
      <h4 className="title mt-3 has-text-black has-text-centered">Edit Transaction</h4>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <form action="" className="box">
            <div className="field">
              <label htmlFor="" className="label">Product Name</label>
              <div className="control has-icons-left">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="input"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
            </div>
            <div className="field">
              <button onClick={updateTrans} className="button is-success is-fullwidth">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit