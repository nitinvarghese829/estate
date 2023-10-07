import React from 'react'
import {QueryClientProvider, useMutation, useQueryClient} from "@tanstack/react-query";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";

export default function SignIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const signup = (data) => {
        return axios.post(`/api/auth/signin`, data).then((res) => {
            setTimeout(() => {
                navigate('/home');
            }, 2000);
            return res;
        }).catch((err) => {
            return(err.response);
        });
    }

    const {mutate, isLoading, error, data} = useMutation({
        mutationFn: (formData) => { return signup(formData) },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['signup'] });
        },
    });

    console.log(error, data);
    const { handleSubmit, register, formState: { errors } } = useForm({});

    const onSubmit = (data) => {
        console.log(data);
        // mutateAsync().then(res => {
        //     if(res.data.success){
        mutate(data);
        //     }
        // });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <QueryClientProvider client={queryClient}>
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("email")}
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        {...register("password")}
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {isLoading ? (
                                        <div
                                            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status">
                                              <span
                                                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                              >Loading...</span>
                                        </div>
                                    ) : 'Sign Up'}
                                </button>
                            </div>
                        </form>

                    </QueryClientProvider>

                    <div className={'py-3 alert'}>
                        {data && data?.data?.statusCode !== 200 && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <p className={'text-red-500 text-xs'}>{data?.data?.message}</p>
                            </div>
                        )}

                    </div>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to={"/sign-in"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
