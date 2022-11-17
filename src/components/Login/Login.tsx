import React, { useCallback } from 'react'
import { useFormik } from 'formik'
import s from '../../styles/Authorization.module.css'
import { loginTC } from '../../redux/auth-reducer'
import { AppStateType, useTypedDispatch } from '../../redux/redux-store'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input, 
  InputAdornment, 
  InputLabel
 } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@material-ui/icons'


type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: false
}

type StatePassword = {
  password: string;
  showPassword: boolean;
}

export const Login = () => {
  const isLoggedIn= useSelector<AppStateType, boolean>((state)=>state.auth.isLoggedIn)
  const dispatch = useTypedDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 7) {
        errors.password = 'Password must be more than 7 characters...'
      }
      return errors
    },
    onSubmit: (values) => {
      dispatch(loginTC(values))
      formik.resetForm();
    },
  })
  const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
    password: '',
    showPassword: false,
});

const handleClickShowPassword = useCallback(() => {
    setValuesPassword({
        ...valuesPassword,
        showPassword: !valuesPassword.showPassword,
    });
}, [valuesPassword]);

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};

  if(isLoggedIn){
    return <Navigate to={'/profile'}/>
}
  return (
    <div className={s.container}>
      <h2>Login</h2>

      <form onSubmit={formik.handleSubmit} className={s.form}>
        <FormControl>

       
        <InputLabel color="primary">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={'Email'}
                        className={s.input}
                        color="primary"
                        {...formik.getFieldProps('email')}
                    />
 </FormControl>
          {formik.touched.email && formik.errors.email ? (
            <div className={s.error}>{formik.errors.email}</div>
          ) : null}
 <FormControl>
<InputLabel color="primary">Password</InputLabel>
                    <Input
                        id="password"
                        type={valuesPassword.showPassword ? 'text' : 'password'}
                        placeholder={'Password'}
                        className={s.input}
                        color="primary"
                        {...formik.getFieldProps('password')}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {valuesPassword.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                      </FormControl>
          {formik.touched.password && formik.errors.password ? (
            <div className={s.error}>{formik.errors.password}</div>
          ) : null}

          <FormControlLabel
            label={'Remember me'}
            checked={formik.values.rememberMe}
            control={
              <Checkbox
                color="primary"
                {...formik.getFieldProps('rememberMe')}
              />
            }
          />

          <Button type={'submit'} variant={'contained'} color={'primary'}>
            Login
          </Button>
        
          <div className={s.linkText}>Alredy have an account?</div>
          <Link to="/register" >Regisration</Link> 
      </form>
    </div>
  )
}
