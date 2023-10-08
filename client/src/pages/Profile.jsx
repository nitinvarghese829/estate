import React from 'react'

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function Profile() {
    const {currentUser} = useSelector((state) => state.user);
    console.log(currentUser)
    const { handleSubmit, register, getValues, formState: { errors } } = useForm({
        defaultValues: {
            email: currentUser.email,
            username: currentUser.username,
            avatar: currentUser.avatar,
        },
    });

    const onSubmit = (data) => {
      console.log(data);
    }
    return (
        <div className={'px-8'}>

            <div className={'flex justify-center my-4'}>
                <h1>Profile</h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>

                    <div className={'flex justify-center'}>
                        <img className={'w-12 h-12 rounded-full object-cover'} src={getValues('avatar')} />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("username")}
                                type="text"
                                required
                                // defaultValue={getValues('username')}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

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

                    <div className={'grid gap-3'}>
                        <button
                            // disabled={loading}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {/*{loading ? (*/}
                            {/*    <Loader />*/}
                            {/*) : 'Sign In'}*/}
                            Update
                        </button>

                    </div>
                </form>


                <div className={'py-3 alert'}>
                    {/*{error && (*/}
                    {/*    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">*/}
                    {/*        <p className={'text-red-500 text-xs'}>{error}</p>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to={"/sign-in"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}
