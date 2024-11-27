// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import FullDetailCard from "./views/FullDetailCard";
import InitialLandingPage from "./views/InitialLandingPage";
import FavoritesPage from "./views/FavoritesPageView";
import PostPropertiesView from "./views/PostPropertiesView";
import NotificationsView from "./views/NotificationsView";
import UserLandingView from "./views/UserLandingView";
import RecentlyViewedView from "./views/RecentlyViewedView";
import MyListingsView from "./views/MyListingsView";
import ProtectedRoute from "./controllers/ProtectedRotes";

import "./App.css";

import ProfileView from "./views/ProfileView";
import NotfoundView from "./views/NotfoundView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<InitialLandingPage />} />
      <Route path="/user" element={<UserLandingView />} />
      <Route path="/fdc/:propertyId" element={<FullDetailCard />} />
      <Route
        path="/mylistings"
        element={
          <ProtectedRoute>
            <MyListingsView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/postProperties"
        element={
          <ProtectedRoute>
            <PostPropertiesView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recentlyViewed"
        element={
          <ProtectedRoute>
            <RecentlyViewedView />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<ProfileView />} />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsView />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotfoundView />} />
    </Routes>
  );
};

export default App;
