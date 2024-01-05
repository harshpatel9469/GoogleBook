import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../utils';
import {scale} from 'react-native-size-matters';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  head: {
    height: '15%',
    backgroundColor: Colors.green,
    paddingHorizontal: scale(10),
    position: 'relative',
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scale(-25),
    width: '100%',
  },
  btnContainer: {
    borderWidth: 2,
    borderColor: Colors.green,
    borderRadius: 30,
    width: '70%',
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
    borderTopRightRadius:0
    
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    minHeight: screenHeight,
  },
  searchInput: {width: '80%', padding: 0, color: Colors.green},
  listContent: {
    padding: scale(20),
    margin: scale(20),
    marginTop: scale(30),
    backgroundColor: Colors.bgGreen,
    borderRadius: scale(15),
    height: '100%',
    // paddingBottom: scale(50),
  },
  addBookBtn: {
    width: scale(120),
    borderRadius: 0,
    borderBottomWidth: 2,
    borderBottomColor: Colors.orange,
  },
  addBtnText: {fontSize: scale(14), color: Colors.orange},
  modalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: scale(20),
    width: '80%',
    borderRadius: 10,
  },
  inputTitle: {
    fontSize: scale(16),
    fontWeight: '800',
    color: Colors.green,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(30),
  },
});

export default styles;
