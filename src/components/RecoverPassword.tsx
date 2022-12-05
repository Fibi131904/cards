import { Button, TextField } from "@material-ui/core"
import React,{ ChangeEvent } from "react"
import {  useState } from "react"
import {Link, useNavigate } from "react-router-dom"
import { recoverTC } from "../redux/recoverPassword-reducer"
import { useAppDispatch } from "../redux/redux-store"
import s from '../styles/Authorization.module.css'


export const RecoverPassword = React.memo(() => {
  const dispatch = useAppDispatch() 
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const message = `<div style="background-color: lime; padding: 15px">
  password recovery link: 
  <a href='http://localhost:3000/#/setNewPassword/$token$'>link</a></div>` 
  

  const onEmailSendClick = () => {
    dispatch(recoverTC(email, message))
    setEmail('')
    navigate(`/checkEmail/${email}`)
  }
  const emailEnter = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
}
  
 
  return (
    <div className={s.wrapper}>
      <div className={s.form}>
      <h3>Forgot your password?</h3>
      <TextField
        id="email"
        type={email}
        label="Email"
        variant="outlined"
        color={'primary'}
        value={email}
        onChange={emailEnter}
      />
      <div className={s.text}>
        Enter your email address and we will send you further instructions
      </div>
      <Button
        onClick={onEmailSendClick}
        variant={'contained'}
        color={'primary'}>
        Send Instructions
      </Button>
      <div className={s.text}>Did you remember your password? </div>
      <Link to={'/login'}>Try logging in</Link>
    </div>
    </div>
  )
})


