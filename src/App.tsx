import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "./assets/css/App.css";
//Chakra
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
// auth kit
import AuthProvider from "react-auth-kit";
import store from './context/authStore';
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
// Components
import Login from './pages/Login/Login';
import RootLayout from './pages/Layout/RootLayout';
import Dashboard from './pages/Dashboard/Dashboard';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<RootLayout/>}>
        <Route element={<AuthOutlet fallbackPath='login'/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <main className='app'>
      <ChakraProvider theme={theme}>
        <AuthProvider store={store}>
          <RouterProvider router={router}/>
        </AuthProvider>
      </ChakraProvider>
    </main>
  )
}

export default App
