import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Header  from '../component/Header.js'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  // MDBCheckbox,
  // MDBIcon
} from 'mdb-react-ui-kit'


const UserSignup = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3002/auth/user/signup', {
        name,
        username,
        email,
        password,
        address,
        phone,
        age,
      });
      window.alert('User Registered Successfully');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };


  return (
    <>
    <Header />
    <MDBContainer fluid className='p-4 background-light-grey overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 75%)'}}>
            SensAI <br />
            <span style={{color: 'hsl(218, 81%, 95%)'}}>Auth Flow Demo</span>
          </h1>

        </MDBCol>
           
          <MDBCol md='6' className='position-relative'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-2" style={{color: 'hsl(218, 81%, 75%)'}}>
            Registeration
            {/* <span style={{color: 'hsl(218, 81%, 95%)'}}>Auth Flow Demo</span> */}
          </h1>
            
            <div id='radius-shape-1' className='position-absolute rounded-circle shadow-5-strong'></div>
            <div id='radius-shape-2' className='position-absolute shadow-5-strong'></div>

            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>
                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Name'
                      id='validationCustom01'
                    required
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </MDBCol>

                  <MDBCol col='6'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Username'
                      id='username'
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass='mb-4'
                  label='Email'
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Address'
                  id='address'
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Phone'
                  id='phone'
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Age'
                  id='age'
                  type='number'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />

                <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>
                  Sign Up
                </MDBBtn>
              
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </>
    
      );
    }
    


export default UserSignup;
