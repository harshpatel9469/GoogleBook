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
  TextInput,
  SafeAreaView,
  useWindowDimensions,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import styles from './style';
import {Colors, hapticOptions, images} from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input} from 'native-base';
import BookCard from '../../component/BookCard';

const IssuedBook = ({navigation}) => {
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBookModal, setIsBookModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const book = useSelector(state => state.book);
  const [empId, setEmpId] = useState('');
  const [bookList, setBookList] = useState(book.getIssuedBookList);
  const [search, setSearch] = useState('');
  const isIssuedBookListLoading = useSelector(
    state => state.loading.effects.book.getIssuedBookList,
  );
  const isUnIssueBookLoading = useSelector(
    state => state.loading.effects.book.unIssueBook,
  );
  useEffect(() => {
    getIssuedBookList();
  }, []);
  const getIssuedBookList = () => {
    dispatch.book.getIssuedBookList();
  };
  useEffect(() => {
    setBookList(book.issuedBookList);
  }, [book.issuedBookList]);
  useEffect(() => {
    if (book.unIssuedBookResponse) {
      setIsBookModal(false);
      setCurrentBook(null);
      dispatch.book.setUnIssuedBookResponse(false);
    }
  }, [book.unIssuedBookResponse]);

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
    let arr = book.issuedBookList.filter(
      book => book.bookName.includes(query) || book.ISBN.includes(query),
    );
    setBookList([...arr]);
  }, 300);

  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  const hapticTouch = () => {
    RNReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.green} barStyle={'dark-content'} />

        <View style={styles.head}>
          <View style={styles.header}>
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
              <View style={{alignItems: 'center', width: '90%'}}>
                <Text style={styles.title}>{'Issued Books'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.btnMain}>
            <View style={styles.btnContainer}>
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
            </View>
          </View>
          <View style={styles.listContent}>
            <FlatList
              data={bookList}
              refreshControl={
                <RefreshControl
                  refreshing={isIssuedBookListLoading}
                  onRefresh={getIssuedBookList}
                />
              }
              renderItem={({item, index}) => (
                <BookCard
                  item={item}
                  index={index}
                  isStatus
                  from={'IssuedBook'}
                  onCardPress={() => {
                    setIsBookModal(true);
                    setCurrentBook(item);
                  }}
                />
              )}
            />
          </View>
        </View>

        <Modal
          visible={Boolean(currentBook)}
          transparent={true}
          onRequestClose={() => setIsBookModal(false)}>
          <View style={styles.modalBg}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Image
                  source={
                    currentBook?.thumbnail
                      ? {uri: currentBook.thumbnail}
                      : images.noImage
                  }
                  style={{
                    height: verticalScale(150),
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <View style={styles.bookDetailContainer}>
                  <View style={styles.bookDetailView}>
                    <Text style={styles.bookTitle}>Name :</Text>
                    <Text style={styles.bookValue}>
                      {currentBook?.bookName}
                    </Text>
                  </View>
                  <View style={styles.bookDetailView}>
                    <Text style={styles.bookTitle}>Authors :</Text>
                    <Text style={styles.bookValue}>{currentBook?.authors}</Text>
                  </View>

                  <View style={styles.bookDetailView}>
                    <Text style={styles.bookTitle}>Emplpyee Id :</Text>
                    <Text style={styles.bookValue}>{currentBook?.empId}</Text>
                  </View>
                  <View style={styles.bookDetailView}>
                    <Text style={styles.bookTitle}>Published Date:</Text>
                    <Text style={styles.bookValue}>
                      {currentBook?.publishedDate}
                    </Text>
                  </View>

                  <View style={styles.bookDetailView}>
                    <Text style={styles.bookTitle}>Issued Date:</Text>
                    <Text style={styles.bookValue}>
                      {currentBook?.issuedDate
                        .toDate()
                        .toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </Text>
                  </View>
                </View>
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
                  onPress={() => {
                    dispatch.book.unIssueBook(currentBook);
                  }}>
                  {isUnIssueBookLoading ? (
                    <ActivityIndicator color={Colors.white} size={'small'} />
                  ) : (
                    'Unissue'
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

export default IssuedBook;
