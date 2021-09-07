import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovaSerie = () => {
    const [form, setForm] = useState({});
    const [sucess, setSuccess] = useState(false);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3002/api/genres`).then(res => {
            setGenres(res.data.data)
        })
    }, []);

    const onChange = field=> e => {
        setForm({
            ...form,
            [field]: e.target.value
        });
    }

    const handleSave = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3002/api/series', form)
        .then((res) => {
            setSuccess(true);
        })
    }

    if(sucess){
        return <Redirect to='/series'/>
    }

    return (
        <div className='container'>
            <h1>Nova Série</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input value={form.name} onChange={onChange('name')} type='text' className='form-control' id='name' placeholder='Nome da série' />
                </div>
                <div className='form-group'>
                            <label htmlFor='genres'>Gêneros</label>
                            <select className="form-control" id="genres" onChange={onChange('genre_id')} value={form.genre_id}>
                                {
                                    genres.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                                }
                            </select>
                        </div>
                <button onClick={handleSave} type="button" className="btn btn-primary">Salvar</button>
            </form>
        </div>
    )
}

export default NovaSerie;