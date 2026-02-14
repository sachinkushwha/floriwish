import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
export const Home = () => {
    const navigate = useNavigate();
    const { data } = useAuth();

      const handletotalsubadmin = async () => {
            try {
                const response = await axios.get('https://floriwish-zobh.vercel.app/total_sub_admin', {
                    withCredentials: true
                });
                navigate(`/total-sub-admin/${response?.data?.total_sub_admin}`) 
            } catch (error) {
                navigate('/')
                toast.error(error?.response?.data?.message);
            }
    
        }

         const getSuperUserCount = async () => {
        try {
            const response = await axios.get('https://floriwish-zobh.vercel.app/total_super_user', {
                withCredentials: true
            });
            navigate(`/total-super-admin/${response?.data?.total_sub_admin}`) 
        } catch (error) {
            navigate('/');
            toast.error(error?.response?.data?.message);
        }

    }

    const handleLogout = async () => {
        const response = await axios.post('https://floriwish-zobh.vercel.app/logout', {}, {
            withCredentials: true
        });
        return response.data;
    }
    const logoutMutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: handleLogout,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate('/login');
        }
    })
    const handlelogout = () => {
        logoutMutation.mutate();
    }
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-6">
                <h1>Role : {data?.role}</h1>
                <h1 className="text-2xl font-semibold text-slate-800">
                    Welcome To Home Page
                </h1>

                {/* Navigation Links */}
                <div className="flex flex-col gap-3">
                    {
                        data ? '' : (<Link
                            to="/login"
                            className="bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Login
                        </Link>)
                    }


                    <Link
                        to="/sub-admin"
                        className="border border-slate-300 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                    >
                        Create Sub Admin
                    </Link>

                    <button onClick={getSuperUserCount}
                        className="border border-slate-300 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                    >
                        Total Super Admin
                    </button>

                    <button
                       onClick={handletotalsubadmin}
                        className="border border-slate-300 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                    >
                        Total Sub Admin
                    </button>

                </div>

                {/* Logout Button */}
                <button
                    onClick={handlelogout}
                    disabled={logoutMutation.isPending}
                    className="cursor-pointer w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition disabled:opacity-50"
                >
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>

            </div>
        </div>
    )
}