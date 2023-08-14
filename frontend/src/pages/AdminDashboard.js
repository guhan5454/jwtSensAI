import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Header from '../component/Header.js'

export default function AdminDashboard() {
  // const [adminData, setAdminData] = useState(null)
  const [allUserData, setAllUserData] = useState(null)
  const accessToken = Cookies.get('accessToken')

  useEffect(() => {
    axios.get('http://localhost:3002/admin/dashboard', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      console.log(response)
      setAllUserData(response.data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [accessToken]);
  
  console.log(allUserData)

  return (
    <>
    <Header />
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {allUserData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}
