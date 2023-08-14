import pool from "../app.js";

const admin_dashboard = async (req, res) => {
    try {
        const adminId= req.admin.adminId
        console.log(adminId);
        // res.send('admin login get');
        const query = 'SELECT name, address, phone, age FROM admin WHERE admin_id = $1';
        const result = await pool.query(query, [adminId]);
        

        const query2 = 'SELECT user_id, username, name, address, phone, age FROM users;'
        const userResult = await pool.query(query2);


        res.status(200).json(userResult.rows)
        
        // return result.rows[0];
      } catch (error) {
        console.error('Error fetching admin details:', error);
        throw error;
      }   

    
  };

export {admin_dashboard}