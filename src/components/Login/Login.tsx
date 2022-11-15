import React from 'react';
import { useFormik} from 'formik';
import s from './Login.module.css'
import { loginTC } from '../../redux/auth-reducer';
import { useTypedDispatch } from '../../redux/redux-store';



type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: false
}


   export const Login = () => {
    const dispatch=useTypedDispatch()
    const formik = useFormik({
      initialValues: {
        email: '',
         password: '' ,
         rememberMe: false
        },
        validate:(values) => {
          const errors:FormikErrorType = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length <= 7) {
            errors.password = 'Password must be more than 7 characters...'
        }
        return errors;
        },
        onSubmit: values=>{
          dispatch(loginTC(values))
        } 
    })
    return (<div>
      <div>Register</div>
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
       onChange={formik.handleChange}
       value={formik.values.email}
       onBlur={formik.handleBlur}
       id='email'
       name="email"/>
      {formik.touched.email && formik.errors.email?<div className={s.error}>{formik.errors.email}</div>: null}
      <label htmlFor="password">Password</label>
      <input 
      type='password'
       onChange={formik.handleChange}
       value={formik.values.password}
       onBlur={formik.handleBlur}
       id='password'
       name="password"/>
      {formik.touched.password && formik.errors.password?<div className={s.error}>{formik.errors.password}</div>: null} 

      <label htmlFor="checkbox" >Remember me</label>
      <input 
      type ='checkbox'
      onChange={formik.handleChange}
       checked={formik.values.rememberMe}
       id='rememberMe'
       name='rememberMe'/>

      <button type="submit">
       Register
      </button>
    </form>
    </div>
    )
  }
  