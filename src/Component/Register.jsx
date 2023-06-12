import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../firebase.config';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'


const Register = () => {
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
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    // console.log(email);
    // console.log(password);
    const [error, SetError] = useState('')
    const [successful, SetSuccessful] = useState('')
    
    const auth = getAuth(app)


    const handleGetEmail = (event)=>{
        console.log(event.target.value);
    }
    const handleToFormData = (event)=>{
        event.preventDefault()
        SetError('')
        SetSuccessful('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(email,password,name);
        // SetEmail(email);
        // SetPassword(password)

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

        createUserWithEmailAndPassword(auth, email, password)
        .then(res =>{
         const user = res.user
         console.log(user);
         SetSuccessful('successfully')
         SetError('')
         emailVerification(res.user)
         upDateUserData(res.user,name)
        })
        .catch(error =>{
            console.log(error.message);
            SetError(error.message)
        })
        event.target.email.value = ""
        event.target.password.value = ""
        event.target.name.value = ""
        
    }
    const emailVerification = (user)=>{
        sendEmailVerification(user)
        .then(res=>{
            console.log(res);
            alert('please verifi email')
        })

    }
    const upDateUserData = (user,name)=>{
          updateProfile(user, {displayName:name})
          .then(()=>{
            console.log('add display name');
          })
          .catch((error)=>{
              console.log(error.message);
          })
    }

   
    
    return (
        <div>
        <div className='flex justify-center my-5 '>
            <form onSubmit={handleToFormData} className='border-2 border-lime-200 px-5 rounded'>
             <h1 className='text-center text-xl font-bold mb-5 mt-2'>Register</h1>
             <label htmlFor="Email">Name</label><br />
             <input className='my-3 rounded border-2 pl-2 pr-20 py-2 border-slate-700' type="name" name='name' placeholder='Inter your Name' required/><br />
              <label htmlFor="Email">Email</label><br />
              <input className='my-3 rounded border-2 pl-2 pr-20 py-2 border-slate-700' type="email" name='email' placeholder='Inter your Email' required/><br />
              <label htmlFor="Email">Password</label><br />
              <div className="relative ">
              <input className='my-3 rounded border-2 pl-2 pr-20 py-2 border-slate-700' type={type} name='password' placeholder='Inter your Password' required/>
              <span className='absolute  right-8 top-5'><Icon onClick={handleToShowPassword} size={25} icon={icon}> </Icon></span>
              </div>
              <input className='bg-emerald-300 my-4 py-2 px-4 ml-24 rounded-lg' type="submit" value="submit" />
              <p className='text-sm mb-3'>Already create an Account! please <Link to='/login'><span className='text-green-400 font-bold'>Login</span></Link></p>
              <p className='text-red-400 text-sm'>{error}</p>
              <p className='text-green-400 text-sm'>{successful}</p>
            </form>
           
        </div>
        </div> 
    );
};

export default Register;