import React from 'react';
import { useHistory } from 'react-router-dom';
import { DASHBOARD } from '../utils/routes';
import { logout } from '../utils';

// Problem: 
//     This should be coloured based on FF value
// Feature flag name: 
//     details-section-cta-colour
// Setup: 
//     Fill background color with flag value.
export const RequestReviewButton = ({ isDetailsCta }: { isDetailsCta: string }) => {
  const history = useHistory();

  const handleLogout = () => {
    logout(); // Remove value from local storage
    history.push(DASHBOARD);
  }

  return (
    <>
      <button style={{ backgroundColor: isDetailsCta, marginBottom: '10px' }}>Request doctor review</button>
      <button onClick={() => handleLogout()}>Logout</button>
    </>
  );
}
