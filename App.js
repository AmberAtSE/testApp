/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  NativeModules,
  Dimensions,
} from 'react-native';
const {CalendarModule} = NativeModules;
// import MapView, {UrlTile} from 'react-native-maps';
import {WebView} from 'react-native-webview';
class App extends React.Component {
  state = {
    networkType: '',
    deviceWidth: Dimensions.get('window').width,
  };

  componentDidMount() {
    CalendarModule.getNetworkType((type) => {
      this.setState({networkType: type});
    });
  }
  render() {
    // const deviceWith = Dimensions.get('window').width;
    // console.log('deviceWith', deviceWith);
    return (
      <View style={{flex: 1}}>
        <Text>{this.state.networkType}. Update from RN!</Text>
        <WebView
          style={{width: this.state.deviceWidth}}
          originWhitelist={['*']}
          source={{
            uri: 'file:///android_asset/oms-map/index.html',
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          useWebKit={true}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

export default App;
