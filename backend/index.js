import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoute.js'
import userRouter from './route/userRoute.js'
import courseRouter from './route/courseRoute.js'
import paymentRouter from './route/paymentRoute.js'
import reviewRouter from './route/reviewRoute.js'
import cors from 'cors'

dotenv.config()

// ✅ Disable console logs in production
if (process.env.NODE_ENV === 'production') {
  console.log = function () {}
  console.warn = function () {}
  console.error = function () {}
}

const port = process.env.PORT || 8000
const app = express()

// ✅ CORS Configuration — must come before routes
app.use(cors({
  origin: ['https://frontend-cmif.onrender.com'], // your frontend domain
  credentials: true, // allow cookies and Authorization headers
}))

// ✅ Handle all preflight (OPTIONS) requests (Express v5 compatible)
app.options(/.*/, cors({
  origin: ['https://frontend-cmif.onrender.com'],
  credentials: true,
}))

// ✅ Middlewares
app.use(express.json())
app.use(cookieParser())

// ✅ API Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/course', courseRouter)
app.use('/api/order', paymentRouter)
app.use('/api/review', reviewRouter)

// ✅ Health check / root routes
app.get('/', (req, res) => {
  res.send('Hello from Virtual Campus Backend 👋')
})

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working 🚀' })
})

// ✅ Start server
app.listen(port, () => {
  connectDb()
  console.log(`✅ Server running on port ${port}`)
})
