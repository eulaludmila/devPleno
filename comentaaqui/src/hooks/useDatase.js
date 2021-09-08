import { useState, useEffect } from 'react'
import firebase from './services/firebase'

export const useDatabase = endpoint => {
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
  return {...data, endpoint};
}
