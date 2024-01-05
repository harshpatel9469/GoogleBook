import {models} from './models';
import {init} from '@rematch/core';
import loadingPlugin from '@rematch/loading';
import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const middlewares = [];
if (__DEV__) {
}
const reduxConfig = {
  combineReducers: persistCombineReducers.bind(null, {
    key: `@eSparkBooks:redux`,
    storage: AsyncStorage,
    whitelist: ['user'],
    version: 1,
    throttle: 2000,
  }),
  middlewares: middlewares,
};
export const store = init({
  models,
  plugins: [loadingPlugin()],
  redux: reduxConfig,
});
