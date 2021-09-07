import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
const Generos = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3002/api/genres').then(res => {
            setData(res.data.data);
        })
    }, []);

    const deleteGenero = id => {
        axios.delete('http://localhost:3002/api/genres/' + id)
            .then(res => {
                const filtro = data.filter(item => item.id !== id);
                setData(filtro);
            })
    }

    const renderizaLinha = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button onClick={() => deleteGenero(record.id)} type="button" className="btn btn-danger">Excluir</button>
                    <Link to={`/generos/${record.id}`} className="ml-2 btn btn-warning">Editar</Link>
                </td>
            </tr>
        )
    }

    if (data.length === 0) {
        return (
            <div className="container">
                <h1>Gêneros</h1>
                <div><Link to='/generos/novo'>Novo Gênero</Link></div>
                <div className="alert alert-warning" role="alert">
                    Você não possui gêneros criados.
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Gêneros</h1>
            <div><Link to='/generos/novo' className='btn btn-primary mb-3'>Novo Gênero</Link></div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>
        </div>
    )
}

export default Generos;