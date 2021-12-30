import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/AuthForm.module.css'
import Layout from '@/components/Layout';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {login, error, user} = useContext(AuthContext)

    useEffect(() => error && toast.error(error))
    
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        login({email, password})
    }

    if(user)
    {
        router.push('/');
    }
    
    return (
        <Layout title="User Login">
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Log in
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <input type="submit" value="Login" className="btn" />
                </form>

                <p>
                    Don't have an account yet? 
                    <Link href='/account/register'> Register Here</Link>
                </p>
            </div>
        </Layout>
    )
}
