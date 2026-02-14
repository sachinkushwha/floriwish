import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
export const Total_super_admin = () => {
    const navigate = useNavigate();
    const {count}=useParams();
    // const getSuperUserCount = async () => {
    //     try {
    //         const response = await axios.get('https://floriwish-zobh.vercel.app/total_super_user', {
    //             withCredentials: true
    //         });
    //         return response.data;
    //     } catch (error) {
    //         navigate('/');
    //         toast.error(error?.response?.data?.message);
    //     }

    // }
    // const { data, isError, isLoading } = useQuery({
    //     queryFn: getSuperUserCount,
    //     retry: false,
    // });

    return (
        <div>
            {
                count ? (
                    <h1>Total Sub Admins: {count || 0}</h1>
                ) : ''
            }

        </div>
    )
}