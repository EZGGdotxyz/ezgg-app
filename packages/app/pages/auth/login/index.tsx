/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-08-04 19:00:59
 * @FilePath: /snapx-nfc-app-merchants/packages/app/pages/auth/login/index.tsx
 */
import {
  Adapt,
  AppHeaderProps,
  AppImage,
  FontSizeTokens,
  HeaderBackButton,
  Paragraph,
  Select,
  SelectProps,
  Sheet,
  XStack,
  YStack,
  Text,
  getFontSize,
  View,
  Button,
  Dialog,
  ExternalLink,
  SizableText,
  Input,
  useToastController,
  ScrollView,
} from '@my/ui';
import {Check, ChevronDown, ChevronRight, ChevronUp, LockKeyhole, User} from '@tamagui/lucide-icons';
import AppButton from 'app/Components/AppButton';
import {ExternalLinkData, PrimaryColor} from 'app/config';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import useRequest from 'app/hooks/useRequest';

import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Modal,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import {useRematchModel} from 'app/store/model';
import useUser from 'app/hooks/useUser';
import AppLoading from 'app/Components/AppLoading';
import {createParam} from 'solito';
import {useRouter} from 'solito/router';
import PermissionPage from 'app/Components/PermissionPage';
// import {
//   memberCaptchaSendSignInCode,
//   memberCaptchaSendSignUpCode,
//   memberCaptchaVerifySignUpCode,
// } from 'app/servers/api/1001Huiyuanyanzhengma';
import OtpInput from './components/OtpInput';
import RecommendList from './components/RecommendList';
import CountryPopup from './components/CountryPopup';
import Feedback from 'app/Components/Feedback';
import IosPopup from './components/IosPopup';
// import {memberProfileUpdateMemberProfile} from 'app/servers/api/1002Huiyuangerenxinxi';
import {appScale} from 'app/utils';
import {phoneAreaCodeRouterPagePhoneAreaCode} from 'app/servers/api/9999Dianhuaquyudaima';
import {
  restaurantUserAuthRouterListRestaurantByUserPhone,
  restaurantUserAuthRouterSendSignInCode,
  restaurantUserAuthRouterSignInByPassword,
} from 'app/servers/api/1000Cantingdengludengchu';
import {debounce, throttle} from 'lodash';
import RestaurantPopup from './components/RestaurantPopup';

interface LoginHomeProps {
  InstagramLogin: any;
  AppleLogin: any;
  GoogleLogin: any;
}
let timerId: any = null;

// 验证码倒计时
const initialCount = 30;

const defaultPhoneAreaCode = {
  id: 98,
  createBy: 0,
  updateBy: 0,
  createAt: '2024-01-08T16:09:42.768Z',
  updateAt: '2024-01-08T16:09:42.768Z',
  deleteAt: 0,
  englishName: 'Hong Kong S.A.R.',
  chineseName: '中国香港',
  countryCode: 'HK',
  phoneCode: '852',
  emoji: '🇭🇰',
  mix: 'Hong Kong S.A.R.中国香港HK852',
};

// 登录
const LoginHomeScreen = (props: LoginHomeProps) => {
  const {InstagramLogin, AppleLogin, GoogleLogin} = props;
  const {t, i18n} = useTranslation();
  const [app] = useRematchModel('app');
  const {_memberAuthSignUp, _accountLogin, onLink} = useUser();
  const toast = useToastController();
  const {makeRequest} = useRequest();
  const scheme = 'light';

  const [step, setStep] = useState('home');
  // 是否显示加载弹窗
  const [isLoading, setIsLoading] = useState(false);
  const [areaCodeList, setAreaCodeList] = useState<any[]>([]);
  // 区号
  const [phoneAreaCode, setPhoneAreaCode] = useState<any>(defaultPhoneAreaCode);

  // 手机号
  const [phone, setPhone] = useState('');
  // 餐厅
  const [restaurantInfo, setRestaurantInfo] = useState<any>({});
  // 验证码
  const [captcha, setCaptcha] = useState('');

  // 倒计时
  const [count, setCount] = useState(initialCount);
  // 昵称
  const [nickname, setNickname] = useState('');
  // 是否发送短信
  const [isActive, setIsActive] = useState(false);
  //加载状态
  const [loading, setLoading] = useState({
    phone: false,
    otp: false,
    name: false,
    account: false,
  });

  const [accountForm, setAccountForm] = useState({
    account: '',
    password: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [phoneAreaCodeValue, setPhoneAreaCodeValue] = useState(defaultPhoneAreaCode.phoneCode);
  const [restaurantUserList, setRestaurantUserList] = useState([]);

  useEffect(() => {
    if (isActive) {
      if (count !== 0) {
        timerId = setInterval(() => {
          setCount((prevCount) => prevCount - 1);
        }, 1000);
      } else {
        clearInterval(timerId);
        setIsActive(false);
      }
    } else if (!isActive && count !== 0) {
      clearInterval(timerId);
      setIsActive(false);
    }
    return () => clearInterval(timerId);
  }, [isActive, count]);

  useEffect(() => {
    if (phoneAreaCode?.phoneCode && phone) {
      _restaurantUserAuthRouterListRestaurantByUserPhone(phoneAreaCode?.phoneCode, phone);
    }
  }, [phoneAreaCode, phone]);

  const _restaurantUserAuthRouterListRestaurantByUserPhone = useCallback(
    debounce(async (phoneCode, _phone) => {
      const res = await makeRequest(
        restaurantUserAuthRouterListRestaurantByUserPhone({
          phoneAreaCode: phoneCode,
          phone: _phone,
        }),
      );
      if (res && res.length) {
        setRestaurantUserList(res);
        setRestaurantInfo(res[0]);
      } else {
        setRestaurantUserList([]);
        setRestaurantInfo({});
      }
    }, 300),
    [],
  );
  // const _restaurantUserAuthRouterListRestaurantByUserPhone = async (phoneCode, _phone) => {};

  const reset = async () => {
    const res = await makeRequest(
      restaurantUserAuthRouterSendSignInCode({
        restaurantId: restaurantInfo?.id,
        phoneAreaCode: phoneAreaCode?.phoneCode,
        phone,
      }),
    );
    if (res) {
      setIsActive(true);
      setCount(initialCount);
    }
  };

  useEffect(() => {
    // if (params?.first) {
    //   setIsLoading(false);
    // }
    if (Platform.OS === 'web') {
    } else {
      setIsLoading(false);
    }
  }, [app]);

  const _getAreaCodeList = async () => {
    const res = await makeRequest(
      phoneAreaCodeRouterPagePhoneAreaCode({
        page: 1,
        pageSize: 999,
      }),
    );
    if (res?.record) {
      let _phoneAreaCode: any = {};
      const _areaCodeList = res?.record.map((item) => {
        if (item?.phoneCode === '852') {
          _phoneAreaCode = item;
        }
        return item;
      });
      setAreaCodeList(_areaCodeList);
      setPhoneAreaCode(_phoneAreaCode);
    }
  };

  const homeContinue = () => {
    setStep('phone');
  };

  const selectCountry = (item) => {
    setRestaurantInfo(item);
    setModalVisible(false);
  };

  // 手机号下一步
  const phoneContinue = async () => {
    if (!phone) {
      toast.show(t('login.input.placeholder') + t('login.home.phone.input.placeholder'), {
        type: 'error',
      });
      return;
    }
    setLoading({
      ...loading,
      phone: true,
    });
    const res = await makeRequest(
      restaurantUserAuthRouterSendSignInCode({
        restaurantId: restaurantInfo?.id,
        phoneAreaCode: phoneAreaCode?.phoneCode,
        phone,
      }),
    );
    setLoading({
      ...loading,
      phone: false,
    });
    if (res) {
      setStep('otp');
      setIsActive(true);
      setCount(initialCount);
    }
  };

  const accountContinue = async () => {
    if (!accountForm.account) {
      toast.show(t('login.input.placeholder') + t('login.home.phone.input.placeholder'), {
        type: 'error',
      });
      return;
    }
    if (!accountForm.password) {
      toast.show(t('login.input.placeholder') + t('login.home.phone.input.placeholder'), {
        type: 'error',
      });
      return;
    }
    setLoading({
      ...loading,
      account: true,
    });
    const res = await _accountLogin({
      ...accountForm,
    });
    setLoading({
      ...loading,
      account: false,
    });
    if (res?.id) {
      onLink();
    }
  };

  // 验证码登录
  const otpContinue = async () => {
    if (!captcha) {
      toast.show(t('login.input.placeholder') + t('login.home.code.title.main'), {
        type: 'error',
      });
      return;
    }
    setLoading({
      ...loading,
      otp: true,
    });
    const res = await _memberAuthSignUp({
      restaurantId: restaurantInfo?.id,
      phoneAreaCode: phoneAreaCode?.phoneCode,
      phone,
      captcha,
      app: Platform.OS !== 'web',
    });
    setLoading({
      ...loading,
      otp: false,
    });
    if (res?.id) {
      onLink();
    }
  };

  const handelPhoneAreaCode = (value) => {
    const _phoneAreaCode = areaCodeList.find((item) => {
      if (item?.phoneCode === value) {
        return item;
      }
    });
    if (_phoneAreaCode) {
      setPhoneAreaCode(_phoneAreaCode);
    } else {
      setPhoneAreaCode({});
    }
  };

  useEffect(() => {
    _getAreaCodeList();
    return () => {
      setStep('home');
      setCaptcha('');
      setPhone('');
      setNickname('');
      setIsActive(false);
      setLoading({
        phone: false,
        otp: false,
        name: false,
        account: false,
      });
      setCount(initialCount);
    };
  }, []);

  return (
    <PermissionPage isLoginPage>
      {isLoading && <AppLoading />}
      <YStack position="relative" flex={1} width={'100%'} h={'100%'}>
        <ScrollView bc="$background">
          <Feedback>
            <YStack
              alignItems="center"
              jc={'space-between'}
              w={'100%'}
              flex={1}
              h={'100%'}
              overflow="hidden"
              minHeight={app.appHeight}
              bc="$background"
            >
              {step === 'home' && (
                <YStack w={'100%'} h={'100%'} flex={1} alignItems="center" jc={'flex-end'}>
                  <XStack w={'100%'} pos="absolute" t={0} l={0} r={0}>
                    <AppImage
                      width={appScale(375)}
                      height={appScale(586)}
                      src={require('app/assets/images/v2/logo_bg.jpg')}
                      type="local"
                    />
                  </XStack>
                  <YStack
                    h={appScale(340)}
                    w={'100%'}
                    alignItems="center"
                    jc={'flex-end'}
                    bc={'$background'}
                    borderTopLeftRadius={24}
                    borderTopRightRadius={24}
                  >
                    <XStack jc={'center'} mb={'$4'} borderRadius={'$4'} overflow="hidden">
                      <AppImage
                        width={appScale(101)}
                        height={appScale(83)}
                        src={require('app/assets/images/v2/logo.png')}
                        type="local"
                      />
                    </XStack>
                    <YStack w="100%" jc={'center'} ai={'center'} mb={'$4'}>
                      <Paragraph fontWeight={'500'} w={appScale(340)} fontSize={'$4'} textAlign="center">
                        {t('login.home.title.main1')}
                      </Paragraph>
                    </YStack>
                    <XStack w={appScale(320)} mb="$2">
                      <AppButton
                        onPress={() => {
                          setStep('account');
                        }}
                      >
                        {t('operate.button.account')}
                      </AppButton>
                    </XStack>
                    <XStack w="100%" jc="center" mb="$2">
                      <Paragraph fontWeight={'400'} fontSize={'$3'} color={'$color11'} textAlign="center">
                        or
                      </Paragraph>
                    </XStack>
                    <XStack w={appScale(320)} mb="$2">
                      <AppButton onPress={homeContinue}> {t('operate.button.mobile')}</AppButton>
                    </XStack>
                    {/* <XStack alignItems="center" justifyContent="center" width={'100%'} mb="$4">
                      <AppleLogin />
                      <GoogleLogin />
                      <InstagramLogin />
                    </XStack> */}
                    <XStack w="100%" jc={'center'} pb="$4">
                      <Paragraph fontWeight={'400'} color={'#767676'} fontSize={'$2'} textAlign="center">
                        {t('login.home.about')}
                      </Paragraph>
                      <ExternalLink href={ExternalLinkData.webPageHome}>
                        <Paragraph
                          fontWeight={'400'}
                          style={{textDecorationLine: 'underline'}}
                          color={PrimaryColor}
                          fontSize={'$2'}
                          textAlign="center"
                          marginLeft={3}
                        >
                          {t('login.home.here')}
                        </Paragraph>
                      </ExternalLink>
                    </XStack>
                  </YStack>
                </YStack>
              )}
              {step === 'phone' && (
                <YStack
                  w="100%"
                  pl={appScale(16)}
                  pr={appScale(16)}
                  pt={appScale(184)}
                  alignItems="center"
                  position="relative"
                >
                  <YStack w="100%">
                    <SizableText col={'$color'} fontSize={'$3'} fow={'500'}>
                      {t('login.home.phone.title.main')}
                    </SizableText>
                  </YStack>
                  <YStack w="100%" mb={'$4'}>
                    <SizableText col={'$color11'} fontSize={'$1'}>
                      {t('login.home.phone.input.tips')}
                    </SizableText>
                  </YStack>
                  <XStack
                    h={44}
                    ai={'center'}
                    w={'100%'}
                    // jc={'space-between'}
                    borderWidth={1}
                    borderColor={'$color'}
                    borderRadius={10}
                    mb={'$4'}
                  >
                    <XStack
                      h={'100%'}
                      pr={appScale(8)}
                      flexShrink={0}
                      w={appScale(96)}
                      pl={appScale(8)}
                      ai={'center'}
                      // onPress={() => {
                      //   setModalVisible(true);
                      // }}
                    >
                      <SizableText w={appScale(36)} color={'$color'} size={'$3'} ta={'center'}>
                        {phoneAreaCode?.emoji ? phoneAreaCode?.emoji + ' +' : '?'}
                      </SizableText>
                      <XStack w={appScale(44)}>
                        <Input
                          unstyled
                          value={phoneAreaCodeValue}
                          style={{width: '100%', borderWidth: 0, height: appScale(42)}}
                          onChangeText={(text) => {
                            const newText = text.replace(/[^\d]+/, '');
                            setPhoneAreaCodeValue(newText);
                            handelPhoneAreaCode(newText);
                          }}
                          color={'$color'}
                          keyboardType="phone-pad"
                        />
                      </XStack>
                    </XStack>
                    <XStack flexShrink={0} h={20} width={1} backgroundColor={'#C7C7C7'}></XStack>
                    <XStack w={'100%'} flex={1}>
                      <Input
                        unstyled
                        style={{borderWidth: 0, paddingLeft: 16, paddingRight: 16, height: 50, flex: 1, width: '100%'}}
                        value={phone}
                        onChangeText={(text) => {
                          const newText = text.replace(/[^\d]+/, '');
                          setPhone(newText);
                        }}
                        color={'$color'}
                        keyboardType="phone-pad"
                        placeholder={t('login.input.placeholder')}
                      />
                    </XStack>
                  </XStack>
                  {restaurantInfo?.id && (
                    <Button
                      unstyled
                      pressStyle={{
                        opacity: 0.85,
                      }}
                      h={44}
                      ai={'center'}
                      w={'100%'}
                      flexDirection="row"
                      // jc={'space-between'}
                      borderWidth={1}
                      borderColor={'$color'}
                      borderRadius={10}
                      mb={'$4'}
                      jc="center"
                      space={0}
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    >
                      <SizableText color={'$color'} size={'$3'} ta={'center'} ai={'center'}>
                        {i18n.language === 'zh_HK' ? restaurantInfo?.name : restaurantInfo?.en_name}
                      </SizableText>
                      <ChevronRight color={'$color'} />
                    </Button>
                  )}

                  {/* <YStack mb={'$6'}>
                    <SizableText col={'#767676'} fontSize={'$2'}>
                      {t('login.home.phone.input.tips')}
                    </SizableText>
                  </YStack> */}
                  <XStack w={appScale(343)}>
                    <AppButton isLoading={loading.account} onPress={phoneContinue}>
                      {t('operate.button.continue')}
                    </AppButton>
                  </XStack>
                </YStack>
              )}
              {step === 'otp' && (
                <YStack
                  w="100%"
                  pl={appScale(16)}
                  pr={appScale(16)}
                  pt={appScale(184)}
                  alignItems="center"
                  position="relative"
                >
                  <YStack w="100%">
                    <SizableText col={'$color'} fontSize={'$3'} fow={'500'}>
                      {t('login.home.code.title.main')}
                    </SizableText>
                  </YStack>
                  <YStack w="100%" mb={'$4'}>
                    <SizableText col={'$color11'} fontSize={'$1'}>
                      {t('login.home.phone.input.tips')}
                    </SizableText>
                  </YStack>
                  <XStack w="100%" mb={'$3'} ai={'center'} jc={'center'}>
                    <OtpInput value={captcha} setValue={setCaptcha} />
                  </XStack>
                  {isActive && (
                    <XStack mb={'$4'} w="100%">
                      {i18n.language === 'zh_HK' ? (
                        <>
                          <SizableText col={PrimaryColor} fontSize={'$2'}>
                            {count + t('login.home.code.input.tips2')}
                          </SizableText>
                          <SizableText col={'$color9'} fontSize={'$2'}>
                            {t('login.home.code.input.tips')}
                          </SizableText>
                        </>
                      ) : (
                        <>
                          <SizableText col={'$color9'} fontSize={'$2'}>
                            {t('login.home.code.input.tips')}
                          </SizableText>
                          <SizableText col={PrimaryColor} fontSize={'$2'}>
                            {count + t('login.home.code.input.tips2')}
                          </SizableText>
                        </>
                      )}
                    </XStack>
                  )}
                  {!isActive && (
                    <XStack mb={'$4'} w="100%">
                      <Button
                        chromeless
                        fontSize={'$2'}
                        unstyled
                        pressStyle={{
                          opacity: 0.85,
                        }}
                        color={'$blue11'}
                        onPress={reset}
                      >
                        {t('operate.button.resend')}
                      </Button>
                    </XStack>
                  )}
                  <XStack w={appScale(343)}>
                    <AppButton isLoading={loading.otp} onPress={otpContinue}>
                      {t('operate.button.login')}
                    </AppButton>
                  </XStack>
                </YStack>
              )}

              {step === 'account' && (
                <YStack
                  w="100%"
                  pl={appScale(16)}
                  pr={appScale(16)}
                  pt={appScale(184)}
                  alignItems="center"
                  position="relative"
                >
                  <YStack w="100%">
                    <SizableText col={'$color'} fontSize={'$3'} fow={'500'}>
                      {t('login.home.account.title.main')}
                    </SizableText>
                  </YStack>
                  <YStack w="100%" mb={'$4'}>
                    <SizableText col={'$color11'} fontSize={'$1'}>
                      {t('login.home.account.input.tips')}
                    </SizableText>
                  </YStack>
                  <XStack
                    h={44}
                    ai={'center'}
                    w={'100%'}
                    borderWidth={1}
                    borderColor={'$color'}
                    borderRadius={10}
                    mb={'$4'}
                  >
                    <XStack h={'100%'} flexShrink={0} w={appScale(40)} jc="center" ai={'center'}>
                      <User size={'$1'} color={'$color'} />
                    </XStack>
                    <XStack flexShrink={0} h={20} width={1} backgroundColor={'#C7C7C7'}></XStack>
                    <XStack w={'100%'} flex={1}>
                      <Input
                        unstyled
                        style={{borderWidth: 0, paddingLeft: 16, paddingRight: 16, height: 50, flex: 1, width: '100%'}}
                        value={accountForm.account}
                        onChangeText={(text) => {
                          setAccountForm({
                            ...accountForm,
                            account: text,
                          });
                        }}
                        color={'$color'}
                        placeholder={t('login.input.placeholder')}
                      />
                    </XStack>
                  </XStack>
                  <XStack
                    h={44}
                    ai={'center'}
                    w={'100%'}
                    borderWidth={1}
                    borderColor={'$color'}
                    borderRadius={10}
                    mb={'$4'}
                  >
                    <XStack h={'100%'} flexShrink={0} w={appScale(40)} jc="center" ai={'center'}>
                      <LockKeyhole size={'$1'} color={'$color'} />
                    </XStack>
                    <XStack flexShrink={0} h={20} width={1} backgroundColor={'#C7C7C7'}></XStack>
                    <XStack w={'100%'} flex={1}>
                      <Input
                        unstyled
                        style={{borderWidth: 0, paddingLeft: 16, paddingRight: 16, height: 50, flex: 1, width: '100%'}}
                        value={accountForm.password}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                          setAccountForm({
                            ...accountForm,
                            password: text,
                          });
                        }}
                        color={'$color'}
                        placeholder={t('login.input.placeholder')}
                      />
                    </XStack>
                  </XStack>

                  {/* <YStack mb={'$6'}>
                    <SizableText col={'#767676'} fontSize={'$2'}>
                      {t('login.home.phone.input.tips')}
                    </SizableText>
                  </YStack> */}
                  <XStack w={appScale(343)}>
                    <AppButton isLoading={loading.phone} onPress={accountContinue}>
                      {t('operate.button.login')}
                    </AppButton>
                  </XStack>
                </YStack>
              )}

              {/* {step === 'recommend' && (
                <YStack w="100%" alignItems="center" position="relative">
                  <YStack mb={'$3'}>
                    <SizableText col={'$color'} fontSize={'$5'} fow={'600'}>
                      {t('login.recommend.title.main')}
                    </SizableText>
                  </YStack>
                  <RecommendList />
                  <XStack w={'90%'}>
                    <AppButton
                      onPress={() => {
                        onLink();
                      }}
                    >
                      {t('operate.button.continue')}
                    </AppButton>
                  </XStack>
                </YStack>
              )} */}
              <XStack
                pos="absolute"
                l={appScale(16)}
                t={appScale(16 + 22)}
                backgroundColor={'$background'}
                borderRadius={appScale(16)}
                h={appScale(32)}
                w={appScale(32)}
                ai={'center'}
                jc={'center'}
                onPress={() => {
                  if (step === 'recommend') {
                    onLink();
                  } else if (step === 'name') {
                    setStep('otp');
                  } else if (step === 'otp') {
                    setStep('phone');
                  } else if (step === 'phone') {
                    setStep('home');
                  } else {
                    onLink();
                  }
                }}
              >
                <AppImage
                  width={appScale(24)}
                  height={appScale(24)}
                  src={
                    scheme === 'dark'
                      ? require('app/assets/images/v2/dark/arrow-left.png')
                      : require('app/assets/images/v2/arrow-left.png')
                  }
                  type="local"
                />
              </XStack>
              {(step === 'phone' || step === 'otp') && (
                <YStack pb={'$4'} pt={'$10'} b={0} l={0} w={'100%'} alignItems="center" justifyContent="center">
                  <XStack>
                    <Paragraph fontWeight={'400'} color={'#767676'} fontSize={'$2'} textAlign="center">
                      {t('login.home.phone.agree')}
                    </Paragraph>
                  </XStack>
                  <XStack>
                    <ExternalLink href={ExternalLinkData.webPagePrivacy}>
                      <Paragraph
                        fontWeight={'400'}
                        style={{textDecorationLine: 'underline'}}
                        color={PrimaryColor}
                        fontSize={'$2'}
                        textAlign="center"
                        marginRight={3}
                      >
                        {t('login.home.phone.policy')}
                      </Paragraph>
                    </ExternalLink>
                    <Paragraph fontWeight={'400'} color={'#767676'} fontSize={'$2'} textAlign="center">
                      &
                    </Paragraph>
                    <ExternalLink href={ExternalLinkData.webPageAgreement}>
                      <Paragraph
                        fontWeight={'400'}
                        style={{textDecorationLine: 'underline'}}
                        color={PrimaryColor}
                        fontSize={'$2'}
                        textAlign="center"
                        marginLeft={3}
                      >
                        {t('login.home.phone.terms')}
                      </Paragraph>
                    </ExternalLink>
                  </XStack>
                </YStack>
              )}
            </YStack>
          </Feedback>
        </ScrollView>
      </YStack>
      <RestaurantPopup
        restaurantUserList={restaurantUserList}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectCountry={selectCountry}
        restaurantInfo={restaurantInfo}
      />
    </PermissionPage>
  );
};
export default LoginHomeScreen;
