import { useReducer } from 'react';
import axios from 'axios';


//função pura
const reducer = (state, action) => {
    //manipular meu estado
    if (action.type === 'REQUEST') {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type === 'SUCCESS') {
        return {
            ...state,
            loading: false,
            data: action.data
        }
    }

    return state;
}


const useDelete = () => {
    //função e estado inicial
    //data recebe o estado inicial e também o estado quando alterado
    const [data, dispatch] = useReducer(reducer, {
        loading: false,
        data: {}
    })

    const remove = (url) => {
        dispatch({ type: 'REQUEST' });
        axios.delete(url)
            .then(res => {
                dispatch({ type: 'SUCCESS'});
            })
    }

    return [data, remove];
}

export default useDelete;