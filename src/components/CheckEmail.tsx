import React from 'react';
import {Link } from "react-router-dom"
import s from '../styles/Authorization.module.css'
import imgEmail from '../assets/images/envelop.png'


export const CheckEmail = () => {
 

  return (
    <div className={s.container}>
      
      <div className={s.form}>
      <h3>Check Email</h3>
      <img className={s.imgEmail} src={imgEmail}alt={'email img'}/>
        <div className={s.text}>
          We’ve sent an Email with instructions to example@mail.com
        </div>
        <Link to={'/login'} className={s.btn}>Back to login</Link>
      </div>
    </div>
  )
}
  