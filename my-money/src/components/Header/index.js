import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            setLogado(true);
        } else {
            setLogado(false);
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        setLogado(false);;
        history.push('/login')
    }

    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <Link className='navbar-brand' to='/'> MyMoney</Link>
                {
                    logado &&
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <button type="button" className="btn nav-link" onClick={logout}>Sair</button>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    )
}

export default Header;