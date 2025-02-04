/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package com.cocos.game;

import android.os.Bundle;
import android.content.Intent;
import android.content.res.Configuration;
import android.util.Log;

import com.applovin.mediation.MaxAd;
import com.applovin.mediation.MaxAdListener;
import com.applovin.mediation.MaxError;
import com.applovin.mediation.MaxReward;
import com.applovin.mediation.MaxRewardedAdListener;
import com.applovin.mediation.ads.MaxInterstitialAd;
import com.applovin.mediation.ads.MaxRewardedAd;
import com.applovin.sdk.AppLovinMediationProvider;
import com.applovin.sdk.AppLovinSdkConfiguration;
import com.applovin.sdk.AppLovinSdkInitializationConfiguration;
import com.cocos.service.SDKWrapper;
import com.cocos.game.AdsHelper;
import com.cocos.lib.CocosActivity;
import com.applovin.sdk.AppLovinSdk;

public class AppActivity extends CocosActivity {
    private static AppActivity instance;
    private MaxInterstitialAd interstitialAd;
    private MaxRewardedAd rewardedAd;

    public static AppActivity getInstance(){
        return  instance;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;
        SDKWrapper.shared().init(this);
        AdsHelper.initialize();
    }

    public void initializeAds(String sdkKey, String interstitialId, String rewardedId) {
        AppLovinSdkInitializationConfiguration initConfig = AppLovinSdkInitializationConfiguration.builder(sdkKey, this)
                .setMediationProvider(AppLovinMediationProvider.MAX)
                .build();

        AppLovinSdk.getInstance(this).initialize(initConfig, appLovinSdkConfiguration -> {
            Log.d("WortalAds", "SDK Initialized: " + appLovinSdkConfiguration);

            interstitialAd = new MaxInterstitialAd(interstitialId, this);
            rewardedAd = MaxRewardedAd.getInstance(rewardedId, this);

            interstitialAd.setListener(new MaxAdListener() {
                @Override
                public void onAdLoaded(MaxAd maxAd) {
                    Log.d("WortalAds", "Interstitial ad loaded");
                }

                @Override
                public void onAdDisplayed(MaxAd maxAd) {}

                @Override
                public void onAdHidden(MaxAd maxAd) {
                    interstitialAd.loadAd();
                }

                @Override
                public void onAdClicked(MaxAd maxAd) {}

                @Override
                public void onAdLoadFailed(String s, MaxError maxError) {
                    Log.e("WortalAds", "Interstitial failed to load: " + maxError.getMessage());
                    interstitialAd.loadAd();
                }

                @Override
                public void onAdDisplayFailed(MaxAd maxAd, MaxError maxError) {}
            });

            rewardedAd.setListener(new MaxRewardedAdListener() {
                @Override
                public void onUserRewarded(MaxAd maxAd, MaxReward maxReward) {
                    Log.d("WortalAds", "User rewarded: " + maxReward.getAmount() + " " + maxReward.getLabel());
                }

                @Override
                public void onAdLoaded(MaxAd maxAd) {
                    Log.d("WortalAds", "Rewarded ad loaded");
                }

                @Override
                public void onAdDisplayed(MaxAd maxAd) {}

                @Override
                public void onAdHidden(MaxAd maxAd) {
                    rewardedAd.loadAd();
                }

                @Override
                public void onAdClicked(MaxAd maxAd) {}

                @Override
                public void onAdLoadFailed(String s, MaxError maxError) {
                    Log.e("WortalAds", "Rewarded ad failed to load: " + maxError.getMessage());
                    rewardedAd.loadAd();
                }

                @Override
                public void onAdDisplayFailed(MaxAd maxAd, MaxError maxError) {}
            });

            interstitialAd.loadAd();
            rewardedAd.loadAd();
        });
    }

    public boolean isInterstitialAdReady(){
        return interstitialAd != null && interstitialAd.isReady();
    }

    public boolean isRewardedAdReady(){
        return rewardedAd != null && rewardedAd.isReady();
    }

    public void showInterstitialAd(){
        if(isInterstitialAdReady()){
            interstitialAd.showAd(this);
        }
    }

    public void showRewardedAd(){
        if(isRewardedAdReady()){
            rewardedAd.showAd(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.shared().onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.shared().onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }
        SDKWrapper.shared().onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.shared().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.shared().onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.shared().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.shared().onStop();
    }

    @Override
    public void onBackPressed() {
        SDKWrapper.shared().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.shared().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.shared().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.shared().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.shared().onStart();
        super.onStart();
    }

    @Override
    public void onLowMemory() {
        SDKWrapper.shared().onLowMemory();
        super.onLowMemory();
    }
}
