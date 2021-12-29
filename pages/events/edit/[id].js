import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Form.module.css"
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/index";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

export default function EditAdd({ evt }) {
    const router = useRouter()
    const [values, setValues] = useState({
            name: evt.data.attributes.name,
            performers: evt.data.attributes.performers,
            venue: evt.data.attributes.venue,
            address: evt.data.attributes.address,
            date: evt.data.attributes.date,
            time: evt.data.attributes.time,
            description: evt.data.attributes.description
    })

    const [imagePreview, setImagePreview] = useState(
        evt.data.attributes.image.data ?
        API_URL+evt.data.attributes.image.data.attributes.formats.thumbnail.url :
        null
    );

    const [showModal, setShowModal] = useState(false);

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

        const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
            method: 'PUT',
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

    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/api/events/${evt.data.id}?populate=*`)
        const data = await res.json()
        console.log(data)
    }
    
    return (
        <Layout title='Add New Event'>
            <Link href='/events'>Go back</Link>
            <h1>Edit Events</h1>
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
                    value={moment(values.date).format('yyyy-MM-DD')}
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

                <input type='submit' value='Edit Event' className='btn' />
            </form>

            <h2>Event Image</h2>
            <br></br>
            {   imagePreview ? 
                (<Image src={imagePreview} height={100} width={170}/>) :
                (<p>No image uploaded</p>)
            }

            <div>
                <button className="btn-secondary" onClick={(() => setShowModal(true))}>
                    <FaImage /> Set Image
                </button>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.data.id} imageUploaded={imageUploaded} />
            </Modal>

        </Layout>
    )
}

export async function getServerSideProps({ params: {id}})
{
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`, {
        method: 'GET',
    })
    const evt = await res.json()
    return {props: { evt }}
}