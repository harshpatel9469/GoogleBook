import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../utils';
import {scale} from 'react-native-size-matters';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  head: {
    height: '10%',
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
    height: '90%',
    backgroundColor: Colors.white,
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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    color: Colors.white,
    fontSize: scale(16),
    fontWeight: '700',
  },
  buttonTouchable: {
    padding: 16
  }
});

export default styles;
