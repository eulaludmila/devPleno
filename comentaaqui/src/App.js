import { useState, useEffect } from 'react'
import './App.css';
import firebase from './services/firebase'

const useDatabase = endpoint => {
  const [data, setData] = useState({});
  useEffect(() => {
    const ref = firebase.database().ref(endpoint);
    ref.on('value', snapshot => {
      setData(snapshot.val())
    })

    //quando o componente sair de tela, o ideal é limpa a operação de ouvinte do firebase
    return () => {
      ref.off()
    }
  }, [endpoint])
  return data;
}

const useDatabasePush = endpoint => {
  const [status, setStatus] = useState('');
  const save = data => {
    const ref = firebase.database().ref(endpoint)
    ref.push(data, err => {
      if(err){
        setStatus('ERROR');
      }else{
        setStatus('SUCCESS');
      }
    })
  }

  return [status, save];
}

const Comment = ({comment}) => {
  return(
    <div>
      {comment.content} por: {comment.user.name}
    </div>
  )
}

const Comments = () => {
  const data = useDatabase('comments')

  if(!data){
    return <p>Nenhum comentário até o momento</p>
  }
  const ids = Object.keys(data)
  if(ids.length === 0){
    return <p>Carregando...</p>
  }
  return ids.map(id => {
    return <Comment key={id} comment={data[id]}/>
  });
}
function App() {
  const [, save] = useDatabasePush('comments');

  return (
    <>
      <button 
      onClick={() => {
        save({content: 'olá mundo!', user:{
          id: '1',
          name: 'Eula'
        }})
      }}
      >Toggle</button>
      <Comments/>
    </>
  )
}

export default App;
