package com.cocos.game;

import android.app.Activity;
import com.applovin.sdk.AppLovinPrivacySettings;
import com.google.android.ump.ConsentDebugSettings;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.FormError;
import com.google.android.ump.UserMessagingPlatform;
public class UmpHelper {
    private ConsentInformation consentInformation;
    private Activity activity;

    public UmpHelper(Activity activity) {
        this.activity = activity;
    }

    public void initializeConsent() {
        ConsentRequestParameters params = new ConsentRequestParameters.Builder()
                .setTagForUnderAgeOfConsent(false) // Set based on your app's requirements
                .setConsentDebugSettings(
                        new ConsentDebugSettings.Builder(activity)
                                .setDebugGeography(ConsentDebugSettings.DebugGeography.DEBUG_GEOGRAPHY_EEA) // Simulate GDPR region
                                .build()
                )
                .build();

        consentInformation = UserMessagingPlatform.getConsentInformation(activity);

        // Request consent information update
        consentInformation.requestConsentInfoUpdate(
                activity,
                params,
                () -> {
                    // Called when consent information is successfully updated
                    if (consentInformation.isConsentFormAvailable()) {
                        loadConsentForm();
                    }
                },
                requestConsentError -> {
                    // Called when there's an error updating consent information
                    if (requestConsentError != null) {
                        System.out.println("Consent info update failed: " + requestConsentError.getMessage());
                    }
                }
        );
    }


    private void loadConsentForm() {
        UserMessagingPlatform.loadConsentForm(activity, consentForm -> {
            if (consentInformation.getConsentStatus() == ConsentInformation.ConsentStatus.REQUIRED) {
                consentForm.show(activity, formError -> {
                    // Handle the user interaction or error
                    sendConsentToAppLovin();
                });
            } else {
                sendConsentToAppLovin();
            }
        }, formError -> {
            // Handle error loading the consent form
            System.out.println("Failed to load consent form: " + formError.getMessage());
        });
    }

    private void sendConsentToAppLovin() {
        boolean hasConsent = consentInformation.getConsentStatus() == ConsentInformation.ConsentStatus.OBTAINED;
        AppLovinPrivacySettings.setHasUserConsent(hasConsent, activity.getApplicationContext());
    }
}
