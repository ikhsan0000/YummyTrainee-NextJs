import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({ evt }) {
    const router = useRouter()
    const deleteEvent = async (e) => {
        if(confirm('Are you sure you want to delete this event?')){
            const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
                method: 'DELETE'
            })
            
            const data = await res.json()
            if(!res.ok){
                toast.error(data.message)
            }
            else
            {
                router.push('/events')
            }
        }
    }

    return (
        <Layout>
            <Link href='/events'>Go back</Link>

            <div className={styles.event}> 
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.data.id}`}>
                        <a>
                            <FaPencilAlt /> edit event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> delete event
                    </a>
                </div>
            </div>
            <h1>{evt.data.attributes.name}</h1>
            <ToastContainer/>
            {evt.data.attributes.image && (
                <div className={styles.image}>
                    <Image src={evt.data.attributes.image.data ? API_URL+evt.data.attributes.image.data.attributes.formats.medium.url : '/images/event-default.png'} width={960} height={600}></Image>
                </div>
            )}
            <h3>Performers</h3>
            <p>
                {evt.data.attributes.performers}
            </p>
            <h3>Place & Time</h3>
            <p>
                at {evt.data.attributes.venue} venue 
            </p>
            <p>
            {new Date(evt.data.attributes.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})} @ {evt.data.attributes.time} 
            </p>
            <h3>Event's Description</h3>
            <p>{evt.data.attributes.description}</p>
            
        </Layout>
    )
}

export async function getServerSideProps({ query: {id} })
{
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
    const events = await res.json();

    return{
        props: { evt: events }
    }
}
