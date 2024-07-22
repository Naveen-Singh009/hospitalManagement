import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import  connectDB  from './database/dbConnection.js';
import  messageRouter from "./routes/messageRoute.js"
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import userRouter from "./routes/userRouter.js"
import appointmentRouter from "./routes/appointmentRouter.js"

dotenv.config({
    path : './.env'
})

const app = express();

connectDB()

app.use(cors(
    {
        origin : [process.env.FRONTEND_URL , process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter)

app.use("/api/v1/appointment", appointmentRouter)



app.use(errorMiddleware)

export default app