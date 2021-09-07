import React, { useState } from 'react';

const AdicionarMovimentacao = ({salvarMovimentacao}) => {
    const initialValue = { valor: '', descricao: '' };
    const [form, setForm] = useState(initialValue);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const toSave = async () => {
        if (!isNaN(form.valor) && form.valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
            const { valor, descricao } = form;
            await salvarMovimentacao({
                valor: parseFloat(valor),
                descricao
            })
            setForm(initialValue);
        }
    }

    return (
        <tr>
            <td>
                <input className="form-group" type='text' value={form.descricao} name='descricao' onChange={handleChange} />
            </td>
            <td>
                <input className="form-group" type='text' value={form.valor} name='valor' onChange={handleChange} />
                {'  '}<button className="btn btn-success" onClick={toSave}>+</button>
            </td>
        </tr>
    )

}

export default AdicionarMovimentacao;