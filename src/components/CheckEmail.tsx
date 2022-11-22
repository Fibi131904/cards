import React from 'react';
import {Link, useParams } from "react-router-dom"
import s from '../styles/Authorization.module.css'
import imgEmail from '../assets/images/envelop.png'


export const CheckEmail = () => {
  const {email} = useParams()

  return (
    <div className={s.container}>
      
      <div className={s.form}>
      <h3>Check Email</h3>
      <img className={s.imgEmail} src={imgEmail}alt={'email img'}/>
        <div className={s.text}>
          We’ve sent an Email with instructions to <b>{email}</b>
        </div>
        <Link to={'/login'} className={s.btn}>Back to login</Link>
      </div>
    </div>
  )
}
  