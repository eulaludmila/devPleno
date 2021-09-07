import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({ name: '', comments: '', genre_id: 0, status: '' });
    const [sucess, setSuccess] = useState(false);
    const [mode, setMode] = useState('INFO');
    const [genres, setGenres] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {

        axios.get(`http://localhost:3002/api/series/${match.params.id}`).then(res => {
            setData(res.data);
            setForm(res.data);
        })


    }, [match.params.id]);

    useEffect(() => {
        axios.get(`http://localhost:3002/api/genres`).then(res => {
            setGenres(res.data.data)
        })
    }, []);

    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    const onChange = field => e => {
        setForm({
            ...form,
            [field]: e.target.value
        });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3002/api/series/${match.params.id}`, form)
            .then((res) => {
                setSuccess(true);
            })
    }

    const seleciona = value => {
        setForm({
            ...form,
            status: value
        })
    }

    if (sucess) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className="h-100" style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className="h-100 container">
                        <div className="row h-100 align-items-center">
                            <div className="col-3">
                                <img alt={data.name} className="img-fluid img-thumbnail" src={data.poster} />
                            </div>
                            <div className="col-8">
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className="lead text-white">
                                    {
                                        data.status && data.status === 'PARA_ASSISTIR' &&
                                        <Badge color='warning' className="mr-3">Para assistir</Badge>
                                    }
                                    {
                                        data.status && data.status === 'ASSISTIDO' &&
                                        <Badge color='success' className="mr-3">Assistido</Badge>

                                    }
                                    Gênero: {data.genre_name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container d-flex flex-column justify-content-center">
                {
                    mode === 'INFO' &&
                    <>
                        <h4 className="text-center mt-4">Clique no botão abaixo para editar os dados</h4>
                        <button className="btn btn-warning pl-5 pr-5 mt-4 text-center" onClick={() => setMode('EDIT')}>Editar Série</button>
                    </>
                }
            </div>
            {
                mode === 'EDIT' &&

                <div className='container'>
                    <h1 className="mt-4">Nova Série</h1>
                    <button className="btn btn-danger mt-4 mb-4" onClick={() => setMode('INFO')}>Cancelar Edição</button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome</label>
                            <input value={form.name} onChange={onChange('name')} type='text' className='form-control' id='name' placeholder='Nome da série' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='comments'>Comentário</label>
                            <input value={form.comments} onChange={onChange('comments')} type='text' className='form-control' id='comments' placeholder='Comentário' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='genres'>Gêneros</label>
                            <select className="form-control" id="genres" onChange={onChange('genre_id')} value={form.genre_id}>
                                {
                                    genres.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="assistido" checked={form.status === 'ASSISTIDO'} onChange={() => onChange('status')} value="ASSISTIDO" onClick={() => seleciona('ASSISTIDO')} />
                            <label className="form-check-label" htmlFor="assistido">
                                Assistido
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="paraAssistir" checked={form.status === 'PARA_ASSISTIR'} onChange={() => onChange('status')} value="PARA_ASSISTIR" onClick={() => seleciona('PARA_ASSISTIR')} />
                            <label className="form-check-label" htmlFor="paraAssistir">
                                Para Assistir
                            </label>
                        </div>
                        <button onClick={handleUpdate} type="button" className="btn btn-success pl-5 pr-5 mt-4 mb-5">Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSerie;