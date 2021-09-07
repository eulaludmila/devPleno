import React, {useEffect, useState} from 'react';
import {usePost} from '../../utils/Hooks/rest';
import {Redirect} from 'react-router-dom'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkhZLHcARqZqaNqpRUFCHE2klHmkQHFtM';

const Login = () => {
    const [postData, signin] = usePost(url);
    const [logado, setLogado] = useState(false);
    const [form, setForm] = useState({
        email: '', 
        senha: ''
    })
    useEffect(() => {
        if(Object.keys(postData.data).length > 0){
            localStorage.setItem('token', postData.data.idToken);
            setLogado(true);
        }
    }, [postData])

    const onChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    const login = async () => {
        const {email, senha} = form;
        await signin({

            email,
            password: senha,
            returnSecureToken: true

        })
    }

    if(logado){
        return <Redirect to="/"/>
    }

    return (
        <div>
            <h1>Login</h1>
            {
                postData.error && postData.error.length > 0 &&
                <p>E-mail e/ou senha inválidos</p>

            }
            {JSON.stringify(postData)}
            <input type="email"  value={form.email} onChange={(e) => onChange(e)} name="email" placeholder="Email"/>
            <input type="password"  value={form.senha} onChange={(e) => onChange(e)} name="senha" placeholder="Senha"/>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login;