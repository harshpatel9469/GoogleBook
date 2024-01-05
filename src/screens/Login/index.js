import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';
import {Colors, hapticOptions, images} from '../../utils';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeIn,
} from 'react-native-reanimated';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('testadmin@gmail.com');
  const [password, setPassword] = useState('test@123');
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const isUserLoading = useSelector(state => state.loading.models.user);
  const onLogin = async () => {
    RNReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
    if (email === '' && password === '') {
      alert('Please enter email and password');
      return;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      alert('Please enter valid email');
      return;
    }

    dispatch.user.login({email, password});
  };

  useEffect(() => {
    if (user.userUid) {
      navigation.dispatch(
        navigation.reset({index: 0, routes: [{name: 'Home'}]}),
      );
    }
  }, [user]);

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="position">
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          minHeight: dimensions.height,
        }}>
        <StatusBar backgroundColor={Colors.green} barStyle={'dark-content'} />

        <Animated.View
          style={styles.head}
          entering={FadeInUp.delay(400).duration(1000).springify()}>
          <View>
            <Animated.Image
              entering={FadeIn.delay(500).duration(2000).springify()}
              source={images.polygon}
              style={styles.logoBg}
            />
            <Animated.Image
              entering={FadeIn.delay(700).duration(2000).springify()}
              source={images.logo}
              style={styles.logo}
            />
          </View>
          <Animated.Text
            entering={FadeIn.delay(500).duration(2000).springify()}
            style={styles.title}>
            {'eSparkBiz\nBooks'}
          </Animated.Text>
          <Animated.Text
            entering={FadeIn.delay(700).duration(2000).springify()}
            style={styles.subTitle}>
            Issue your book
          </Animated.Text>
          <Animated.View
            style={styles.form}
            entering={FadeInDown.delay(800).duration(2000).springify()}>
            <TextInput
              placeholder="username"
              placeholderTextColor={'rgba(255, 255, 255, 0.9)'}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="password"
              placeholderTextColor={'rgba(255, 255, 255, 0.9)'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
            />
          </Animated.View>
        </Animated.View>
        <View style={styles.footer}>
          <Animated.View
            style={styles.btnMain}
            entering={FadeInUp.delay(600).duration(1000).springify()}>
            <TouchableOpacity
              style={styles.btnContainer}
              activeOpacity={0.9}
              disabled={isUserLoading}
              onPress={onLogin}>
              {isUserLoading ? (
                <ActivityIndicator color={Colors.green} size={'small'} />
              ) : (
                <Text style={styles.btnText}>Login</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={styles.copyRightContainer}
            entering={FadeInDown.delay(800).duration(1000).springify()}>
            <AntDesign
              name={'copyright'}
              size={scale(16)}
              color={Colors.green}
            />
            <Text style={styles.copyRightText}>
              {' 2010-2023 eSparkbiz Technologies Private Limited.'}
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
