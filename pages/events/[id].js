import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css"
import Image from "next/image";
import Link from "next/link";
import {FaPencilAlt, FaTimes} from 'react-icons/fa'

export default function EventPage({ evt }) {

    const deleteEvent = () => {console.log("deleteEvent")}

    console.log(evt)
    return (
        <Layout>
            <div className={styles.event}> 
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
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
            {evt.image && (
                <div className={styles.image}>
                    <Image src={evt.image} width={960} height={600}></Image>
                </div>
            )}
            <p>{evt.data.attributes.description}</p>
            <h5>
                <span>by {evt.data.attributes.performers} at {evt.data.attributes.venue} venue @ {evt.data.attributes.time}</span>
            </h5>
        </Layout>
    )
}

export async function getServerSideProps({ query: {id} })
{
    const res = await fetch(`${API_URL}/api/events/${id}`);
    const events = await res.json();

    return{
        props: { evt: events }
    }
}
