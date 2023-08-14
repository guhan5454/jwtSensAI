import React from 'react'
import { useNavigate } from 'react-router-dom'
import  Header  from '../component/Header.js'

const Home = () => {
  const navigate = useNavigate()

  const signupHandler = (e) => {
    console.log("Hii")
    navigate('/auth/user/signup')
  }

  return (
    <>
    <Header />
    <div>
      <button type="submit" className="btn btn-primary" onClick={signupHandler}> Sign Up </button>
    </div>
    </>
  )
}

export default Home;
