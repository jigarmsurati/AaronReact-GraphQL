import React, { useState, useEffect } from 'react';
import { MedicationDetails } from '../components/medication-details';
import { PageLayout } from '../components/page-layout';
import { useMedication, useUser } from '../mock-data';

import { useFlags } from 'launchdarkly-react-client-sdk';
import { launchBannerFlagKey, profileSectionFlagKey, detailsCtaFlagKey } from '../feature-flag-config';

export const DashboardScreen = () => {
  const user = useUser();
  const medication = useMedication();

  const flags: any = useFlags();

  const [launchBannerDisplay, setLaunchBannerDisplay] = useState<boolean>(true);
  const [profileSectionDisplay, setProfileSectionDisplay] = useState<string>('variation');
  const [detailsCtaFlagDisplay, setDetailsCtaFlagDisplay] = useState<string>('blue');

  useEffect(() => {
    setLaunchBannerDisplay(flags[launchBannerFlagKey]);
    setProfileSectionDisplay(flags[profileSectionFlagKey]);
    setDetailsCtaFlagDisplay(flags[detailsCtaFlagKey]);
  }, [flags]);
  
  return (
    <PageLayout
      className="dashboard"
      isDisplayBanner={launchBannerDisplay}
    >
      <h1>Dashboard</h1>
      <div className="dashboard-details">
        <h3>Your information</h3>
        <ul>
          <li>Name: {user.name}</li>
          <li>Age: {user.age}</li>
          <li>Country: {user.country}</li>
        </ul>
      </div>
      <div className="dashboard-details">
        <h3>Your medication</h3>
        <ul>
          <li>Medication: {medication.name}</li>
          <li>Repeats left: {medication.repeatsLeft}</li>
          <li>Instructions: {medication.instructions}</li>
        </ul>
        <MedicationDetails 
          isDisplayProfileSection={profileSectionDisplay}
          isDetailsCta={detailsCtaFlagDisplay}
        />
      </div>
    </PageLayout>
  );
}
