// obtained from react native tutorials
import {PixelRatio,Platform} from 'react-native';
import Dimensions from 'Dimensions';
const Util = {
  OS: Platform.OS,
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  themeColor:'#53cac3',
  selectedColor: '#00beff',
  statusBarHeight: Platform.OS == 'ios' ? 20 : 25,
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    navHeight: Platform.OS == 'ios' ? 64 : 69
  }
};
export default Util;