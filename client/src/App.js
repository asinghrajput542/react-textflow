import './App.css';
import Editor from './component/Editor';
import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import {v4 as uuid} from 'uuid';
import Home from './component/home/Home';
import PopUp from './component/pop/PopUp';
import Header from './component/header/Header';
import DocumentCard from './component/Documents/DocumentCard';


const route=new createBrowserRouter(
  [{
    path:"/",
    element:<Home/>
    },
    {
    path:"docs/:name/:id",
    element:<Editor/>,
    }
  ]
)

function App() {
  return (
    <div className='layout'>
    <Header/>
   <RouterProvider router={route} />
   </div>
  );
}

export default App;
