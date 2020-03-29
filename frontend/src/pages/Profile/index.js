import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiPower , FiTrash2} from 'react-icons/fi'
import  './style.css';
import api from '../../services/api'
import logo from '../../assets/logo.svg'

export default function Profile() {

  const history = useHistory();

  const [incidents, setIncidents] = useState([]);
  
  
  const name = localStorage.getItem('ongName')
  const ongid = localStorage.getItem('ongId')




  useEffect(() => {
    api.get('/profile', {
      headers : {
        Authorization : ongid
      }
    }).then(response => {
        setIncidents(response.data)
    })
  }, [ongid])

  async function handleDelete(id) {
      try {
        api.delete(`/incidents/${id}`, {
          headers : {
            Authorization: ongid
          }
          })
          setIncidents(incidents.filter(incident => incident.id !== id))
      } catch (error) {
          alert('ERRO')
      }
  }
  const handleLogout = () => {
    localStorage.clear();
    history.push('/')
  }

  return (
    <div className="profile-container">
        <header>
            <img src={logo} alt="Be the hero"/>
             <span>bem vindo {name}</span>
            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button type="button" onClick={handleLogout}>
              <FiPower size={18} color="#e02041"/>
            </button>
        </header>
       < h1>Casos Cadastrados</h1>
       <ul>
         {incidents.map(list => (
              <li key={list.id}>
              <strong>Caso:</strong>
              <p>{list.title}</p>
              <strong>Descrição:</strong>
               <p>{list.description}</p>
              <strong>Valor:</strong>
                <p>{Intl.NumberFormat('pt-BR', {
                  style : 'currency',
                  currency : 'BRL'
                }).format(list.value)}</p>
              <button type="button" onClick={() => handleDelete(list.id)}>
                <FiTrash2 size={18} color="#e02041"/>
              </button>
              </li>
         ))}
        
       </ul>
    </div>
  );
}
