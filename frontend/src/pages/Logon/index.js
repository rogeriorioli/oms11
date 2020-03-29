import React, {useState, useEffect} from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link , useHistory } from 'react-router-dom'

import './style.css';
import api from '../../services/api'
import heroImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
export default function Logon() {
  
  const [id , setId] = useState('')
  const history =  useHistory();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('/session', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch (error) {
      alert('deu ruim')
    }
  }
      useEffect(() => {
        const ongId = localStorage.getItem('ongId');
        setId(ongId)
      },[])
  console.log(id)
  return (
    <div className="logon-container">
        <section className="form">
            <img src={logo} alt="Be The Hero"/>
            <form onSubmit={handleLogin}>
                <input type="text" 
                defaultValue={id}
                onChange={e => setId(e.target.value)}
                placeholder="Sua Id"/>
                <button type="submit" 
                
                className="button">Entrar</button>
                <Link to="/register" className="backli-link">
                    <FiLogIn size={16} color="#E02041" />
                    Não tenho Cadastro
                </Link>
            </form>
        </section>
        <img src={heroImg} alt="Heroes"/>
    </div>
  );
}
