import './App.css';
import Editor from './component/Editor';
import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import {v4 as uuid} from 'uuid';


const route=new createBrowserRouter(
  [{
    path:"/",
    element:<Navigate replace to={`/docs/${uuid()}`}/>,
    },
    {
    path:"docs/:id",
    element:<Editor/>,
    }
  ]
)

function App() {
  return (
   <RouterProvider router={route} />
  );
}

export default App;
