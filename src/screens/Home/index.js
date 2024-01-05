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
  SafeAreaView,
  useWindowDimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import styles from './style';
import {Colors, hapticOptions, images} from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input, Popover} from 'native-base';
import BookCard from '../../component/BookCard';
import Animated, {
  Easing,
  FadeInUp,
  RotateInDownLeft,
  FadeInDown,
} from 'react-native-reanimated';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBookModal, setIsBookModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const book = useSelector(state => state.book);
  const [empId, setEmpId] = useState('');
  const [bookList, setBookList] = useState(book.bookList);
  const [search, setSearch] = useState('');
  const initialFocusRef = useRef(null);
  const isBookListLoading = useSelector(
    state => state.loading.effects.book.getBookList,
  );
  const isIssueBookLoading = useSelector(
    state => state.loading.effects.book.issueBook,
  );
  const userUID = useSelector(state => state.user.userUid);
  useEffect(() => {
    getBookList();
  }, []);
  const getBookList = () => {
    dispatch.book.getBookList();
    hapticTouch();
  };
  useEffect(() => {
    setBookList(book.bookList);
  }, [book.bookList]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const debouncedSearch = debounce(query => {
    let arr = book.bookList.filter(
      book => book.bookName.includes(query) || book.ISBN.includes(query),
    );
    setBookList([...arr]);
  }, 300);

  useEffect(() => {
    debouncedSearch(search);
  }, [search]);
  const onAddBookPress = () => {
    hapticTouch();
    setModalVisible(false);
    dispatch.book.setBookDetail(null);
    navigation.navigate('AddBook');
  };
  const onIssuedBookPress = () => {
    hapticTouch();
    setModalVisible(false);
    navigation.navigate('IssuedBook');
  };

  const hapticTouch = () => {
    RNReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
  };
  const onLogin = () => {
    hapticTouch();
    navigation.navigate('Login');
    setModalVisible(false);
  };
  const onLogout = async () => {
    hapticTouch();
    await auth().signOut();
    dispatch.user.signOut();
    setModalVisible(false);
  };

  const onBookPress = async () => {
    hapticTouch();

    if (empId) {
      await dispatch.book.issueBook({empId, currentBook});
      setIsBookModal(false);
      setEmpId('');
    } else {
      Alert('Please Enter Employee Id');
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.green} barStyle={'dark-content'} />

        <Animated.View
          style={styles.head}
          entering={FadeInUp.duration(800).easing(Easing.ease)}>
          <View style={styles.header}>
            <Animated.Image
              entering={FadeInUp.delay(500).duration(1000).easing(Easing.ease)}
              source={images.logo}
              style={styles.logo}
            />
            <View style={{alignItems: 'center', width: '80%'}}>
              <Animated.Text
                entering={FadeInUp.delay(500)
                  .duration(1000)
                  .easing(Easing.ease)}
                style={styles.title}>
                {'eSparkBiz Books'}
              </Animated.Text>
            </View>

            <Popover
              initialFocusRef={initialFocusRef}
              isOpen={modalVisible}
              onClose={() => setModalVisible(!modalVisible)}
              placement={'bottom'}
              a
              _backdrop={{backgroundColor: 'rgba(0,0,0,0.9)'}}
              trigger={triggerProps => {
                return (
                  <Animated.View
                    entering={FadeInUp.delay(500)
                      .duration(1000)
                      .easing(Easing.ease)}>
                    <TouchableOpacity
                      {...triggerProps}
                      onPress={() => {
                        hapticTouch();
                        setModalVisible(true);
                      }}
                      style={[
                        styles.logo,
                        {justifyContent: 'center', alignItems: 'center'},
                      ]}>
                      <Entypo
                        name="dots-three-vertical"
                        color={Colors.white}
                        size={scale(20)}
                      />
                    </TouchableOpacity>
                  </Animated.View>
                );
              }}>
              <Popover.Content w="40" style={styles.modalView} top={scale(-10)}>
                {/* <Popover.Arrow /> */}

                {/* <View > */}
                {userUID ? (
                  <View>
                    <Button
                      variant={'unstyled'}
                      style={styles.addBookBtn}
                      _text={styles.addBtnText}
                      onPress={onAddBookPress}>
                      Add Book
                    </Button>
                    <Button
                      variant={'unstyled'}
                      style={styles.addBookBtn}
                      _text={styles.addBtnText}
                      onPress={onIssuedBookPress}>
                      Issued Book
                    </Button>
                  </View>
                ) : null}
                <Button
                  variant={'unstyled'}
                  style={styles.addBookBtn}
                  _text={styles.addBtnText}
                  onPress={() => {
                    if (userUID) onLogout();
                    else onLogin();
                  }}>
                  {userUID ? 'Logout' : 'Login'}
                </Button>
                <Button
                  variant={'unstyled'}
                  style={[styles.addBookBtn, {borderBottomWidth: 0}]}
                  _text={styles.addBtnText}
                  onPress={() => {
                    hapticTouch();
                    setModalVisible(false);
                  }}>
                  Close
                </Button>
                {/* </View> */}
              </Popover.Content>
            </Popover>
          </View>
        </Animated.View>
        <View style={styles.footer}>
          <View style={styles.btnMain}>
            <Animated.View
              style={styles.btnContainer}
              entering={FadeInUp.delay(500).duration(1000).easing(Easing.ease)}>
              <FontAwesome
                name={'search'}
                size={scale(20)}
                color={Colors.green}
                style={{marginRight: scale(20)}}
              />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="ISBN No, Book Name"
                style={styles.searchInput}
              />
            </Animated.View>
          </View>
          <Animated.View
            entering={FadeInDown.delay(500).duration(4000).springify()}
            style={styles.listContent}>
            <FlatList
              data={bookList}
              refreshControl={
                <RefreshControl
                  refreshing={isBookListLoading}
                  onRefresh={getBookList}
                />
              }
              renderItem={({item, index}) => (
                <View
                  style={{
                    paddingBottom: scale(
                      index == bookList?.length - 1 ? 20 : 0,
                    ),
                  }}>
                  <BookCard
                    item={item}
                    index={index}
                    isStatus
                    from={'Home'}
                    onIssueBookPress={() => {
                      setIsBookModal(true);
                      setCurrentBook(item);
                    }}
                  />
                </View>
              )}
            />
          </Animated.View>
        </View>
        <Modal
          visible={isBookModal}
          transparent={true}
          onRequestClose={() => setIsBookModal(false)}>
          <View style={styles.modalBg}>
            <View style={styles.modalContainer}>
              <View>
                <Text style={styles.inputTitle}>Enter EmployeeId</Text>
                <Input
                  value={empId}
                  onChangeText={setEmpId}
                  borderWidth={2}
                  borderColor={Colors.green}
                  mb={scale(10)}
                  _text={{color: Colors.green}}
                  w="100%"
                />
              </View>
              <View style={styles.modalBtnContainer}>
                <Button
                  w={'45%'}
                  backgroundColor={Colors.white}
                  borderWidth={2}
                  borderColor={Colors.green}
                  _text={{color: Colors.green, fontSize: scale(14)}}
                  onPress={() => {
                    hapticTouch();
                    setIsBookModal(false);
                    setCurrentBook(null);
                  }}>
                  Close
                </Button>
                <Button
                  w={'45%'}
                  backgroundColor={Colors.green}
                  borderWidth={2}
                  borderColor={Colors.green}
                  _text={{color: Colors.white, fontSize: scale(14)}}
                  onPress={onBookPress}>
                  {isIssueBookLoading ? (
                    <ActivityIndicator color={Colors.white} size={'small'} />
                  ) : (
                    'Book'
                  )}
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Home;
