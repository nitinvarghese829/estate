import React, {useRef, useState, useEffect} from 'react'

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {app} from "../firebase.js";

export default function Profile() {

    // firebase ruules
    // allow read;
    // allow write: if
    //     request.resource.size < 2 *1024 * 1024 &&
    //     request.resource.contentType.matches('image/.*')
    const {currentUser} = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [uploadError, setUploadError] = useState(false);

    const [imgUrl, setImgUrl] = useState(null);
    const fileRef = useRef(null);
    const { handleSubmit, register, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            email: currentUser.email,
            username: currentUser.username,
            avatar: currentUser.avatar,
        },
    });

    const onSubmit = (data) => {
      console.log(data);
    }
    
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime()  + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadPercent(Math.round(progress))
      }, (error) => {
          setUploadError(true);
          setUploadPercent(0);
      }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImgUrl(downloadURL);
              setValue('avatar', downloadURL)
          })
      });


    }

    useEffect(() => {
        if(file){
            handleFileUpload(file);
        }
    }, [file]);

    useEffect(() => {
        if(imgUrl) {
            setValue('avatar', imgUrl);
        }
    }, [imgUrl]);
    return (
        <div className={'px-8'}>

            <div className={'flex justify-center my-4'}>
                <h1>Profile</h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>

                    <div className={'flex justify-center'}>
                        <input onChange={(e) => setFile(e.target.files[0])} hidden accept={'image/*'} ref={fileRef}  type={'file'} />
                        <img onClick={() => fileRef.current.click()} className={'w-12 h-12 rounded-full object-cover cursor-pointer'} src={getValues('avatar')} />

                    </div>
                    <div className={'grid text-center'}>
                        <span className={'text-green-500 text-sm'}>{uploadPercent > 0 && uploadPercent + '%'} </span>
                        <span className={'text-red-500 text-sm'}>{uploadError && 'Error Image Upload'} </span>
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

                <div className={'flex justify-between my-4'}>
                    <span className={'text-red-600 hover:text-red-400 cursor-pointer'}>Delete Account</span>
                    <span className={'text-red-600 hover:text-red-400 cursor-pointer'}>Sign Out</span>
                </div>


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
