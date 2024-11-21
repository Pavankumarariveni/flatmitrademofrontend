import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tailwindStyles from '../utils/tailwindStyles';

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const listingsLength = 1;
    const showMyListings = listingsLength !== 0;
    const listingStyle = showMyListings ? 'text-white' : 'text-gray-400';
    const pointerType = showMyListings ? '' : 'none';


    // State to handle mobile/tablet menu toggle
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand logo */}
                <Link to="/user" className="text-lg font-bold">
                    QTI Property
                </Link>
                
                {/* Mobile/Tablet Menu Toggle */}
                <button
                    className="sm:hidden md:hidden text-2xl focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    &#9776;
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 items-center ">
                    {path === '/user' && (
                        <div>
                            <input
                                type="text"
                                className="form-control border border-gray-300 rounded-md px-2 py-1"
                                placeholder="Search" // Search input for searching property listings
                            />
                        </div>
                    )}
                    {path == '/postProperties' ? (<Link to="/postProperties">
                        <button className={ `${tailwindStyles.activeTab} rounded-md font-semibold text-sm`}>
                            Post Properties
                        </button>
                    </Link>) : (<Link to="/postProperties">
                        <button className="bg-white text-gray-900  px-4 py-2 rounded-md font-semibold text-sm">
                            Post Properties
                        </button>
                    </Link>)}
                    {path == '/mylistings' ? (<Link
                        to="/mylistings"
                        style={{ pointerEvents: `${pointerType}` }}
                        className={`${tailwindStyles.activeTab} font-semibold text-sm ${listingStyle}`}
                    >
                        My Listings
                    </Link>) : (<Link
                        to="/mylistings"
                        style={{ pointerEvents: `${pointerType}` }}
                        className={`font-semibold text-sm ${listingStyle}`}
                    >
                        My Listings
                    </Link>)}
                    
                    
                    {path == '/favorites' ? (
                        <Link to="/favorites" className={`${tailwindStyles.activeTab} font-semibold text-sm`}>
                        My Favourites
                    </Link>
                    ) : (<Link to="/favorites" className={`font-semibold text-sm`}>
                        My Favourites
                    </Link>)}
                    
                    {path == '/recentlyViewed' ? (<Link to="/recentlyViewed" className={`${tailwindStyles.activeTab} font-semibold text-sm`}>
                        Recently Viewed
                    </Link>) : (<Link to="/recentlyViewed" className={`font-semibold text-sm`}>
                        Recently Viewed
                    </Link>)}
                    {path == '/notifications' ? (<Link to="/notifications" className={`${tailwindStyles.activeTab} text-sm`}>
                        &#128276; {/* Bell icon */}
                    </Link>) : (<Link to="/notifications" className="text-2xl">
                        &#128276; {/* Bell icon */}
                    </Link>) } 
                    {path == '/profile' ? (<Link to="/profile" className={`${tailwindStyles.activeTab} text-sm`}>
                        &#128100; {/* User icon */}
                    </Link>) : (<Link to="/profile" className="text-2xl">
                        &#128100; {/* User icon */}
                    </Link>)}
                    
                </nav>
            </div>

            {/* Mobile/Tablet Nav */}
            {isMenuOpen && (
                <div className="md:hidden sm:hidden mt-4 space-y-4">
                    {path === '/user' && (
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            placeholder="Search"
                        />
                    )}
                    <Link to="/postProperties" className="block text-center">
                        <button className="bg-white text-gray-900 px-3 py-2 rounded-md font-semibold text-sm w-full hover:bg-gray-200">
                            Post Properties
                        </button>
                    </Link>
                    <Link
                        to="/mylistings"
                        style={{ pointerEvents: `${pointerType}` }}
                        className={`block text-center font-semibold text-sm ${listingStyle}`}
                    >
                        My Listings
                    </Link>
                    <Link to="/favorites" className="block text-center font-semibold text-sm">
                        My Favourites
                    </Link>
                    <Link to="/recentlyViewed" className="block text-center font-semibold text-sm">
                        Recently Viewed
                    </Link>
                    <Link to="/notifications" className="block text-center text-2xl">
                        &#128276; {/* Bell icon */}
                    </Link>
                    <Link to="/profile" className="block text-center text-2xl">
                        &#128100; {/* User icon */}
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
