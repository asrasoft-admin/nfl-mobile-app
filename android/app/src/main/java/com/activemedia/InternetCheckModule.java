package com.activemedia;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.activemedia.MainApplication;
import com.facebook.react.bridge.Promise;

public class InternetCheckModule extends ReactContextBaseJavaModule {

    private static final String TAG = "InternetCheckModule";
    private ReactApplicationContext reactContext;
    private ConnectivityReceiver connectivityReceiver;

    public InternetCheckModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.connectivityReceiver = new ConnectivityReceiver();
        registerReceiver();
    }

    @Override
    public String getName() {
        return "InternetCheckModule";
    }

    @ReactMethod
    public void checkInternetConnection(Promise promise) {
        boolean isConnected = ConnectivityReceiver.isConnected();
        Log.d(TAG, "Internet connection status: " + isConnected);
        promise.resolve(isConnected);
        // Emit an event or send a callback to React Native with the connection status
        // For simplicity, let's just log it for now
    }

    private void registerReceiver() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
        reactContext.registerReceiver(connectivityReceiver, filter);
    }

    private void unregisterReceiver() {
        try {
            reactContext.unregisterReceiver(connectivityReceiver);
        } catch (IllegalArgumentException e) {
            // Receiver not registered, ignore
        }
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        unregisterReceiver();
    }

    private static class ConnectivityReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            boolean isConnected = isConnected();
            Log.d(TAG, "ConnectivityReceiver - Internet connection status: " + isConnected);
            // Emit an event or send a callback to React Native with the connection status
            // For simplicity, let's just log it for now
        }

        static boolean isConnected() {
            ConnectivityManager connectivityManager =
                    (ConnectivityManager) MainApplication.getInstance().getSystemService(Context.CONNECTIVITY_SERVICE);
            if (connectivityManager != null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    NetworkInfo activeNetwork = connectivityManager.getActiveNetworkInfo();
                    return activeNetwork != null && activeNetwork.isConnected();
                } else {
                    NetworkInfo activeNetwork = connectivityManager.getActiveNetworkInfo();
                    return activeNetwork != null && activeNetwork.isConnectedOrConnecting();
                }
            }
            return false;
        }
    }
}
