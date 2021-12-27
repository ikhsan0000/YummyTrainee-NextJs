import EventItem from '@/components/EventItem';
import Layout from '@/components/layout'
import { API_URL } from '@/config/index'

export default function EventList({events}) {
  return (

    <Layout>
      <h1>Dj Events</h1>
      {events.length === 0 && <h3>it's lonely here, there's currently no events</h3>}
      {events && events.data.map( (e) => (
        <EventItem key={e.id} evt={e}/>
      ))}
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