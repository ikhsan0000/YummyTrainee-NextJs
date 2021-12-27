import EventItem from '@/components/EventItem';
import Layout from '@/components/layout'
import Link from 'next/link'
import { API_URL } from '@/config/index'

export default function Home({events}) {
  return (

    <Layout>
      <h1>Upcoming</h1>
      {events.length === 0 && <h3>it's lonely here, there's currently no events</h3>}
      {events && events.map( (e) => (
        <EventItem key={e.id} evt={e}/>
      ))}
      {events && (
        <Link href={`/events`}>
          <a className="btn-secondary">
            See all
          </a>
        </Link>
      )}

    </Layout>
  )
}


export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()
  return {
    props: { events }
  }
}