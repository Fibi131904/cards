import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const Button: React.FC<ButtonPropsType> = (
    {
        red, className, disabled,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
const finalClassName =`${s.default} ${red ? s.red : s.default} ${className}`

    return (
        <button
        disabled= {disabled? true:false}
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}