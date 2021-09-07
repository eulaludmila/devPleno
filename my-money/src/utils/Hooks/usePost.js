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


const usePost = (url) => {
    //função e estado inicial
    //data recebe o estado inicial e também o estado quando alterado
    const [data, dispatch] = useReducer(reducer, {
        loading: false,
        data: {}
    })

    const post = data => {
        dispatch({ type: 'REQUEST' });
        axios.post(url, data)
            .then(res => {
                dispatch({ type: 'SUCCESS', data: res.data });
                console.log(res.data)
            })
    }

    return [data, post];
}

export default usePost;