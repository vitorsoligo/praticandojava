import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'



const logar = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8090/api/login', {
            username: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

function Login() {

    const navigate = useNavigate(); // Use navigate para redirecionamento
    const handleClick = () => {
        navigate('/cadastro');
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await logar(username, password);            
            if (response == true){
                navigate('/home');
            }
            else{
                alert(response)
            }
        } catch (error) {
            console.error('Erro ao se logar:', error);
        }
    };
    return (
        <div className='div'>
            <h1>Login</h1>
            <form>
                <label>
                    Usuário: 
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Senha: 
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br /><br />
                <button className='botao' type="button" onClick={handleLogin}>
                    Login
                </button>
            </form><br />
            <button className='botao' onClick={handleClick}>
                Cadastro
            </button>
        </div>
    );
}
export default Login;