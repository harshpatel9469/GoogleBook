import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  useWindowDimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {Colors, hapticOptions, images} from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input, ScrollView} from 'native-base';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import BookDetailCard from '../../component/BookDetailCard';
import QRCodeScanner from 'react-native-qrcode-scanner';
const AddBookCode = ({navigation}) => {
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pickedFile, setPickedFile] = useState(null);
  const bookDetail = useSelector(state => state.book.bookDetail);
  const isBookDetailLoading = useSelector(
    state => state.loading.effects.book.getBookDetail,
  );
  const isAddBookLoading = useSelector(
    state => state.loading.effects.book.addBook,
  );

  const getBookDetail = () => {
    dispatch.book.getBookDetail(search);
    hapticTouch();
  };

  const addBook = async () => {
    try {
      hapticTouch();
      await dispatch.book.addBook(bookDetail);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    } finally {
      navigation.navigate('Home');
    }
  };
  const hapticTouch = () => {
    RNReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
  };
  const onSuccess = e => {
    console.log('An error occured', e);
    if (e.data) {
      dispatch.book.getBookDetail(e.data);
    }
  };
  const onReScan = () => {
    dispatch.book.setBookDetail(null);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          minHeight: dimensions.height,
        }}>
        <StatusBar backgroundColor={Colors.green} barStyle={'dark-content'} />

        <View style={styles.head}>
          <View style={styles.header}>
            <Pressable
              onPress={() => {
                hapticTouch();
                navigation.navigate('Home');
              }}>
              <AntDesign
                name="arrowleft"
                color={Colors.white}
                size={scale(20)}
              />
            </Pressable>
            <View style={{alignItems: 'center', width: '95%'}}>
              <Text style={styles.title}>{'Scan Code'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <ScrollView
            style={{
              padding: scale(20),
              margin: scale(20),
              marginTop: scale(30),
              marginBottom: 0,
              backgroundColor: Colors.bgGreen,
              borderRadius: scale(15),
              height: '100%',
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}>
            {isBookDetailLoading ? (
              <View
                style={{
                  height: verticalScale(500),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={Colors.orange} size={'large'} />
              </View>
            ) : bookDetail ? (
              <View style={{alignItems: 'center'}}>
                <BookDetailCard
                  bookDetail={bookDetail}
                  isAddBookLoading={isAddBookLoading}
                  addBook={addBook}
                  isRescan={true}
                  onReScan={onReScan}
                />
              </View>
            ) : (
              // <View
              //   style={{
              //     height: '100%',
              //     justifyContent: 'center',
              //     alignItems: 'center',
              //     paddingTop: scale(dimensions.height / 4),
              //   }}>
              //   <MaterialIcons
              //     name="dangerous"
              //     size={scale(60)}
              //     color={'red'}
              //   />
              //   <Text
              //     style={{
              //       fontSize: scale(20),
              //       color: Colors.black,
              //       fontWeight: '700',
              //       paddingLeft: scale(20),
              //     }}>
              //     No Details....
              //   </Text>
              // </View>
              <QRCodeScanner
                onRead={onSuccess}
                // flashMode={RNCamera.Constants.FlashMode.torch}
                containerStyle={{
                  width: '100%',
                  alignItems: 'center',
                  height: verticalScale(500),
                }}
                cameraStyle={{
                  width: scale(dimensions.width - 90),
                }}
                topContent={
                  <Text style={styles.centerText}>
                    <Text style={styles.textBold}>Scan QrCode or BarCode</Text>
                  </Text>
                }
              />
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddBookCode;
