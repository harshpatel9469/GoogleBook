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
  RefreshControl,
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
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import {fetchBookDetail} from '../../firebase';
import BookDetailCard from '../../component/BookDetailCard';
import BookCard from '../../component/BookCard';

const AddBook = ({navigation}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllBookLoading, setIsAllBookLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [allBookData, setAllBookData] = useState([]);
  const bookDetail = useSelector(state => state.book.bookDetail);
  const isBookDetailLoading = useSelector(
    state => state.loading.effects.book.getBookDetail,
  );
  const isAddBookLoading = useSelector(
    state => state.loading.effects.book.addBook,
  );
  const dimensions = useWindowDimensions();
  useEffect(() => {
    dispatch.book.getBookList();
  }, []);

  const getBookDetail = () => {
    if (search != '') {
      setAllBookData([]);
      dispatch.book.getBookDetail(search);
      hapticTouch();
    } else {
      alert('Please enter ISBN');
    }
  };

  const addListOfBooks = async () => {
    hapticTouch();
    setIsAllBookLoading(true);
    const tasks = [];
    for (let i = 0; i < allBookData?.length; i++) {
      const promise1 = new Promise(async (resolve, reject) => {
        try {
          const res = await dispatch.book.addBook(allBookData[i]);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
      tasks.push(promise1);
    }
    Promise.all(tasks)
      .then(results => {
        console.log('All promises resolved:', results);
        setIsAllBookLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error('At least one promise rejected:', error);
      });
  };
  const addBook = async () => {
    await dispatch.book.addBook(bookDetail);
    navigation.navigate('Home');
  };

  const CSVTOJSON = csvFilePath => {
    setIsLoading(true);
    RNFS.readFile(csvFilePath, 'utf8')
      .then(data => {
        Papa.parse(data, {
          header: true,
          complete: async result => {
            const jsonData = result.data;
            const tasks = [];
            for (let i = 0; i < jsonData.length; i++) {
              const promise1 = new Promise(async (resolve, reject) => {
                try {
                  const res = await fetchBookDetail(jsonData[i].ISBN);
                  resolve(res);
                } catch (error) {
                  reject(error);
                }
              });
              tasks.push(promise1);
            }
            Promise.all(tasks)
              .then(results => {
                console.log('All promises resolved:', results);
                setAllBookData([...results]);
              })
              .catch(error => {
                console.error('At least one promise rejected:', error);
              });
            console.log('JSON data:', jsonData);
            setIsLoading(false);
          },
          error: error => {
            console.error('CSV parsing error:', error.message);
          },
        });
      })
      .catch(error => {
        console.error('File reading error:', error.message);
      });
  };
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(result, result.uri, result.type, result.name, result.size);
      CSVTOJSON(result[0].uri);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
        console.error('Error picking file:', error);
      }
    }
  };
  const hapticTouch = () => {
    RNReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
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
                navigation.goBack();
              }}>
              <AntDesign
                name="arrowleft"
                color={Colors.white}
                size={scale(20)}
              />
            </Pressable>
            <View style={{alignItems: 'center', width: '90%'}}>
              <Text style={styles.title}>{'eSparkBiz Books'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.btnMain}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.btnContainer}>
                <FontAwesome
                  name={'search'}
                  size={scale(20)}
                  color={Colors.green}
                  style={{marginRight: scale(10)}}
                />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="ISBN Number..."
                  style={{width: '80%', padding: 0, color: Colors.green}}
                />
              </View>

              <Button
                background={Colors.orange}
                h={scale(45)}
                w={scale(75)}
                borderRadius={scale(30)}
                borderWidth={2}
                borderColor={Colors.green}
                onPress={getBookDetail}
                py={0}
                disabled={isBookDetailLoading}
                _text={styles.buttonText}>
                {isBookDetailLoading ? (
                  <ActivityIndicator color={Colors.white} size={'small'} />
                ) : (
                  'Get'
                )}
              </Button>
              <Button
                background={Colors.orange}
                h={scale(45)}
                w={scale(45)}
                borderRadius={scale(30)}
                borderWidth={2}
                borderColor={Colors.green}
                onPress={() => {
                  hapticTouch();
                  dispatch.book.setBookDetail(null);
                  navigation.navigate('AddBookCode');
                }}
                py={0}
                px={0}
                disabled={isBookDetailLoading || isLoading}
                _text={styles.buttonText}>
                <AntDesign
                  name="qrcode"
                  color={Colors.white}
                  size={scale(20)}
                />
              </Button>
            </View>
          </View>
          <Button
            background={Colors.orange}
            h={scale(45)}
            borderRadius={scale(30)}
            borderWidth={2}
            borderColor={Colors.green}
            onPress={pickFile}
            my={scale(30)}
            mx={scale(20)}
            py={0}
            disabled={isLoading}
            _text={styles.buttonText}>
            {isLoading ? (
              <ActivityIndicator color={Colors.white} size={'small'} />
            ) : (
              'Add Book By CSV'
            )}
          </Button>
          <ScrollView
            style={{
              padding: scale(20),
              margin: scale(20),
              marginTop: scale(0),
              marginBottom: 0,
              backgroundColor: Colors.bgGreen,
              borderRadius: scale(15),
              height: '100%',
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            nestedScrollEnabled>
            {isBookDetailLoading || isLoading ? (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: scale(dimensions.height / 4),
                }}>
                <ActivityIndicator color={Colors.orange} size={'large'} />
              </View>
            ) : allBookData?.length ? (
              <View
                style={{
                  paddingBottom: verticalScale(50),
                  alignItems: 'center',
                }}>
                <FlatList
                  data={allBookData}
                  renderItem={({item, index}) => (
                    <BookCard item={item} index={index} from={'AddBook'} />
                  )}
                />
                <Button
                  background={Colors.orange}
                  h={scale(45)}
                  w={scale(120)}
                  onPress={addListOfBooks}
                  disabled={isAllBookLoading}
                  _text={styles.buttonText}>
                  {isAddBookLoading ? (
                    <ActivityIndicator color={Colors.white} size={'small'} />
                  ) : (
                    'Add'
                  )}
                </Button>
              </View>
            ) : bookDetail ? (
              <BookDetailCard
                bookDetail={bookDetail}
                isAddBookLoading={isAddBookLoading}
                addBook={addBook}
                isStatus={false}
              />
            ) : (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: scale(dimensions.height / 4),
                }}>
                <MaterialIcons
                  name="dangerous"
                  size={scale(60)}
                  color={'red'}
                />
                <Text
                  style={{
                    fontSize: scale(20),
                    color: Colors.black,
                    fontWeight: '700',
                    paddingLeft: scale(20),
                  }}>
                  No Details....
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddBook;
