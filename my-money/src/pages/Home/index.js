import React from 'react';
import AdicionarMes from './components/AdicionarMes';
import Meses from './components/Meses';

const Home = () => {
    return (
      <div className="container">
        <AdicionarMes />
        <Meses />
      </div>
    )
  }

export default Home;