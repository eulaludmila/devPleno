import {useState, useEffect} from 'react'
import './App.css';
import firebase from './services/firebase'

function App() {

  const [data, setData] = useState({});
  
  useEffect(() => {
    const ref = firebase.database().ref('teste');
    ref.on('value', snapshot => {
      setData(snapshot.val())
    })

    //quando o componente sair de tela, o ideal é limpa a operação de ouvinte do firebase
    return () => {
      ref.off()
    }
  },[])

  return (
    <div className="App">

    </div>
  );
}

export default App;
