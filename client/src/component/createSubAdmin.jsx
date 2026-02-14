import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
export const CreateSubAdmin = (req, res) => {
    const navigate = useNavigate();
    const createSubAdmin = async (formdata) => {
        const response = await axios.post('https://floriwish-zobh.vercel.app/sub-admin', formdata, {
            withCredentials: true
        });
        return response.data;
    }
    const handleSubAdminMutation = useMutation({
        mutationKey: ['subAdmin'],
        mutationFn: createSubAdmin,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message);
            navigate('/')
        }
    });
    const handleSubAdmin = (value) => {
        handleSubAdminMutation.mutate(value);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: ''
                    }}
                    onSubmit={(value) => {
                        handleSubAdmin(value);
                    }}
                >
                    <Form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">password</label>
                            <Field
                                type="text"
                                name="password"
                                id="password"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className='flex mt-3 gap-8'>
                            <Link
                                to="/"
                                className="block w-full text-center bg-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-300 transition"
                            >
                                Cancel
                            </Link>

                            <button type='submit' className="cursor-pointer w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
                            >
                                create subAdmin
                            </button>
                        </div>

                    </Form>
                </Formik>
            </div>
        </div>
    )
}