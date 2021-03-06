package com.animalz;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.rctbattery.BatteryManagerPackage;
import com.ninty.system.setting.SystemSettingPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import cl.json.RNSharePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.reactlibrary.RNOpacityGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import ui.iconic.RNIconicPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cl.json.ShareApplication;
import com.microsoft.codepush.react.CodePush;

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
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNViewShotPackage(),
            new RNI18nPackage(), new BatteryManagerPackage(),
          new SystemSettingPackage(), new ReactVideoPackage(), new VectorIconsPackage(), new RNSharePackage(),
          new ReactNativePushNotificationPackage(), new RNOpacityGradientPackage(), new MapsPackage(),
          new LinearGradientPackage(), new RNIconicPackage(),
          new CodePush("deployment-key-here", MainApplication.this, BuildConfig.DEBUG));
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
