import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

export const useAuth=()=>{
    return useQuery({
        queryKey:['me'],
        queryFn:async()=>{
            const res=await axios.get('https://floriwish-zobh.vercel.app/me',{withCredentials:true});
            return res.data;
        },
        retry:false
    });
}