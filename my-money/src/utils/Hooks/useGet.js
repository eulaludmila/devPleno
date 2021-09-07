import {useReducer, useEffect} from 'react';
import axios from 'axios';

//função pura
const reducer = (state, action) => {
    //manipular meu estado
    if(action.type === 'REQUEST'){
      return {
        ...state,
        loading: true
      }
    }
  
    if(action.type === 'SUCCESS'){
      return {
        ...state,
        loading: false,
        data: action.data
      }
    }
  
    return state;
  }

//Hook personalizado
const useGet = url => {
    //função e estado inicial
    //data recebe o estado inicial e também o estado quando alterado
    const [data, dispatch] = useReducer(reducer, {
      loading: true,
      data: {}
    })
  
    useEffect(() => {
      dispatch({type:'REQUEST'});
      axios.get(url)
        .then(res => {
          /*setData({
            loading: false,
            data: res.data
          });*/
  
          dispatch({type: 'SUCCESS', data:res.data})
        })
    }, [url])
  
    return data;
  }

  export default useGet;