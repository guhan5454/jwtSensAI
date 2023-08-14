// UserDashboard.js (Frontend)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../component/Header.js';
// import { useCookies, Cookies } from 'react-cookie';
import Cookies from 'js-cookie';
import EditableField from '../component/EditableField';
import {  MDBContainer, MDBCol } from 'mdb-react-ui-kit'

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    // const [cookies] = useCookies(['accesstoken'])
    // const accessToken = cookies.accesstoken
    // const accessToken = Cookies.get('accessToken')
    // const accessToken = sessionStorage.getItem('accessToken')
    const accessToken = Cookies.get('accessToken')
    console.log(accessToken)

  useEffect(() => {
    axios.get('http://localhost:3002/user/dashboard', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [accessToken]);

  if (!userData) {
    return (
    <>
    <Header />
    <MDBContainer fluid className='p-4 background-light-grey overflow-hidden align-content-center'>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column align-item-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 75%)'}}>
            Hey, Nice Try! <br />
          <span style={{color: 'hsl(218, 81%, 95%)'}}>Next Time try to sign in with correct credentials</span>
          </h1>
          <p className="text-center"> Auth Failed <br /> <a href="signup">Click here to signin again</a></p>
        </MDBCol>
    </MDBContainer>
    </>
  )}


  const handleFieldSave = (field, newValue) => {
    console.log(`New ${field}:`, newValue);
  };

  return (
    <>
    <Header />
    <div>
      <h2>User Dashboard</h2>
      <EditableField value={userData.name} onSave={(newValue) => handleFieldSave('name', newValue)} />
      <EditableField value={userData.age} onSave={(newValue) => handleFieldSave('age', newValue)} />
      <EditableField value={userData.phone} onSave={(newValue) => handleFieldSave('phone', newValue)} />
      <EditableField value={userData.address} onSave={(newValue) => handleFieldSave('address', newValue)} />
      {/* Other user dashboard content */}
    </div>
    </>
  );
};

export default UserDashboard;