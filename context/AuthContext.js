import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SELF_URL } from "@/config/index"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter()

    useEffect(() => checkUserLoggedIn(), [])

    // Register
    const register = async (user) => {
        const res = await fetch(`${SELF_URL}/api/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })

        const data = await res.json()
        if(res.ok)
        {
            setUser(data.user)
            router.push('/account/dashboard')
        }
        else
        {
            setError(data.message)
            setError(null)
        }
    }

    // Login
    const login = async ({email: identifier, password}) => {
        const res = await fetch(`${SELF_URL}/api/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ identifier, password })
        })

        const data = await res.json()
        if(res.ok)
        {
            setUser(data.user)
            router.push('/account/dashboard')
        }
        else
        {
            setError(data.message)
            setError(null)
        }
    }

    // Logout
    const logout = async () => {
        const res = await fetch(`${SELF_URL}/api/logout`, {
            method: 'POST',
        })

        if(res.ok)
        {
            setUser(null)
            router.push('/')
        }
    }

    // Check user is logged in
    const checkUserLoggedIn = async () => {
        const res = await fetch(`${SELF_URL}/api/user`)
        const data = await res.json()

        if(res.ok)
        {
            setUser(data.user)
        }
        else
        {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext