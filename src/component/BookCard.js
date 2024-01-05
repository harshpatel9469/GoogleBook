import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {Button} from 'native-base';
import {Colors, images} from '../utils';

const BookCard = ({
  navigation,
  onIssueBookPress,
  item,
  index,
  from,
  onCardPress,
  isStatus,
}) => {
  const userUID = useSelector(state => state.user.userUid);
  return (
    <Pressable style={styles.cardMain} key={index} onPress={onCardPress}>
      <View style={{width: '40%'}}>
        <Image
          source={item?.thumbnail ? {uri: item.thumbnail} : images.noImage}
          style={styles.bookImage}
        />
      </View>
      <View style={styles.detailContent}>
        <View style={styles.detailMain}>
          <Text style={styles.bookTitle}>
            ISBN:
            <Text style={styles.bookValue}>{'  ' + item.ISBN}</Text>
          </Text>
          <Text style={styles.bookTitle}>
            Name:
            <Text style={styles.bookValue}>{'  ' + item.bookName}</Text>
          </Text>
          <Text style={styles.bookTitle}>
            Authors:
            <Text style={styles.bookValue}>{'  ' + item.authors}</Text>
          </Text>
          {userUID && isStatus && (
            <Text style={styles.bookTitle}>
              Status:
              <Text
                style={{
                  fontSize: scale(12),
                  color: item.status != '' ? Colors.green : 'red',
                  fontWeight: '400',
                  borderWidth: 1,
                }}>
                <Text style={styles.bookValue}></Text>
                {item.status != ''
                  ? '  ' + item.status.toUpperCase()
                  : '  NOT ISSUED'}
              </Text>
            </Text>
          )}
          {from == 'IssuedBook' && (
            <Text style={styles.bookTitle}>
              Employee Id:
              <Text style={styles.bookValue}>{'  ' + item.empId}</Text>
            </Text>
          )}
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          {!userUID && item.status == '' && (
            <Button
              variant={'solid'}
              px={0}
              py={0}
              w={scale(100)}
              backgroundColor={Colors.green}
              h={verticalScale(35)}
              mt={verticalScale(10)}
              _text={{fontSize: scale(14), color: Colors.white, margin: 0}}
              onPress={onIssueBookPress}>
              Issue Book
            </Button>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  bookTitle: {
    fontSize: scale(12),
    color: Colors.black,
    fontWeight: '700',
  },
  bookValue: {
    fontSize: scale(12),
    color: Colors.black,
    fontWeight: '400',
  },
  cardMain: {
    width: '100%',
    marginBottom: scale(20),
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(10),
  },
  bookImage: {
    width: '100%',
    height: verticalScale(110),
    resizeMode: 'contain',
  },
  detailContent: {
    width: '58%',
    justifyContent: 'flex-start', 
    minHeight:verticalScale(110)
  },
  detailMain: {
    justifyContent: 'space-between',
    minHeight: verticalScale(110/2),
  },
});
