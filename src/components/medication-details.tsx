import React from 'react';
import { useMedication } from '../mock-data';
import { RequestReviewButton } from './request-review-button';

// Problem: 
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name: 
//     profile-render-details-section
// Setup: 
//     Show to users with flag value 'variation'
export const MedicationDetails = ({ isDisplayProfileSection, isDetailsCta }: { isDisplayProfileSection: string, isDetailsCta: string }) => {
  const medication = useMedication();

  return (
    <div>
      {isDisplayProfileSection === 'variation' && (
        <>
          <ul>
            <li>Common side effects: {medication.sideEffects}</li>
            <li>Warning signs: {medication.warnings}</li>
          </ul>
          <p>Experiencing any of these? Please contact your doctor</p>
        </>
      )}
      <RequestReviewButton 
        isDetailsCta={isDetailsCta}
      />
    </div>
  )
}