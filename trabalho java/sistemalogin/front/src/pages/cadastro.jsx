import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function Cadastro() {
  const [usuario, setUsuario] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({
    username: '',
    password: '',
  });

  const irParaHome = useNavigate();

  const handleClick = () => {
    irParaHome('/');
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const fetchUsuario = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api');
      setUsuario(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuario:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/api/cadastro', novoUsuario);
      fetchUsuario();
      setNovoUsuario({
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Erro ao criar Usuario:', error);
    }
  }

  return (
    <div>
      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Usuário: 
          <input
          type="text"
          name="username"
          value={novoUsuario.username}
          onChange={handleInputChange}
        />
        </label>
        
        <br />
        <label>
          Senha:
        <input
          type="number"
          name="password"
          value={novoUsuario.password}
          onChange={handleInputChange}
        />
        </label>
        <br /><br />
        <button className='botao' type="submit">Cadastrar</button>
      </form>
      <br />
      <button className='botao' onClick={handleClick}>
        Login
      </button>
    </div>
  );
};

export default Cadastro;
