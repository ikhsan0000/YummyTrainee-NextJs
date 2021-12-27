import styles from '@/styles/EventItem.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function EventItem({evt}) {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image src={evt.attributes.image ? evt.attributes.image : '/images/event-default.png'} width={170} height={100}/>
            </div>
                <div className={styles.info}>
                    <Link href={`/events/${evt.id}`}>
                        <h3 className={styles.title}>{evt.attributes.name}</h3>
                    </Link>
                    <span>{evt.attributes.name} at {evt.attributes.time}</span>
                </div>
        </div> 
    )
}
