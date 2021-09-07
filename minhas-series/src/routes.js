
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import EditarGenero from './components/EditarGenero';
import Generos from './components/Generos';
import Header from './components/Header';
import Home from './components/Home';
import InfoSerie from './components/InfoSeries';
import NovoGenero from './components/NewGenero';
import NovaSerie from './components/NewSeries';
import Series from './components/Series';

const Routes = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/generos" exact component={Generos}/>
                <Route path="/generos/novo" exact component={NovoGenero}/>
                <Route path="/generos/:id" exact component={EditarGenero}/>
                <Route path="/series" exact component={Series}/>
                <Route path="/series/novo" exact component={NovaSerie}/>
                <Route path="/series/:id" exact component={InfoSerie}/>
            </Switch>
        </Router>
    )
}

export default Routes;