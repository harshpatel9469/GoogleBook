import {createModel} from '@rematch/core';
import auth from '@react-native-firebase/auth';
import {fetchUserDocument} from '../firebase';

const initialState = {
  email: null,
  name: null,
  role: null,
  userUid: null,
};
export const user = createModel()({
  state: initialState,
  reducers: {
    setUserDetail(state, userDetails) {
      return {...state, ...userDetails};
    },
    signOut(state) {
      return {...state, ...initialState};
    },
  },

  effects: dispatch => ({
    login: async ({email, password}) => {
      try {
        const res = await auth().signInWithEmailAndPassword(email, password);
        if (res.user?.uid) dispatch.user.getUserDetails(res.user.uid);
      } catch (e) {
        console.log(e);
      }
    },
    getUserDetails: async id => {
      try {
        const res = await fetchUserDocument(id);
        if (res) {
          dispatch.user.setUserDetail({...res, userUid: id});
          dispatch.book.getBookList();
        }
        console.log('getUserDetails', res);
      } catch (e) {
        console.log(e);
      }
    },
  }),
});
