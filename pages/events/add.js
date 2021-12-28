import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Form.module.css"
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/index";

export default function EventAdd() {
    const router = useRouter()
    const [values, setValues] = useState({
            name: '',
            performers: '',
            venue: '',
            address: '',
            date: '',
            time: '',
            description: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {date, ...rest} = values;
        const formattedValues = {data:{
            ...rest, time: new Date(date)
        }}
        const hasEmptyFields = Object.values(values).some(
            (element) => element === ''
        )

        if(hasEmptyFields){
            toast.error('Please fill all the fields',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
        }

        const res = await fetch(`${API_URL}/api/events`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedValues)
        })
        if(!res.ok){
            toast.error('Something went wrong. Please try again')
        }
        else{
            const evt = await res.json()
            router.push(`/events/${evt.data.id}`)
        }
    }
    
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }
    
    return (
        <Layout title='Add New Event'>
            <Link href='/events'>Go back</Link>
            <h1>Add Events</h1>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}
            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLossdraggable pauseOnHover
            />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                <div>
                    <label htmlFor='name'>Event Name</label>
                    <input
                    type='text'
                    id='name'
                    name='name'
                    value={values.name}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='performers'>Performers</label>
                    <input
                    type='text'
                    name='performers'
                    id='performers'
                    value={values.performers}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='venue'>Venue</label>
                    <input
                    type='text'
                    name='venue'
                    id='venue'
                    value={values.venue}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input
                    type='text'
                    name='address'
                    id='address'
                    value={values.address}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='date'>Date</label>
                    <input
                    type='date'
                    name='date'
                    id='date'
                    value={values.date}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='time'>Time</label>
                    <input
                    type='text'
                    name='time'
                    id='time'
                    value={values.time}
                    onChange={handleInputChange}
                    />
                </div>
                </div>

                <div>
                <label htmlFor='description'>Event Description</label>
                <textarea
                    type='text'
                    name='description'
                    id='description'
                    value={values.description}
                    onChange={handleInputChange}
                ></textarea>
                </div>

                <input type='submit' value='Add Event' className='btn' />
            </form>

        </Layout>
    )
}
