package com.animalz;

import android.app.Application;

import com.facebook.react.ReactApplication;
import ui.shine.RNShineButtonPackage;
import ui.shine.RNShineButtonPackage;
import ui.shine.RNShineButtonPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import ui.iconic.RNIconicPackage;
import com.reactlibrary.RNOpacityGradientPackage;
import cl.json.RNSharePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import cl.json.ShareApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  @Override
  public String getFileProviderAuthority() {
    return "com.animalz.provider";
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNShineButtonPackage(),
            new RNShineButtonPackage(),
            new RNShineButtonPackage(),
            new ReactNativePushNotificationPackage(), new RNIconicPackage(), new RNOpacityGradientPackage(),
          new ReactVideoPackage(), new MapsPackage(), new RNSharePackage(), new RNI18nPackage(),
          new VectorIconsPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
