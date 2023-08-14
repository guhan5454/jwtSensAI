import pool from "../app.js";

const dashboard_get = async (req, res) => {
  const authorizedId = req.user.userId;

  try {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const result = await pool.query(query, [authorizedId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = result.rows[0];
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const refreshToken= (req, res) => {
    const refreshToken = req.cookies.token;
    console.log(refreshToken)

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    console.log(decoded.userId)

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
}

export {refreshToken, dashboard_get}
