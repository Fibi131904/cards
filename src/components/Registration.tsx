import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAppSelector, useTypedDispatch } from '../redux/redux-store';
import { registerTC } from '../redux/register-reducer';
import { useFormik} from 'formik';

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}
type StatePassword = {
  password: string;
  showPassword: boolean;
}

type StateConfirmPassword = {
  confirmPassword: string;
  showConfirmPassword: boolean;
}

export const Registration = () => {
  const dispatch=useTypedDispatch()
  const isRegistered = useAppSelector(state => state.register.isRegistered)

  const formik = useFormik({
    initialValues: {
      email: '',
       password: '' ,
       confirmPassword: '',
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
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'The password and confirmation password do not match'
    }
    return errors;
      },
      onSubmit: values=>{
        dispatch(registerTC(values))
      } 
  })
  const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
    password: '',
    showPassword: false,
});

const [valuesConfirmPassword, setValuesConfirmPassword] = React.useState<StateConfirmPassword>({
    confirmPassword: '',
    showConfirmPassword: false,
});

const handleClickShowPassword = useCallback(() => {
    setValuesPassword({
        ...valuesPassword,
        showPassword: !valuesPassword.showPassword,
    });
}, [valuesPassword]);

const handleClickShowConfirmPassword = useCallback(() => {
    setValuesConfirmPassword({
        ...valuesConfirmPassword,
        showConfirmPassword: !valuesConfirmPassword.showConfirmPassword,
    });
}, [valuesConfirmPassword]);

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};

if (isRegistered) {
    return <Navigate to={'/login'}/>
}
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
    {formik.touched.email && formik.errors.email?<div>{formik.errors.email}</div>: null}
    <label htmlFor="password">Password</label>
    <input 
    type='password'
     onChange={formik.handleChange}
     value={formik.values.password}
     onBlur={formik.handleBlur}
     id='password'
     name="password"/>
    {formik.touched.password && formik.errors.password?<div >{formik.errors.password}</div>: null} 
    <label htmlFor="confirmPassword">Confirm Password</label>
    <input 
    type='confirmPassword'
     onChange={formik.handleChange}
     value={formik.values.confirmPassword}
     onBlur={formik.handleBlur}
     id='confirmPassword'
     name="confirmPassword"/>
    {formik.touched.confirmPassword && formik.errors.confirmPassword?<div >{formik.errors.confirmPassword}</div>: null} 
  

    <button type="submit">
     Register
    </button>
  </form>
  </div>
  )
}

  