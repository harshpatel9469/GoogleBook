import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../utils';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    paddingTop: scale(50),
    height: '85%',
    backgroundColor: Colors.green,
    borderBottomLeftRadius:scale(160),
    borderBottomRightRadius:scale(160)
  },
  footer: {
    height: '15%',
    position: 'relative',
    justifyContent:"center",
    alignItems:"center"
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 30,
    width: '80%',
    height: scale(50),
    color: Colors.white,
    fontSize: scale(14),
    textAlign: 'left',
    marginBottom: scale(30),
    paddingLeft:scale(15)
  },
  btnMain: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scale(-45),
    width: '100%',
  },
  btnContainer: {
    borderWidth: 2,
    borderColor: Colors.green,
    borderRadius: 30,
    width: '60%',
    height: scale(45),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
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
  logoBg: {
    width: scale(110),
    height: scale(110),
    resizeMode: 'contain',
  },
  logo: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'contain',
    position: 'absolute',
    top: scale(25),
    left: scale(25),
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: scale(40),
    fontWeight: '800',
  },
  subTitle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: scale(30),
    fontWeight: '300',
    fontStyle: 'italic',
  },
  copyRightText:{
    textAlign: 'center',
    fontSize: scale(14),
    fontWeight: '500',
    marginTop: scale(15),
    color: Colors.green,
  },
  copyRightContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  }
});

export default styles;
