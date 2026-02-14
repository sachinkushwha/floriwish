import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function Login() {
    const navigate = useNavigate();
    const postLogindata = async (formdata) => {
        const response = await axios.post('http://localhost:3000/login', formdata, {
            withCredentials: true
        });
        return response.data;
    }

    const loginMutaion = useMutation({
        mutationKey: ['login'],
        mutationFn: postLogindata,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate('/');
        },
        onError: (err) => {
            console.log(err);
            toast.error(err?.response?.data?.message);
        }
    })

    const handleLogin = (value) => {
        loginMutaion.mutate(value);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                {/* Heading */}
                <h2 className="text-2xl font-semibold text-slate-800 text-center">
                    Sign in to your account
                </h2>
                <p className="text-sm text-slate-500 text-center mt-1">
                    Welcome back, please login
                </p>

                {/* Form */}
                <Formik
                    initialValues={
                        {
                            email: '',
                            password: ''
                        }
                    }
                    onSubmit={(value) => {
                        handleLogin(value);
                    }}
                    className="mt-6 space-y-5">
                    <Form>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <Field
                                type="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <Field
                                type="text"
                                name="password"
                                required
                                placeholder="••••••••"
                                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            {/* <label className="flex items-center gap-2 text-slate-600">
                                <Field type="checkbox" className="rounded border-slate-300" />
                                Remember me
                            </label> */}
                            <a href="#" className="text-indigo-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Sign In
                        </button>
                    </Form>
                </Formik>

                {/* Footer */}
                <p className="text-center text-sm text-slate-600 mt-6">
                    Don’t have an account?
                    <a href="#" className="text-indigo-600 font-medium ml-1 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
