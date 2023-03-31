import { FcGoogle } from "react-icons/fc";
import { Button, Input } from '@chakra-ui/react'
import styles from './Header.module.css'
import axios from "axios";
import { useState } from "react";


const Header = ({ isLoggedIn, setIsLoggedIn, setMovieList }) => {

 

  const url = "https://accounts.google.com/o/oauth2/v2/auth"
  const client_id = "169346533635-mt05gutaslpavfvje15a1hnjauudu3tc.apps.googleusercontent.com"
  const redirect_URI = 'http://localhost:5173/callback'
  const scope = 'profile%20email%20openid'
  const response_type = 'code'
  const fullUrl = `${url}?client_id=${client_id}&redirect_uri=${redirect_URI}&scope=${scope}&response_type=${response_type}&prompt=consent%20select_account`

  const handleLogin = () => {
    window.location.href = fullUrl;
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
  }

  const movieInputHandler = async(e) => {
    const result = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fe81cd2556cf074a1a365d166ccba87c&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
    // setSearch(e.target.value)
    setMovieList(result.data.results)
  }
  
  
  const reviewerInputHandler = async(e) => {
    const result = await axios.get(`http://localhost:3004/api/reviews/reviewer?name=${e.target.value}`)
    console.log(result.data);
    setMovieList(result.data)
  }
  return (
    <div className={styles.headerContainer}>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        alt=""
        className={styles.logoImg}
      />
      {isLoggedIn && <div className={styles.user}>Hi, {localStorage.getItem('user')}</div>}
      <div className={styles.rightHeaderDiv}>
        {isLoggedIn && <Input onInput={(e)=>reviewerInputHandler(e)} color='white' placeholder='Search Reviewer' _placeholder={{ opacity: 0.4, color: 'inherit' }} width='200px' />}
        <Input onInput={(e)=>movieInputHandler(e)} color='white' placeholder='Search Films' _placeholder={{ opacity: 0.4, color: 'inherit' }}width='200px' />
        {isLoggedIn ?
          <Button onClick={handleLogout} colorScheme="blue" variant="solid">Logout</Button> :
          <Button onClick={handleLogin} leftIcon={<FcGoogle />} colorScheme="gray" variant="solid">Login</Button>
        }

      </div>
    </div>
  );
};

export default Header;
