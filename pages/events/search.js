import EventItem from '@/components/EventItem';
import Layout from '@/components/layout'
import { API_URL } from '@/config/index'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchEvents({events}) {
    const router = useRouter()

  return (

    <Layout title='Search Results'>
        <Link href='/events'>Go back</Link>
        <p>Search Results for <strong>{router.query.term}</strong> :</p>
        {events.length === 0 && <h3>it's lonely here, there's currently no events</h3>}
        {events && events.data.map( (e) => (
        <EventItem key={e.id} evt={e}/>
        ))}
    </Layout>
  )
}


export async function getServerSideProps({ query: {term} }) {
    const urlFilterName = `&filters[$or][0][name][$containsi]=${term}`;
    const urlFilterDescription = `&filters[$or][1][description][$containsi]=${term}`
    const urlFilterPerformers = `&filters[$or][2][performers][$containsi]=${term}`
    const fullFilter = urlFilterName + urlFilterDescription + urlFilterPerformers

    const res = await fetch(`${API_URL}/api/events?populate=*` + fullFilter)
    const events = await res.json()
    return {
        props: { events }
    }
}