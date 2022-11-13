import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ActivityDetails from './components/ActivityDetails';
import ActivityList from './components/ActivityList';

import AccountPage from './pages/AccountPage';
import ActivityDetailsPage from './pages/ActivityDetailsPage';
import ActivityPage from './pages/ActivityPage';
import AllActivitiesPage from './pages/AllActivitiesPage';
import AllParticipantsPage from './pages/AllParticipantsPage';

import Homepage from './pages/Homepage';

function Home() {
 

  return (
<>
   
        <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/account/:id" element={<AccountPage />} />
            <Route exact path="/add-activity" element={<ActivityPage />} />
            <Route exact path="/all-activities" element={<AllActivitiesPage />} />
            <Route exact path="/all-participants" element={<AllParticipantsPage />} />
            <Route exact path="/activity/:id" element={<ActivityDetailsPage />} />
            <Route exact path="/activity/list/:id" element={<ActivityList/>} />
        </Routes>
        
     
  
</>
   

  );
}

export default Home;

if (document.getElementById('root')) {
    const rootElement = document.getElementById("root");
    const root = createRoot(rootElement);
  
    root.render(
        <StrictMode>
          <Router>
            <Home />
            </Router>
        </StrictMode>
    );
}