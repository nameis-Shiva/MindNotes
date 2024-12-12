import express from "express";
import dbConnect from "./db/dbConfig.js";
import cors from "cors";
import userRouter from "./Routers/userRouter.js";
import notesRouter from "./Routers/notesRouter.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:process.env.ORIGIN}))

//Demo API
app.get("/",function (req, res){
    res.send({message:"server at work".toUpperCase()})
})

//Routes
app.use("/user",userRouter)
app.use("/user/note",notesRouter)

const PORT = process.env.PORT || 6000;
const hostname = process.env.HOST || "localhost";

app.listen(PORT,hostname,() => {
    console.log(`Server is running at http://${hostname}:${PORT}`);
    dbConnect();
});