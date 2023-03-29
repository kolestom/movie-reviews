import { FcGoogle } from "react-icons/fc";
import { Button,Input } from '@chakra-ui/react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        alt=""
        className={styles.logoImg}
      />
      <div className={styles.rightHeaderDiv}>
      <Input placeholder='Search Films' width='300px' />
      <Button leftIcon={<FcGoogle />} colorScheme="pink" variant="solid">
        Login
      </Button>
      </div>
    </div>
  );
};

export default Header;
