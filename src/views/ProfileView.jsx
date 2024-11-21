import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import tailwindStyles from '../utils/tailwindStyles'

import Navbar from "./Navbar"

const ProfileView = () => {
    const back = useNavigate()
    const onclickLogout = () => {
        back('/')
    }

    return (
        <>
            <Navbar/>
            <div style={{display: 'flex',flexDirection: 'column',alignItems:'center',  height:'80vh',}} className='mt-20'>
                <div style={{padding: '20px'}}>
                    Profile Con
                </div>
                <button onClick={onclickLogout} style={{padding: '6px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold'}} href="#" className={`${tailwindStyles.thirdButton}`}>Logout</button>
            </div>
        </>
    )
} 
export default ProfileView