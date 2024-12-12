import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar/>
      <div className="bg-zinc-700 w-full h-screen flex justify-center items-center">
      <Outlet/>
    </div>
    </>
  )
}

export default App