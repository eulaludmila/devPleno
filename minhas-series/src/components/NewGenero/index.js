import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovoGenero = () => {
    const [name, setName] = useState('');
    const [sucess, setSuccess] = useState(false);

    const onChange = e => {
        setName(e.target.value);
    }

    const handleSave = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3002/api/genres', {name})
        .then((res) => {
            setSuccess(true);
        })
    }

    if(sucess){
        return <Redirect to='/generos'/>
    }

    return (
        <div className='container'>
            <h1>Novo Gênero</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input value={name} onChange={onChange} type='text' className='form-control' id='name' placeholder='Nome do gênero' />
                </div>
                <button onClick={handleSave} type="button" className="btn btn-primary">Salvar</button>
            </form>
        </div>
    )
}

export default NovoGenero;