import { Button, TextField } from "@material-ui/core"
import React from "react"
import {  useState } from "react"
import {Link, useNavigate } from "react-router-dom"
import { recoverTC } from "../redux/recoverPassword-reducer"
import { useTypedDispatch } from "../redux/redux-store"
import s from '../styles/Authorization.module.css'


export const RecoverPassword = React.memo(() => {
  const dispatch = useTypedDispatch() 
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const message = `<div style="background-color: lime; padding: 15px">
  password recovery link: 
  <a href='https://Fibi131904.github.io/cards/#/set-new-password/$token$'>link</a></div>` 
  

  const onEmailSendClick = () => {
    dispatch(recoverTC(email, message))
    setEmail('')
    navigate(`/check-email/${email}`)
  }
  
  
 
  return (
    <div className={s.container}>
      <h2>Forgot your password?</h2>
<div className={s.form}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        placeholder={'Email'}
        color={'primary'}
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


