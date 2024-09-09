import { useMsal } from "@azure/msal-react";
import React from "react";

const LogoutButton = () => {
  const { instance, inProgress } = useMsal(); // Track the MSAL process status

  const handleLogout = async () => {
    if (inProgress === 'none') { // Ensure no process is ongoing before logout
      try {
        await instance.logoutRedirect();  // Use logoutRedirect instead of logoutPopup
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else {
      console.log('A process is already in progress');
    }
  };

  return (
  <button onClick={handleLogout} disabled={inProgress !== 'none'}>
    Logout
  </button>
);
};

export default LogoutButton;
