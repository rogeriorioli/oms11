import React, {useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import'./style.css';
import logo from '../../assets/logo.svg'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhats] = useState('');
  const [city, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();
  async function handleRegister (e) {
    e.preventDefault();
    const data = {
      name, email, whatsapp, city , uf
    }
    try {
      const response = await api.post('/ongs', data)
      alert(`Seu id de acesso ${response.data.id}`)
      history.push('/');
    } catch(err) {
      alert(`erro no cadastro`)
    }
  }
  return (
    <div className="register-container">
      <div className="content">
          <section>
            <img src={logo} alt="Be the Hero"/>
            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ong</p>
            <Link to="/logon" className="backli-link">
                    <FiArrowLeft size={16} color="#E02041" />
                    Não tenho Cadastro
                </Link> 
          </section>
          <form onSubmit={handleRegister}>
            <input type="text"
            value={name}
            onChange={e => setName(e.target.value)}
             placeholder="Nome da Ong" required/>
            <input type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
             placeholder="E-mail" required />
            <input type="text" 
              value={whatsapp}
              onChange={e => setWhats(e.target.value)}
            placeholder="whatsapp" required/>
            <div className="input-group">
              <input type="text"
                value={city}
                onChange={e => setCidade(e.target.value)}
               placeholder="Cidade" required/>
              <input type="text"
                value={uf}
                onChange={e => setUf(e.target.value)}
               placeholder="UF "required style={{ width :80 }}/>
            </div>
           <button className="button">Cadastrat</button>
          </form>
      </div>
    </div>
  );
}
