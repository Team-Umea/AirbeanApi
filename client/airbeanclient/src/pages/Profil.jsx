import React from 'react'
import { useDispatch } from 'react-redux';
import PrimaryButton from '../components/btn/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../store/authSlice';

const Profil = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(clearAuth);
    navigate("/")
  };

  return (
    <>
    <div className='profil-page'>
      <h2>Min Profil</h2>
      <p>Dina ordrar:</p>
      < PrimaryButton onClick={handleLogOut}>
      Logga ut</PrimaryButton>
    </div>
    
    </>
  )
}

export default Profil