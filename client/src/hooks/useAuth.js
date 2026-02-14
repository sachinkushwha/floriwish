import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

export const useAuth=()=>{
    return useQuery({
        queryKey:['me'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:3000/me',{withCredentials:true});
            return res.data;
        },
        retry:false
    });
}