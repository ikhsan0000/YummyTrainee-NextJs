import Link from 'next/link';
import {FaExclamationTriangle} from 'react-icons/fa'
import Layout from '@/components/layout';
import styles from '@/styles/404.module.css';

export default function NotFoundPage() {
    return (
        <Layout title='Page not found!'>
            <div className={styles.error}>
                <h1><FaExclamationTriangle/> 404</h1>
                <h4>Whoops! there's nothing here!</h4>
                <Link href='/'>Let's go home</Link>
            </div>
        </Layout>
    )
}
 