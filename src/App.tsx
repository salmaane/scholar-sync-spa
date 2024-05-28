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
import Users from './pages/Users/Users';
import Subject from './pages/Subjects/Subjects';
import Exam from './pages/Exam/Exam';
import Class from './pages/Class/Class';
import Group from './pages/Group/Group';
import Department from './pages/Department/Department';
import Sector from './pages/Sector/Sector';
import CreateUser from './pages/Users/CreateUser';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path={"/"} element={<RootLayout />}>
        <Route element={<AuthOutlet fallbackPath="login" />}>
          <Route index element={<Dashboard />} />
          <Route path="user">
            <Route index element={<Users />} />
            <Route path='create' element={<CreateUser/>} />
          </Route>
          <Route path="subject" element={<Subject />} />
          <Route path="exam" element={<Exam />} />
          <Route path="class" element={<Class />} />
          <Route path="group" element={<Group />} />
          <Route path="department" element={<Department />} />
          <Route path="sector" element={<Sector />} />
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
