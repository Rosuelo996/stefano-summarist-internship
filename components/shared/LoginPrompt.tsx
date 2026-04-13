"use client"
import { openModal } from '../../redux/modalSlice'
import { useDispatch } from 'react-redux';

function LoginPrompt() {
  const dispatch = useDispatch();

  return (
    <div className="settings__login--wrapper">
                  <img src="/login.png" alt="" />
                <div className="settings__login--text">Log in to your account to see your details</div>
                <button 
                className="btn settings__login--btn"
                onClick={() => dispatch(openModal())}>Login</button>
                </div>
  )
}

export default LoginPrompt