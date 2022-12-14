import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ActivityDetails from './components/ActivityDetails';
import ActivityList from './components/ActivityList';
import ParticipantDetails from './components/ParticipantDetails';
import ParticipantModificationForm from './components/ParticipantModificationForm';
import ActivityModificationForm from './components/ActivityModificationForm';

import AccountPage from './pages/AccountPage';

import ActivityPage from './pages/ActivityPage';
import AllActivitiesPage from './pages/AllActivitiesPage';
import AllParticipantsPage from './pages/AllParticipantsPage';
import NotFound from './components/NotFound';



function Home() {
 

  return (
<>
   
        <Routes>
            <Route exact path="/account" element={<AccountPage />} />
            <Route exact path="/add-activity" element={<ActivityPage />} />
            <Route exact path="/all-activities" element={<AllActivitiesPage />} />
            <Route exact path="/all-participants" element={<AllParticipantsPage />} />
            <Route exact path="/activity/list/:id" element={<ActivityList/>} />
            <Route exact path="/activity-details/:id" element={<ActivityDetails/>} />
            <Route exact path="/participant-modification-form/:id" element={<ParticipantModificationForm/>} />
            <Route exact path="/activity-modification-form/:id" element={<ActivityModificationForm/>} />
            <Route exact path="/participant-details/:id" element={<ParticipantDetails/>} />
            <Route path="*" element={<NotFound />} />
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