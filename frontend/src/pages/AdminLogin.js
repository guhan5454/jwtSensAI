import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import { useCookies, Cookies, setCookie } from 'react-cookie';
import {
  MDBContainer,
  MDBTabs,
  // MDBTabsItem,
  // MDBTabsLink,
  MDBTabsContent,
  // MDBTabsPane,
  MDBBtn,
  // MDBIcon,
  MDBInput,
  // MDBCheckbox
}
from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';
import  Header  from '../component/Header.js'
import axios from 'axios';

function UserLogin() {
  // const [setCookie] = useCookies(['accessToken'])
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // const [justifyActive, setJustifyActive] = useState('tab1');;
  // const justifyActive = 'tab1'
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3002/auth/admin/login', {
        email,
        password
      }).then((response) => {
        // setAccessToken(response.data.accessToken)
        Cookies.set('accessToken', response.data.accessToken)
        Cookies.set('refreshToken', response.data.refreshToken)
        window.alert('Login Successful');
      })
     
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

    
  // const handleJustifyClick = (value) => {
  //   if (value === justifyActive) {
  //     return;
  //   }

  //   setJustifyActive(value);
  // };
  return (
   <>
    <Header />
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    
          <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          </MDBTabs>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 75%)'}}>
            Admin Login <br />
            {/* <span style={{color: 'hsl(218, 81%, 95%)'}}>Auth Flow Demo</span> */}
          </h1>
    
          <MDBTabsContent>
    
            {/* <MDBTabsPane show={justifyActive === 'tab1'}> */}
    
              <MDBInput wrapperClass='mb-4' label='Email'
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password'
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
    
              <div className="d-flex justify-content-between mx-4 mb-4">
                {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
                {/* <a href="!#">Forgot password?</a> */}
              </div>
    
              <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>Sign in</MDBBtn>
              {/* <p className="text-center">Not a member? <a href="signup">Register</a></p> */}
    
            {/* </MDBTabsPane> */}
    
          </MDBTabsContent>
    
        </MDBContainer>
        </>
  );
}

export default UserLogin;