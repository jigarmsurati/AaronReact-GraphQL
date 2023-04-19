import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { PageLayout } from '../components/page-layout';
import { launchBannerFlagKey } from '../feature-flag-config';
import { DASHBOARD } from '../utils/routes';
import { login } from '../utils';

export const LoginScreen = () => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const flags: any = useFlags();

  const [launchBannerDisplay, setLaunchBannerDisplay] = useState<boolean>(false);

  useEffect(() => {
    setLaunchBannerDisplay(flags[launchBannerFlagKey]);
  }, [flags]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      login(); // Set user logged-in value in local storage
      history.push(DASHBOARD)
    }
  }

  return (
    <PageLayout 
      className="login"
      isDisplayBanner={launchBannerDisplay}
    >
      <h1>Welcome back 👋</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username</label>
        <input 
          id="username"
          type="text" 
          name="username"
          value={username} 
          onChange={event => setUsername(event.target.value)} 
        />
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          name="password"
          value={password} 
          onChange={event => setPassword(event.target.value)} 
        />
        <button type="submit">Log in</button>
      </form>
    </PageLayout>
  );
}