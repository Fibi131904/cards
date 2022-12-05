import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@material-ui/core"
import React, { useCallback } from "react"
import { Navigate, useParams } from "react-router-dom"
import s from '../styles/Authorization.module.css'
import { useAppSelector, useAppDispatch } from "../redux/redux-store"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { useFormik } from "formik"
import { setInfoTC } from "../redux/setNewPassword-reducer"


type FormikErrorType = {
  password?: string
  confirmPassword?: string
}

type StatePassword = {
  password: string;
  showPassword: boolean;
}

export const SetNewPassword = React.memo( () => {
  const dispatch = useAppDispatch()
    const isPasswordChanged = useAppSelector(state => state.setNewPassword.isPasswordChanged)
    const {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: ''                    
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password must be more than 7 characters...'
            }
           
            return errors;
        },
        onSubmit: values => {
            token && dispatch(setInfoTC({password: values.password, resetPasswordToken: token}))
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

    if (isPasswordChanged) {
        return <Navigate to={'/login'}/>
    }

  return (
    <div className={s.wrapper}>
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <h3>Create New Password</h3>
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
                  onMouseDown={handleMouseDownPassword}>
                  {valuesPassword.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <div className={s.text}>
        Create new password and we will send you further instructions to email
        </div>
        <Button type={'submit'} variant={'contained'} color={'primary'}>
        Create new password
        </Button>
        </form>
    </div>
   
  )
}
)
  