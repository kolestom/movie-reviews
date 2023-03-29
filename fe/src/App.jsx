import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/RootLayout'
import CallbackPage from './pages/CallbackPage'
import Dashboard from './pages/Dashboard'
import MovieDetails from './pages/MovieDetails'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element:<Dashboard />
      },
      {
        path: 'callback',
        element: <CallbackPage/>
      },
      {
        path: 'filmek/:movie-title',
        element: <MovieDetails/>
      }
    ]
  }
])

function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App