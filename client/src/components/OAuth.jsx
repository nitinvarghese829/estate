import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {app} from '../firebase';
import {useDispatch, useSelector} from "react-redux";
import {signInSuccess, signInStart} from '../redux/user/userSlice'
import {useNavigate} from "react-router-dom";
import {Loader} from "./Loader.jsx";


export default function OAuth() {
    const {loading, error} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            dispatch(signInStart())
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            console.log(result);
            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName
                    , email: result.user.email, photo: result.user.photoURL})
            });

            const data = await res.json();
            dispatch(signInSuccess(data));

            navigate("/");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <button disabled={loading} onClick={handleGoogleClick} type={'button'} className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {loading ? (<Loader />) : 'Continue with google'}
        </button>
    )
}
