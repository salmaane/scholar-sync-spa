import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login'>

      </Route>
    </Route>
  )
);


function App() {

  return (
    <div className='app'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
