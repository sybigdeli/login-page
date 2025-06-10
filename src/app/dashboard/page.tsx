'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import styles from './dashboard.module.scss'
import Loading from '@/components/Laoding/Loading'
import Button from '@/components/Button/Button'

export default function DashboardPage() {
    const { user, isAuthenticated, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth')
        }
    }, [isAuthenticated, loading, router])

    if (loading || !isAuthenticated || !user) {
        return <Loading />
    }

    const handleLogOut = () => {
        logout();
        router.push('/auth')
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Welcome {user.name.first} {user.name.last}!
                </h1>
                <div className={styles.userInfo}>
                    <img
                        src={user.picture.thumbnail}
                        alt="User thumbnail"
                        className={styles.avatar}
                    />
                    <p>email: {user.email}</p>
                    <p>cell: {user.phone}</p>
                </div>
                <Button onClick={handleLogOut}>Log Out</Button>
            </div>
        </div>
    )
}