import React, { useState } from 'react'
import userPhoto from '../assets/images/userPhoto.png'
import s from '../styles/Authorization.module.css'
import { Button, IconButton } from '@material-ui/core'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import { EditableSpan } from '../common/EditableSpan/EditableSpan'
import { useAppSelector, useAppDispatch } from '../redux/redux-store'
import { updateUserDataTC } from '../redux/profile-reducer'
import { logoutTC } from '../redux/auth-reducer'
import { Navigate } from 'react-router-dom'

type ProfileType = {
  title?: string
  changeTitle?: (title: string) => void
  disabled?: boolean
  activateEditMode?: () => void
}

export const Profile: React.FC<ProfileType> = ({ disabled }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const userAvatar = useAppSelector((state) => state.profile.avatar)
  const userId = useAppSelector((state) => state.profile._id)
  const email = useAppSelector((state) => state.profile.email)
  const userName = useAppSelector((state) => state.profile.name)
  const publicCardPacksCount = useAppSelector(
    (state) => state.profile.publicCardPacksCount
  )
  const dispatch = useAppDispatch()
  const [editMode, setEditMode] = useState<boolean>(false)

  const activateEditMode = () => {
    if (disabled) {
      return
    } else {
      setEditMode(true)
    }
  }

  const changeUserName = (name: string) => {
    dispatch(
      updateUserDataTC({
        name: name,
        avatar: userAvatar,
        _id: userId,
        publicCardPacksCount,
        email,
      })
    )
  }
  const onLogoutClick = () => {
    dispatch(logoutTC())
  }
  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <h3>Personal Information</h3>
        <div className={s.container}>
        <img className={s.imgEmail} src={userPhoto} alt={'Repsonal img'} />
       <div className={s.userNickName}>
        <EditableSpan
          title={userName}
          changeTitle={changeUserName}
          editMode={editMode}
          setEditMode={setEditMode}
        />
        <IconButton color={'primary'}>
          <BorderColorIcon onClick={activateEditMode} />
        </IconButton>
        </div>
        <div className={s.infoBlock}>
        <div>
          <b>E-mail:</b> {email}
        </div>
        <div>
          <b>Card Packs: </b> {publicCardPacksCount}
        </div>
        </div>
        <Button color={'primary'} variant={'contained'} onClick={onLogoutClick}>
          Logout
        </Button>
      </div>
    </div>
    </div>
  )
}
