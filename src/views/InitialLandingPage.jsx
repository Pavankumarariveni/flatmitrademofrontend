import { Link } from 'react-router-dom';
import { useState } from 'react';
import CarouselController from '../controllers/carouselImageController';
import './InitialLandingPage.css'
import AuthModal from './AuthModalView';
import tailwindStyles from '../utils/tailwindStyles';
import HeroSection from './InitialHeroView';

const InitialLandingPage = () => { 
    function toggleMenu() {
        document.getElementById("mobile-menu").classList.toggle("hidden");
    }
    // Modal controls
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return(
    <>
    <header className={`${tailwindStyles.header} p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-md`} >
        <div className="text-xl font-bold">QTI Property</div>

        {/* <!-- Desktop Menu --> */}
        <nav className="hidden md:flex space-x-4 flex items-center">
            <a href="#home" className="hover:text-gray-400">Home</a>
            <a href="#about" className="hover:text-gray-400">About Us</a>
            <a href="#why-choose-us" className="hover:text-gray-400">Why Choose Us</a>
            {/* <a onClick={openModal} className="hover:text-gray-400">Login</a> */}
            
            
        </nav>

        {/* <!-- Hamburger Icon for Mobile --> */}
        <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        {/* <!-- Buttons for both desktop and mobile --> */}
        <div className="hidden md:flex space-x-1">
            <Link  to="/user">
                <a className={`${tailwindStyles.secondaryButton}`}>View Property</a>
            </Link>
            <Link to='/postProperties'>
            <a className={`${tailwindStyles.secondaryButton}`}>Post Property</a>
            </Link>
            <button
                onClick={openModal}
                className={`${tailwindStyles.secondaryButton}`}
                >
                Login
            </button>
        </div>
    </header>
    {/* <!-- Mobile Menu --> */}
    <div id="mobile-menu" className="fixed top-0 left-0 w-full hidden md:hidden bg-gray-800 text-white p-4 space-y-4 mt-16 z-50" >
        <a href="#home" className="block hover:text-gray-400">Home</a>
        <a href="#about" className="block hover:text-gray-400">About Us</a>
        <a href="#why-choose-us" className="block hover:text-gray-400">Why Choose Us</a>
        
        <button
                onClick={openModal}
                className={`${tailwindStyles.secondaryButton}`}
                >
                Login
        </button>
        <div className="space-y-2">
            <Link to="/user">
                <a href="#see-property" className={`${tailwindStyles.secondaryButton} block`}>View Property</a>
            </Link>
            <Link to='/postProperties'>
                <a href="#list-property" className={`${tailwindStyles.secondaryButton} block`}>Post Property</a>
            </Link>
           
        </div>
    </div>
    <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    {/* Hero Search Section*/}
    <HeroSection/>
    {/* <!-- About Us Section --> */}
    <div className='pt-16' id="about">
        <section   className="py-16 px-8 bg-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
                <img src="https://www.modiproperties.com/images/projects/1620391618_C1%20FRONT%20REV.jpg" alt="Owner Image" className="w-full md:w-1/2 h-auto rounded-lg shadow-lg"/>
                <div>
                    <h2 className={`${tailwindStyles.heading} text-3xl font-bold mb-4`}>About Us</h2>
                    <p  className={`${tailwindStyles.paragraph} text-lg`}>At QTI Property, we specialize in connecting property owners with renters in need of a place to call home. Our platform offers a streamlined listing process, effective property promotion, and a network of clients to help your properties stand out.</p>
                </div>
            </div>
        </section>
    </div>
    

    {/* <!-- Why Choose Us Section --> */}
    <div id="why-choose-us" className='pt-16'>
        <section  className="py-8 px-8 bg-gray-50">
            <h2 className={`${tailwindStyles.heading} text-center text-3xl font-bold mb-8`}>Why Choose Us</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/10635/10635046.png" alt="Icon 1" className="w-16 h-16 mx-auto mb-4"/>
                    <h3 className={`${tailwindStyles.heading} text-xl font-semibold`}>Reliable Listings</h3>
                    <p className={`${tailwindStyles.paragraph}`}>Verified property listings for trustworthy rental experiences.</p>
                </div>
                <div className="text-center">
                    <img src="https://www.dojonetworks.com/hubfs/Imported_Blog_Media/dojo-internet_wifibuilding-600x317-1.png" alt="Icon 2" className="w-16 h-16 mx-auto mb-4"/>
                    <h3 className={`${tailwindStyles.heading} text-xl font-semibold`}>Wide Network</h3>
                    <p className={`${tailwindStyles.paragraph}`}>Extensive network to connect you with potential renters quickly.</p>
                </div>
                <div className="text-center">
                    <img src="https://magenticians.com/wp-content/uploads/Provide-Slow-Support.jpg" alt="Icon 3" className="w-16 h-16 mx-auto mb-4"/>
                    <h3 className={`${tailwindStyles.heading} text-xl font-semibold`}>Quality Support</h3>
                    <p className={`${tailwindStyles.paragraph}`}>24/7 customer support for all your rental service needs.</p>
                </div>
            </div>
        </section>
    </div>

    {/* <!-- Testimonials Section --> */}
    <section id="testimonials" className="py-16 px-8 bg-white">
        <h2 className={`${tailwindStyles.heading} text-center text-3xl font-bold mb-8`}>Testimonials</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <p className={`${tailwindStyles.paragraph} italic`}>"QTI Property helped me find the perfect rental in no time. Highly recommend!"</p>
                <div className="flex items-center justify-center mt-4">
                    <img src="https://www.mydinosaurs.com/wp-content/uploads/2018/07/testimonial-user-1.jpg" alt="User 1" className="w-12 h-12 rounded-full mr-2"/>
                    <p className={`${tailwindStyles.paragraph}`} >John Doe</p>
                </div>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <p className="italic">"Professional and efficient services. I couldn't be happier with my experience."</p>
                <div className="flex items-center justify-center mt-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcH-1O1vJrO7JES9PymGvX2EBW942VbepT8u_KIg9_D4zpyRobQ9O-JYvCy5HjBzfz5xQ&usqp=CAU" alt="User 2" className="w-12 h-12 rounded-full mr-2"/>
                    <p>Janie Smith</p>
                </div>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <p className="italic">"The best rental service provider! Made my property listing easy and stress-free."</p>
                <div className="flex items-center justify-center mt-4">
                    <img src="https://images.squarespace-cdn.com/content/v1/5eadd788d91ce47af1ba2e5a/d8a682fc-b2ef-4c09-96b6-6d40127296f7/Testimonial+1.jpg" alt="User 3" className="w-12 h-12 rounded-full mr-2"/>
                    <p>Sam Wilson</p>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Footer Section --> */}
    <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h3 className="text-xl font-semibold">Use Cases</h3>
                <ul className="mt-4 space-y-2">
                    <li><a href="#" className="hover:text-gray-400">Property Listings</a></li>
                    <li><a href="#" className="hover:text-gray-400">Rental Management</a></li>
                    <li><a href="#" className="hover:text-gray-400">Tenant Screening</a></li>
                    <li><a href="#" className="hover:text-gray-400">Consulting</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold">Explore</h3>
                <ul className="mt-4 space-y-2">
                    <li><a href="#" className="hover:text-gray-400">Property Types</a></li>
                    <li><a href="#" className="hover:text-gray-400">Support</a></li>
                    <li><a href="#" className="hover:text-gray-400">Resources</a></li>
                    <li><a href="#" className="hover:text-gray-400">Blog</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold">Resources</h3>
                <ul className="mt-4 space-y-2">
                    <li><a href="#" className="hover:text-gray-400">FAQs</a></li>
                    <li><a href="#" className="hover:text-gray-400">Best Practices</a></li>
                    <li><a href="#" className="hover:text-gray-400">Property Tips</a></li>
                    <li><a href="#" className="hover:text-gray-400">Customer Support</a></li>
                </ul>
            </div>
        </div>
        <div className="mt-8 text-center space-x-4">
            <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/768px-Facebook_Logo_2023.png" alt="Facebook" className="inline-block w-6 rounded-full mb-3"/></a>
            <a href="#"><img src="https://png.pngtree.com/png-clipart/20190613/original/pngtree-instagram-logo-icon-png-image_3588821.jpg" alt="Instagram" className="inline-block w-6 rounded-full mb-3"/></a>
            <a href="#"><img src="https://image.similarpng.com/thumbnail/2020/06/Premium-logo-Twitter-transparent-PNG.png" alt="Twitter" className="inline-block w-6 rounded-full mb-3"/></a>
            <a href="#"><img src="https://cdn.worldvectorlogo.com/logos/linkedin-icon.svg" alt="LinkedIn" className="inline-block w-6 rounded-full mb-3"/></a>
        </div>
    </footer>
    </>
)}

export default InitialLandingPage