import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateNote from "./Notes Components/CreateNote";
import NoteDetail from "./Notes Components/NoteDetail";
import VerifyEmail from "./pages/VerifyEmail";
import EditNote from "./Notes Components/EditNote";

export let router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                index:true,
                element:<Dashboard/>
            },
            {
                path:"profile",
                element:<UserProfile/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"signup",
                element:<Signup/>
            },
            {
                path:"verifyemail",
                element:<VerifyEmail/>
            },
            {
                path:"createNote",
                element:<CreateNote/>
            },
            {
                path:"note/:noteId",
                element:<NoteDetail/>
            },
            {
                path:"/edit-note/:noteId",
                element:<EditNote/>
            },
        ]
    }
])