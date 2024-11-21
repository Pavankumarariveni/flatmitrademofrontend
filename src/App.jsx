// App.js
import React from 'react';
import { Routes,Route} from 'react-router-dom';

import FullDetailCard from './views/FullDetailCard';
import InitialLandingPage from './views/InitialLandingPage';
import FavoritesPage from './views/FavoritesPageView';
import PostPropertiesView from './views/PostPropertiesView';
import NotificationsView from './views/NotificationsView';
import UserLandingView from './views/UserLandingView';
import RecentlyViewedView from './views/RecentlyViewedView';
import MyListingsView from './views/MyListingsView';

import './App.css'

import ProfileView from './views/ProfileView';
import NotfoundView from './views/NotfoundView';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<InitialLandingPage/>}/>
      <Route path='/user' element={<UserLandingView/>}/>
      <Route path='/fdc/:propertyId' element={<FullDetailCard/>} />
      <Route path='/mylistings' element={<MyListingsView/>}/>
      <Route path='/favorites' element={<FavoritesPage/>} />
      <Route path='/postProperties' element={<PostPropertiesView/>} />
      <Route path='/recentlyViewed' element={<RecentlyViewedView/>}/>
      <Route path='/profile' element={<ProfileView/>} />
      <Route path='/notifications' element={<NotificationsView/>} />
      <Route path='*' element={<NotfoundView/>}/>
    </Routes>
  );
};

export default App;
