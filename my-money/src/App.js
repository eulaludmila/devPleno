import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Movimentacoes from './pages/Movimentacoes';
import Login from './pages/Login';
function App() {

  // const data = useGet('movimentacoes/2021-05');
  // const [postData, post] = usePost('movimentacoes/2021-05');
  // const [deleteData, remove] = useDelete();
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home}></Route>
        <Route path='/movimentacoes/:data' exact component={Movimentacoes}></Route>
        <Route path="/login" exact component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
