import React from 'react'
import styles from './MovieCard.module.css'
import { useNavigate, Link } from "react-router-dom"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button
} from '@chakra-ui/react'
import MovieDrawer from './MovieDrawer'


function MovieCard({ movie }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  return (
    <>
    
      <div className={styles.card} onClick={onOpen}>
        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt="" />
        <div>{movie.vote_average}</div>
        <h4>{movie.title}</h4>
        <p>{movie.release_date}</p>
      </div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <MovieDrawer {...{onClose, movie}}/>

          
            
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MovieCard