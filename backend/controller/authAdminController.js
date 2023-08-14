import bcrypt from 'bcrypt'
import pool from '../app.js'
import 'dotenv/config.js'
import jwt from 'jsonwebtoken';

const admin_login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)

  try {
    const query = 'SELECT admin_id, username, password FROM admin WHERE email = $1';
    const result = await pool.query(query, [email]);

    const admin = result.rows[0];
    console.log(admin)

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ adminId: admin.admin_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ adminId: admin.admin_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('token', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // Set refresh token in cookie

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const admin_signup = async(req, res) => {
  const { username, email, password, name, address, phone, age } = req.body;

try {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user data into the database
  const query = `
    INSERT INTO admin (username, email, password, name, address, phone, age)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING admin_id;
  `;

  const values = [username, email, hashedPassword, name, address, phone, age];

  const result = await pool.query(query, values);

  res.status(201).json({ userId: result.rows[0].admin_id, message: 'Admin registered successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
}
}



export { admin_login_post, admin_signup}