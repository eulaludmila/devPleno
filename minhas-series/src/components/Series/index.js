import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
const Series = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3002/api/series').then(res => {
            setData(res.data.data);
        })
    }, []);

    const deleteSerie = id => {
        axios.delete('http://localhost:3002/api/series/' + id)
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
                    <button onClick={() => deleteSerie(record.id)} type="button" className="btn btn-danger">Remover</button>
                    <Link to={`/series/${record.id}`} className="ml-2 btn btn-warning">Info</Link>
                </td>
            </tr>
        )
    }

    if (data.length === 0) {
        return (
            <div className="container">
                <h1>Séries</h1>
                <div><Link to='/series/novo' className='btn btn-primary mb-3'>Nova Série</Link></div>
                <div className="alert alert-warning" role="alert">
                    Você não possui séries criadas.
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Séries</h1>
            <div><Link to='/series/novo' className='btn btn-primary mb-3'>Nova Série</Link></div>
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

export default Series;