import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../utils';
import {scale} from 'react-native-size-matters';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  head: {
    height: '15%',
    backgroundColor: Colors.green,

    paddingHorizontal: scale(10),
    paddingTop: scale(25),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    height: '85%',
    backgroundColor: Colors.white,
  },
  btnMain: {
    position: 'absolute',
    top: scale(-25),
    width: '100%',
    paddingHorizontal: scale(20),
  },
  btnContainer: {
    borderWidth: 2,
    borderColor: Colors.green,
    borderRadius: 30,
    width: '60%',
    height: scale(45),
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingHorizontal: scale(10),
  },
  btnText: {
    color: Colors.green,
    fontSize: scale(16),
    textAlign: 'center',
    fontWeight: '700',
  },
  form: {
    marginTop: scale(80),
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: scale(40),
    height: scale(40),
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: scale(20),
    fontWeight: '800',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    top: scale(35),
    right: 0,
    borderWidth: 2,
    borderColor: Colors.orange,
  },

  bookDetailContainer: {
    width: '100%',
    paddingTop: scale(10),
  },
  bookTitle: {
    fontSize: scale(16),
    color: Colors.orange,
    width: '38%',
    fontWeight: '600',
    paddingRight: scale(10),
  },
  bookValue: {
    fontSize: scale(14),
    color: Colors.black,
    width: '62%',
  },
  bookDetailView: {flexDirection: 'row', marginBottom: scale(10)},
  buttonText: {
    color: Colors.white,
    fontSize: scale(16),
    fontWeight: '700',
  },
});

export default styles;
