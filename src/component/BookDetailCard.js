import React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {Button} from 'native-base';
import {Colors, images} from '../utils';

const BookDetailCard = ({
  bookDetail,
  addBook,
  isAddBookLoading,
  isRescan,
  onReScan,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
      }}>
      <Image
        source={
          bookDetail?.thumbnail ? {uri: bookDetail.thumbnail} : images.noImage
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
          <Text style={styles.bookValue}>{bookDetail.bookName}</Text>
        </View>
        <View style={styles.bookDetailView}>
          <Text style={styles.bookTitle}>Description :</Text>
          <Text style={styles.bookValue}>{bookDetail.description}</Text>
        </View>
        <View style={styles.bookDetailView}>
          <Text style={styles.bookTitle}>Authors :</Text>
          <Text style={styles.bookValue}>{bookDetail.authors}</Text>
        </View>
        <View style={styles.bookDetailView}>
          <Text style={styles.bookTitle}>Published Date:</Text>
          <Text style={styles.bookValue}>{bookDetail.publishedDate}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: isRescan ? 'space-between' : 'center',
            marginBottom: scale(100),
          }}>
          <Button
            background={Colors.orange}
            h={scale(45)}
            w={scale(120)}
            onPress={addBook}
            disabled={isAddBookLoading}
            _text={styles.buttonText}>
            {isAddBookLoading ? (
              <ActivityIndicator color={Colors.white} size={'small'} />
            ) : (
              'Add'
            )}
          </Button>
          {isRescan && (
            <Button
              background={Colors.orange}
              h={scale(45)}
              w={scale(120)}
              onPress={onReScan}
              disabled={isAddBookLoading}
              _text={styles.buttonText}>
              Re-Scan
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

export default BookDetailCard;

const styles = StyleSheet.create({
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
