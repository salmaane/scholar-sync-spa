import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "./assets/css/App.css";
//Chakra
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
// Components
import Login from './pages/Login/Login';
import RootLayout from './pages/Layout/RootLayout';
import Dashboard from './pages/Dashboard/Dashboard';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Dashboard/>}/>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ChakraProvider theme={theme}>
        <div className='app'>
          <RouterProvider router={router}/>
        </div>
    </ChakraProvider>
  )
}

export default App
