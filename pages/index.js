import EventItem from '@/components/EventItem';
import Layout from '@/components/layout'
import Link from 'next/link'
import { API_URL } from '@/config/index'

export default function Home({events}) {

  return (

    <Layout>
      <h1>Upcoming</h1>
      {events.data.length === 0 && <h3>it's lonely here, there's currently no events</h3>}
      {events && events.data.map( (e) => (
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
  const res = await fetch(`${API_URL}/api/events?pagination[limit]=2&sort[0]=date:desc&populate=*`)
  const events = await res.json()
  return {
    props: { events }
  }
}