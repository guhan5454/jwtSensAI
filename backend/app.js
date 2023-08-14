import express from 'express';
import authAdminRoutes from './routes/authAdminRoutes.js';
import authUserRoutes from './routes/authUserRoutes.js';
import userRoutes from './routes/userRoutes.js';
import pg  from 'pg';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';

const {Pool} = pg

const app = express();
app.listen(3002,()=>console.log("listening"))
app.use(cookieParser());
app.use(cors())
// app.get('/',(req,res)=>res.send("sss"))

const jwt = app.use(express.json())
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sensai',
  password: 'guhan123',
  port: 5432, // or your PostgreSQL port number
});

app.get('/', (req, res) => {
    res.send("hii")
    console.log("Dummy")
})
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/auth/admin', authAdminRoutes)
app.use('/auth/user', authUserRoutes)
// app.use(authRoutes)

export default pool;