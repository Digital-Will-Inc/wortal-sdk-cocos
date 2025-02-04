package com.cocos.game;

import android.util.Log;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

public class AdsHelper {

    private static AppActivity getAppActivity(){
        return AppActivity.getInstance();
    }
    private static final String TAG = "WortalSDK";
    private static UmpHelper umpHelper;

    public static void initialize() {
        try {
            Log.i(TAG, "Initializing WortalSDK...");

            // Fetching values from AndroidManifest.xml
            String sdkKey = getMetaDataValue("wortalads.sdk.key");
            String interstitialAdId = getMetaDataValue("wortalads.interstitial.ad.id");
            String rewardedAdId = getMetaDataValue("wortalads.rewarded.ad.id");

            Log.i(TAG, "DK Key: " + sdkKey);
            Log.i(TAG, "Interstitial Ad ID: " + interstitialAdId);
            Log.i(TAG, "Rewarded Ad ID: " + rewardedAdId);

            umpHelper = new UmpHelper(getAppActivity());
            umpHelper.initializeConsent();

            // Initialize ads in AppActivity
            getAppActivity().initializeAds(sdkKey, interstitialAdId, rewardedAdId);
        } catch (Exception e) {
            Log.e(TAG, "Failed to initialize AdsHelper: " + e.getMessage());
        }
    }

    public  static void showInterstitialAd(){
        Log.d("AppLovinBridge", "Showing interstitial ad");
        final AppActivity activity = getAppActivity();
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                activity.showInterstitialAd();
            }
        });
    }

    public static void showRewardedAd(){
        Log.d("AppLovinBridge", "Showing rewarded ad");
        final AppActivity activity = getAppActivity();
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                activity.showRewardedAd();
            }
        });
    }

    public static boolean isInterstitialReady(){
        return getAppActivity().isInterstitialAdReady();
    }

    public static boolean isRewardedAdReady(){
        return getAppActivity().isRewardedAdReady();
    }
}