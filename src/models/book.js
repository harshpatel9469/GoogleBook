import {createModel} from '@rematch/core';
import auth from '@react-native-firebase/auth';
import {
  addBookToDb,
  fetchAllBooks,
  fetchAllIssuedBooks,
  fetchBookDetail,
  issueBook,
  unIssueBook,
} from '../firebase';

export const book = createModel()({
  state: {
    bookList: [],
    bookDetail: null,
    issuedBookList: [],
    unIssuedBookResponse: false,
  },
  reducers: {
    setBookList(state, bookList) {
      return {...state, bookList};
    },
    setIssuedBookList(state, issuedBookList) {
      return {...state, issuedBookList};
    },
    setBookDetail(state, bookDetail) {
      return {...state, bookDetail};
    },
    setUnIssuedBookResponse(state, unIssuedBookResponse) {
      return {...state, unIssuedBookResponse};
    },

  },

  effects: dispatch => ({
    getBookList: async () => {
      try {
        const res = await fetchAllBooks();
        if (res) dispatch.book.setBookList(res);
      } catch (e) {
        console.log(e);
      }
    },
    getIssuedBookList: async () => {
      try {
        const res = await fetchAllIssuedBooks();
        if (res) dispatch.book.setIssuedBookList(res);
      } catch (e) {
        console.log(e);
      }
    },
    getBookDetail: async id => {
      try {
        const res = await fetchBookDetail(id);
        if (res) dispatch.book.setBookDetail(res);
        else {
          dispatch.book.setBookDetail(null);
        }
      } catch (error) {
        dispatch.book.setBookDetail(null);
        alert(error.message);
      }
    },
    addBook: async book => {
      try {
        const res = await addBookToDb(book);
        if (res?.id) dispatch.book.getBookList();
        else alert(res.message);
      } catch (error) {
        console.log('addBook err', error);
      }
    },
    issueBook: async data => {
      try {
        const res = await issueBook(data);
        if (res?.message == 'Book issued!') {
          alert(res.message);
          dispatch.book.getBookList();
        } else alert(res.message);
      } catch (error) {
        console.log(error);
      }
    },

    unIssueBook: async data => {
      try {
        const res = await unIssueBook(data);
        if (res?.message == 'Book unissued!') {
          alert(res.message);
          dispatch.book.setUnIssuedBookResponse(true)
          dispatch.book.getIssuedBookList();
          dispatch.book.getBookList();
        } else alert(res.message);
      } catch (error) {
        console.log(error);
      }
    },
  }),
});
