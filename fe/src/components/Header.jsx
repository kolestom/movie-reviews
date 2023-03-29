import { FcGoogle } from "react-icons/fc";
import { Button, Input } from '@chakra-ui/react'
import styles from './Header.module.css'


const Header = ({ isLoggedIn, setIsLoggedIn }) => {

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
    setIsLoggedIn(false)
  }

  return (
    <div className={styles.headerContainer}>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        alt=""
        className={styles.logoImg}
      />
      <div className={styles.rightHeaderDiv}>
        <Input placeholder='Search Films' width='300px' />
        {isLoggedIn ?
          <Button onClick={handleLogout} leftIcon={<FcGoogle />} colorScheme="pink" variant="solid">Logout</Button> :
          <Button onClick={handleLogin} leftIcon={<FcGoogle />} colorScheme="pink" variant="solid">Login</Button>
        }

      </div>
    </div>
  );
};

export default Header;
