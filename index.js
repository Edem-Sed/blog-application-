import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { blogRouter } from './routes/blog_routes.js'
import { authRouter } from './routes/auth_routes.js'
import { userRouter } from './routes/user_routes.js'
const app = express ()

const PORT = process.env.PORT || 7788;




const mongoURI = process.env.MONGO_URI;


app.use(express.json())

app.use("/api/blogs", blogRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

await mongoose.connect(mongoURI);
app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`)
})