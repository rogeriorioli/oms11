import React, {useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi'
import { Link , useHistory} from 'react-router-dom'
import'./style.css';
import api from "../../services/api";
import logo from '../../assets/logo.svg'

export default function NewIncident() {
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId')

    async function NewIncident(e)  {
        e.preventDefault();
        const data = {title, description, value}
        await api.post('/incidents', data , {
            headers : {
                Authorization : ongId
            }
        })

        history.push('/profile')

    }
   
  return (
    <div className="new-incident-container">
      <div className="content">
          <section>
            <img src={logo} alt="Be the Hero"/>
            <h1>Cadastrar novo caso</h1>
            <p>Descreva o caso e econtre um héroi para apoiar </p>
            <Link to="/" className="backli-link">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Home
                </Link> 
          </section>
          <form onSubmit={NewIncident}>
            <input type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="tutulo do caso"/>
            <textarea type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"/>
            <input type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em Reais"/>
            <div className="input-group">
           <button className="button" type="submit">Cadastrar</button>
            </div>
           
          </form>
      </div>
    </div>
  );
}
