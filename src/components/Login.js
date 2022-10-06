import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try{
      const result = await axios.post('http://localhost:5000/login', {
        name,
        email,
        role
      });
      window.localStorage.setItem('token', result.data.token);
      // console.log(result.data.token);
      // console.log(window.localStorage.getItem('token'))
      role === 'admin'? navigate('/transaction/admin') : navigate('/transaction/guest')
    } catch(error){
      console.log(error)
    }
  }
  return (
    <div className="container">
      <h4 className="title mt-3 has-text-black has-text-centered">Login</h4>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <form onSubmit={saveUser} className="box">
            <div className="field">
              <label htmlFor="" className="label">Name</label>
              <div className="control has-icons-left">
                <input 
                  type="text" 
                  className="input"
                  placeholder="Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="" className="label">Email</label>
              <div className="control has-icons-left">
                <input 
                  type="email" 
                  className="input"
                  placeholder="e.g. bobsmith@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Role</label>
              <div className="control has-icons-left">
                <div className="select is-fullwidth">
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">admin</option>
                    <option value="guest">guest</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <button className="button is-success is-fullwidth">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login