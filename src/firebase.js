import firestore from '@react-native-firebase/firestore';
import {API_KEY, API_URL} from './utils';

export const fetchUserDocument = async uid => {
  console.log('-------', uid);
  const docRef = await firestore().collection('users').doc(uid);

  return new Promise((resolve, reject) => {
    const unsubscribe = docRef.onSnapshot(
      async docSnapshot => {
        if (docSnapshot.exists) {
          unsubscribe();
          const response = await firestore().collection('users').doc(uid).get();
          resolve(response?.data());
        }
      },
      error => {
        unsubscribe();
        reject(error);
      },
    );
  });
};

export const fetchAllBooks = async () => {
  const docRef = await firestore().collection('books').get();
  return docRef.docs.map(book => book.data());
};
export const fetchAllIssuedBooks = async () => {
  const docRef = await firestore().collection('issuedBooks').get();
  return docRef.docs.map(book => {
    return {...book.data(), id: book.id};
  });
};

export const fetchBookDetail = async id => {
  const apiUrl = `${API_URL + id}&key=${API_KEY}`;
  console.log('\n\n\n\n', JSON.stringify(id));  

  return fetch(apiUrl)
    .then(async response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response body as JSON
    })
    .then(data => {
      if (data.totalItems > 0) {
        const res = data.items[0];
        console.log('\n\n\n\n', {
          ISBN: id,
          authors: JSON.stringify(res.volumeInfo.authors)
            ?.replace('[', '')
            .replace(']', '')
            .replaceAll('"', ''),
          publishedDate: res.volumeInfo.publishedDate,
          description: res.volumeInfo.description,
          bookName: res.volumeInfo.title,
          thumbnail: res?.volumeInfo?.imageLinks?.thumbnail
            ? res.volumeInfo.imageLinks.thumbnail
            : '',
          status: '',
        });
        return {
          ISBN: id,
          authors: JSON.stringify(res.volumeInfo.authors)
            ?.replace('[', '')
            .replace(']', '')
            .replaceAll('"', ''),
          publishedDate: res.volumeInfo.publishedDate,
          description: res.volumeInfo?.description
            ? res.volumeInfo?.description
            : '-',
          bookName: res.volumeInfo.title,
          thumbnail: res?.volumeInfo?.imageLinks?.thumbnail
            ? res.volumeInfo.imageLinks.thumbnail
            : '',
          status: '',
        };
      } else {
        return null;
      }
    })
    .catch(error => {
      // Handle errors here
      console.error('There was a problem with the fetch operation:', error);
      throw new Error(error);
    });
};

export const addBookToDb = async book => {
  try {
    let bookExistsOrNot = await checkBookExistsOrNot(book.ISBN);
    if (!bookExistsOrNot) {
      const docRef = await firestore().collection('books').add(book);
      return docRef;
    } else {
      return {status: 500, message: 'Book already exists!'};
    }
  } catch (error) {
    console.log('addBookToDb errr', error.message);
  }
};

export const checkBookExistsOrNot = async isbn => {
  const bookRef = await firestore()
    .collection('books')
    .where('ISBN', '==', isbn)
    .get();
  return !bookRef.empty;
};

export const issueBook = async data => {
  let obj = {
    empId: data.empId,
    ...data.currentBook,
    status: 'issued',
    issuedDate: new Date(),
  };
  console.log(obj);
  const docRef = await firestore().collection('issuedBooks').add(obj);
  console.log(docRef);
  if (docRef?.id) {
    const bookDetails = await firestore()
      .collection('books')
      .where('ISBN', '==', obj.ISBN)
      .get();
    await firestore()
      .collection('books')
      .doc(bookDetails.docs[0].id)
      .update({status: 'issued'});
    return {message: 'Book issued!'};
  }
};

export const unIssueBook = async data => {
  console.log('====================================');
  console.log('data', data);
  console.log('====================================');
  const docRef = await firestore().collection('issuedBooks').doc(data.id);
  await docRef.delete();
  const bookDetails = await firestore()
    .collection('books')
    .where('ISBN', '==', data.ISBN)
    .get();
  await firestore()
    .collection('books')
    .doc(bookDetails.docs[0].id)
    .update({status: ''});
  return {message: 'Book unissued!'};
};
