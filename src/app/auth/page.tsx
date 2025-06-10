'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import styles from './auth.module.scss'
import { validateIranianPhoneNumber } from '@/utils/validation'
import Loading from '@/components/Laoding/Loading'

export default function AuthPage() {
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { isAuthenticated, login, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated && !loading) {
            console.log('Redirecting to dashboard...');
            router.replace('/dashboard');
        }
    }, [isAuthenticated, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateIranianPhoneNumber(phone)) {
            setError('Please enter a valid Iranian phone number')
            return
        }

        setIsSubmitting(true)
        setError('')

        try {
            const success = await login()
            if (!success) {
                setError('Login failed. Please try again.')
            }
        } catch (err) {
            setError('Server error. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Login</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Phone Number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09XXXXXXXXX"
                        error={error}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    )
}