import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import theme from 'theme';
import BouncingPreloader from 'react-native-bouncing-preloader';
import I18n from 'i18n';
import borgore from 'assets/dj/borgore.jpg';
import camokrooked from 'assets/dj/camo&krooked.jpg';
import downlink from 'assets/dj/downlink.jpg';
import edrushoptical from 'assets/dj/edrushoptical.jpg';
import megamidnight from 'assets/dj/megamidnight.jpg';
import AMCTurno from 'assets/dj/AMCTurno.jpg';
import agressorbunxpythius from 'assets/dj/agressorbunxpythius.jpg';
import soltan from 'assets/dj/soltan.jpg';
import cookerzcrew from 'assets/dj/cookerzcrew.jpg';
import fourhorsement from 'assets/dj/fourhorsement.jpg';

/*
    <BouncingPreloader
      icons={[
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t31.0-8/27908414_956213774528434_5076521603464281733_o.jpg?_nc_cat=0&oh=4e29fb7ee283140a9ad8761347d5a8f4&oe=5B2A6509',
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/20376172_859233934226419_5412800108172177929_n.png?_nc_cat=0&oh=84d45db32bd03be8aa280421d5c3f974&oe=5B6C9163',
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t31.0-8/17192309_775658789250601_2873722439361036472_o.jpg?_nc_cat=0&oh=b90e5224f4408d5a0e7a4427655c94e4&oe=5B29110D',
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/14068144_669101879906293_512009969421503922_n.jpg?_nc_cat=0&oh=1cd861a443cea1e672563938ca408e82&oe=5B6332F6',
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/12802895_585308018285680_128422011941279573_n.jpg?_nc_cat=0&oh=ec04bb4d86d2b951a4fc9027f2aff63c&oe=5B75D10B',
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/11846787_514965071986642_5895050396857441847_n.jpg?_nc_cat=0&oh=8a438c384a61163bf27f7d3ede755f89&oe=5B29D3AA',
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/10390563_440342089448941_6206643356122075966_n.jpg?_nc_cat=0&oh=f31bf88c04a5b73ae8497385fc5e4284&oe=5B6E24B8',
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t31.0-8/1617371_284295528386932_1762514923_o.jpg?_nc_cat=0&oh=7c670a8e42a1aac55b2a89b0a97433e2&oe=5B620316',
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t31.0-8/858857_238704839612668_477022495_o.jpg?_nc_cat=0&oh=657e2fd2e5e542ad6a95a2a443e5526f&oe=5B71D602',
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/10433131_405321116284372_6050046221620358220_n.jpg?_nc_cat=0&oh=b2f98daef403e0da74ac9e7061dd935b&oe=5B52184E',
      ]}
      leftRotation="-680deg"
      rightRotation="360deg"
      leftDistance={-200}
      rightDistance={200}
      speed={1500}
    />
        <View style={{
      position: 'absolute',
      left: theme.size.screenWidth / 2 - 60,
      top: theme.size.screenHeigth / 2,
      width: 120,
      height: 40,
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.colors.accent,
    }}
    >
      <Text style={{
        fontSize: theme.textSizes.xsmall,
        color: theme.colors.primaryLight,
        textAlign: 'center',
        margin: 10,

        fontFamily: theme.fontFamily.rubikRegular,
      }}
      >
        {I18n.t('loading')}
      </Text>
    </View>
*/
const Loading = () => (
  <View style={{
    flex: 1,
    backgroundColor: theme.colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <ActivityIndicator size="large" color={theme.colors.accent} />

  </View>
);

Loading.propTypes = {

};

export default Loading;
