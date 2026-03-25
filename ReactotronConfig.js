import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage) // adds async storage support
  .configure({ name: 'FashionEcommerceApp' }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) // plus custom redux plugin
  .connect(); // let's connect!

export default reactotron;
