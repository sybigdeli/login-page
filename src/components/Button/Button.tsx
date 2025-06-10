import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    ...props
}) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    )
}

export default Button