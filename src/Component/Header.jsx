import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='bg-yellow-200 p-5 text-center text-xl font-bold'>
            <Link to='/'><span>Home</span></Link>
            <Link to='/login'><span className='mx-5'>Login</span></Link>
            <Link to='/register'><span>Register</span></Link>
        </div>
    );
};

export default Header;