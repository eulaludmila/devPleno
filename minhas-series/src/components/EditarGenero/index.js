import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const EditarGenero = ({match}) => {
    const [name, setName] = useState('');
    const [sucess, setSuccess] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3002/api/genres/${match.params.id}`)
        .then((res) => {
            setName(res.data.name);
        })
    }, [match.params.id])

    const onChange = e => {
        setName(e.target.value);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3002/api/genres/${match.params.id}`, {name})
        .then((res) => {
            setSuccess(true);
        })
    }

    if(sucess){
        return <Redirect to='/generos'/>
    }

    return (
        <div className='container'>
            <h1>Editar Gênero</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input value={name} onChange={onChange} type='text' className='form-control' id='name' placeholder='Nome do gênero' />
                </div>
                <button onClick={handleUpdate} type="button" className="btn btn-primary">Editar</button>
            </form>
        </div>
    )
}

export default EditarGenero;