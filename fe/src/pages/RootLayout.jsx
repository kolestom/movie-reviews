import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Header from '../components/Header';

const RootLayout = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);

    return (
        <>
            <Header {... { isLoggedIn, setIsLoggedIn }} />
            <Outlet context={[setIsLoggedIn]} />
        </>
    );
}

export default RootLayout;