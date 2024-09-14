import React, { useState } from 'react';
import { useMsal, useAccount } from "@azure/msal-react";


const AuthTestButton = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0]);
  const [data, setData] = useState(null);

  const handleButtonClick = async () => {
    if (!account) {
      console.error('No active account! Verify a user has been signed in.');
      return;
    }

    try {
      const response = await instance.acquireTokenSilent({
        scopes: ["https://ahsuspensequery.onmicrosoft.com/1c4ab0a2-4f93-4dbe-b017-1d8924a25887/Api.ReadWrite.All"],
        account: account
      });

      const token = response.accessToken;
      console.log('Token acquired:', token);

      const fetchResponse = await fetch('http://127.0.0.1:8000/auth_test/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await fetchResponse.json();
      console.log('Data fetched:', result);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Authentication Test</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default AuthTestButton;