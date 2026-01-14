import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { blogRouter } from './routes/blog_routes.js'

const app = express ()

const PORT = 7788



const mongoURI = process.env.MONGO_URI;


app.use(express.json())

app.use("/api/blogs", blogRouter);

await mongoose.connect(mongoURI);
app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`)
})