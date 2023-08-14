import bcrypt from 'bcrypt'
import pool from '../app.js'
import 'dotenv/config.js'
import jwt from 'jsonwebtoken';
// import verifyToken from '../middleware/authMiddleware.js';

const signup_post = async(req, res) => {
    const { username, email, password, name, address, phone, age } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password, name, address, phone, age)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING user_id;
    `;

    const values = [username, email, hashedPassword, name, address, phone, age];

    const result = await pool.query(query, values);

    res.status(201).json({ userId: result.rows[0].user_id, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

function signup_get(req, res) {
    res.send('signup get')
}
const login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const query = 'SELECT user_id, username, password FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
  
      const user = result.rows[0];
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const accessToken = jwt.sign({ userId: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ userId: user.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  
      res.cookie('token', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); 
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); 
  
      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export {signup_get, signup_post, login_post }
