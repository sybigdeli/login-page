import React from 'react'
import styles from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className={styles.inputContainer}>
            {label && <label className={styles.label}>{label}</label>}
            <input className={`${styles.input} ${error ? styles.error : ''}`} {...props} />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    )
}

export default Input