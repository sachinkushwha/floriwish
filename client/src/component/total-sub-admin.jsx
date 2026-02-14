import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const Total_sub_admin = () => {
    const navigate = useNavigate()
    const handletotalsubadmin = async () => {
        try {
            const response = await axios.get('https://floriwish-zobh.vercel.app/total_sub_admin', {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            navigate('/')
            toast.error(error?.response?.data?.message);
        }

    }

    const { data, isError, isLoading } = useQuery({
        queryFn: handletotalsubadmin,
        retry: false
    });


    if (isLoading) return null
    if (isError) return null;
    return (
        <div>
            {
                data ? (
                    <h1>Total Sub Admins: {data?.total_sub_admin || 0}</h1>
                ) : ''
            }
        </div>
    );
};
