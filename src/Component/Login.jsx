import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../firebase.config';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'

const Login = () => {

    const [icon, setIcon] = useState(eyeOff)
    const [type, setType] = useState('password')

    const handleToShowPassword = () =>{
         if (type==='password') {
            setIcon(eye)
            setType('text')
         }else{
            setIcon(eyeOff)
            setType('password')
         }
    }

    const emailRef= useRef()
    const [error, SetError] = useState('')
    const [success, SetSuccess] = useState('')

    const auth = getAuth(app)

    const handleToLogin = (event)=>{
        event.preventDefault()
        SetError('')
        SetSuccess('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        
        if (!/(?=.*[a-z])/.test(password)){

            SetError(' the password must contain one lowercase letter')
            return;
         }
         else if (!/(?=.*[A-Z])/.test(password)) {
             SetError('the password must contain one uppercase letter')
             return;
         }
         else if (password.length < 10) {
             SetError(' the password must be 10 characters long')
             return;
         }
         signInWithEmailAndPassword(auth, email, password)
         .then(res =>{
            const user = res.user
            console.log(user);
            if (!user.emailVerified) {
              alert('please verifi')
            }
            else{
                SetSuccess('successful')
                SetError("")
            }
            
         })
         .catch(error =>{
            alert(error.message)
         })
        }

        const handleToReseatPassword = event =>{
            const email = emailRef.current.value;
            console.log(email);
            if (!email) {
                alert('please reset your email')
            };
        sendPasswordResetEmail(auth, email)
        
        .then(()=>{
            alert('please check your email')
        })
        .catch((error)=>{
              alert(error.message)
        })

        }
    return (
        <div>
            <div className='flex justify-center my-5 '>
            <form onSubmit={handleToLogin} className='border-2 border-lime-200 px-5 rounded'>
             <h1 className='text-center text-xl font-bold mb-5 mt-2'>Login</h1>
              <label htmlFor="Email">Email</label><br />
              <input className='my-3 rounded border-2 pl-2 pr-20 py-2 border-slate-700' type="email" ref={emailRef} name='email' placeholder='Inter your Email' required/><br />
              <label htmlFor="Email">Password</label><br />
              <div className="relative ">
              <input className='my-3 rounded border-2 pl-2 pr-20 py-2 border-slate-700' type={type} name='password' placeholder='Inter your Password' required/>
              <span className='absolute  right-8 top-5'><Icon onClick={handleToShowPassword} size={25} icon={icon}> </Icon></span>
              </div>
              <input className='bg-emerald-300 my-4 py-2 px-4 ml-24 rounded-lg' type="submit" value="submit" />
              <p className='text-sm mb-3'>create an Account! please <Link to='/register'><span className='text-green-400 font-bold'>Register</span></Link></p>
              <p className='text-sm mb-2'>Please Forget your password <button onClick={handleToReseatPassword} className='bg-green-400'>Reset password</button></p>
              <p className='text-red-400 text-sm'>{error}</p>
              <p className='text-green-400 text-sm'>{success}</p>
            </form>
            </div>
        </div>
    );
};

export default Login;