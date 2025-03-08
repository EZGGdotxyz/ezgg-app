/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 21:50:18
 * @FilePath: /ezgg-app/packages/app/pages/profile/helpCenter/index.tsx
 */
import {
  AppHeader,
  AppHeaderProps,
  HeaderBackButton,
  Paragraph,
  YStack,
  XStack,
  Text,
  Button,
  ScrollView,
  Input,
  SizableText,
} from '@my/ui';
import React, {useState, useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import PermissionPage from 'app/Components/PermissionPage';
import AppHeader2 from 'app/Components/AppHeader2';
import {ChevronDown, ChevronUp, Search, ChevronRight} from '@tamagui/lucide-icons';
import {appScale} from 'app/utils';
import SearchHeader from 'app/Components/SearchHeader';
import {PrimaryColor} from 'app/config';

// 幫助中心
const HelpCenterScreen = () => {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState('faq'); // 'faq' or 'contact'
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('General');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('');
  const scrollViewRef = useRef<any>(null);
  const faqScrollViewRef = useRef<any>(null);
  const contactScrollViewRef = useRef<any>(null);

  // 各类别的FAQ数据
  const generalFaqData = [
    {
      question: 'What is ezgg.app?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      category: 'General',
    },
    {
      question: 'How do I get started with ezgg?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'General',
    },
  ];

  const accountFaqData = [
    {
      question: 'How do I set up an account?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Account',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Account',
    },
  ];

  const paymentFaqData = [
    {
      question: 'How long does a transfer take?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Payment',
    },
    {
      question: 'Are there any fees?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Payment',
    },
  ];

  const balanceFaqData = [
    {
      question: 'How do I request money?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Balance',
    },
    {
      question: 'Can I send money internationally?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Balance',
    },
  ];

  // 所有FAQ数据的集合
  const allFaqData = [...generalFaqData, ...accountFaqData, ...paymentFaqData, ...balanceFaqData];

  // 根据当前选择的类别和搜索文本过滤FAQ数据
  const filteredFaqData = allFaqData.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch =
      searchText.trim() === '' ||
      item.question.toLowerCase().includes(searchText.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 联系方式数据
  const contactData = [
    {type: 'Customer Service', icon: 'headphones', title: t('profile.help.contactSupport.1')},
    {type: 'WhatsApp', icon: 'whatsapp', title: t('profile.help.contactSupport.2')},
    {type: 'Website', icon: 'globe', title: t('profile.help.contactSupport.3')},
    {type: 'Facebook', icon: 'facebook', title: t('profile.help.contactSupport.4')},
    {type: 'Twitter', icon: 'twitter', title: t('profile.help.contactSupport.5')},
    {type: 'Instagram', icon: 'instagram', title: t('profile.help.contactSupport.6')},
  ];

  // 分类数据
  const categories = [
    {
      value: 'General',
      label: t('profile.help.faq.general.title'),
    },
    {
      value: 'Account',
      label: t('profile.help.faq.account.title'),
    },
    {
      value: 'Payment',
      label: t('profile.help.faq.payment.title'),
    },
    {
      value: 'Balance',
      label: t('profile.help.faq.balance.title'),
    },
  ];
  // 水平滚动视图引用
  const categoriesScrollViewRef = useRef<any>(null);

  // 切换类别时滚动到顶部
  useEffect(() => {
    if (faqScrollViewRef.current) {
      faqScrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  }, [activeCategory]);

  // 切换标签时滚动到顶部
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  }, [activeTab]);

  // 搜索时滚动到顶部
  useEffect(() => {
    if (faqScrollViewRef.current && searchText.trim() !== '') {
      faqScrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  }, [searchText]);

  const toggleFaq = (question: string) => {
    setExpandedFaq(expandedFaq === question ? null : question);
  };

  const renderContactItem = (item: {type: string; icon: string; title: string}) => (
    <Button
      key={item.type}
      unstyled
      backgroundColor="#FAFAFA"
      mb={appScale(20)}
      borderRadius={12}
      paddingHorizontal={appScale(24)}
      paddingVertical={appScale(16)}
      borderWidth={1}
      borderColor="#eeeeee"
      pressStyle={{
        opacity: 0.85,
      }}
    >
      <XStack justifyContent="space-between" alignItems="center" width="100%">
        <XStack alignItems="center" space="$3">
          {/* 使用图标组件 */}
          <YStack width={24} height={24} justifyContent="center" alignItems="center">
            {item.icon === 'headphones' && <Text fontSize={20}>🎧</Text>}
            {item.icon === 'whatsapp' && <Text fontSize={20}>📱</Text>}
            {item.icon === 'globe' && <Text fontSize={20}>🌐</Text>}
            {item.icon === 'facebook' && <Text fontSize={20}>📘</Text>}
            {item.icon === 'twitter' && <Text fontSize={20}>📘</Text>}
            {item.icon === 'instagram' && <Text fontSize={20}>📷</Text>}
          </YStack>
          <SizableText col={'#212121'} fontSize={'$4'} fow="700">
            {item.title}
          </SizableText>
        </XStack>
        <ChevronRight size={appScale(20)} />
      </XStack>
    </Button>
  );

  const handleCategoryChange = (category, index) => {
    setActiveCategory(category);
    // 重置展开的FAQ
    setExpandedFaq(null);
    // 滚动到选中的分类按钮位置
    if (categoriesScrollViewRef.current) {
      // 获取按钮的位置信息
      // 计算滚动位置，使按钮居中显示
      categoriesScrollViewRef.current.scrollTo({
        x: index >= 2 ? 100 : 0, // 调整偏移量使按钮居中
        animated: true,
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // 重置搜索文本
    setSearchText('');
  };

  const onSearch = () => {};

  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2 title={t('screen.profile.helpCenter.title')} fallbackUrl="/profile" />

      {/* 标签切换 */}
      <XStack
        width="100%"
        borderBottomWidth={1}
        borderBottomColor="#EEEEEE"
        paddingHorizontal={appScale(24)}
        pt={appScale(12)}
      >
        <Button
          pos={'relative'}
          unstyled
          w={'50%'}
          ai={'center'}
          h={appScale(48)}
          onPress={() => handleTabChange('faq')}
          pressStyle={{
            opacity: 0.85,
          }}
        >
          <SizableText
            fontSize={'$4'}
            textAlign="center"
            fontWeight={'600'}
            color={activeTab === 'faq' ? '#212121' : '#9E9E9E'}
          >
            {t('profile.help.faq')}
          </SizableText>
          <XStack
            position="absolute"
            bottom={-2}
            h={4}
            w={'100%'}
            borderRadius={2}
            bc={activeTab === 'faq' ? PrimaryColor : 'transparent'}
          ></XStack>
        </Button>
        <Button
          pos={'relative'}
          unstyled
          w={'50%'}
          h={appScale(48)}
          ai={'center'}
          onPress={() => handleTabChange('contact')}
          pressStyle={{
            opacity: 0.85,
          }}
        >
          <SizableText
            fontSize={'$4'}
            textAlign="center"
            fontWeight={'600'}
            color={activeTab === 'contact' ? '#212121' : '#9E9E9E'}
          >
            {t('profile.help.contactSupport')}
          </SizableText>
          <XStack
            position="absolute"
            bottom={-2}
            h={4}
            w={'100%'}
            borderRadius={2}
            bc={activeTab === 'contact' ? PrimaryColor : 'transparent'}
          ></XStack>
        </Button>
      </XStack>

      <ScrollView ref={scrollViewRef} flex={1}>
        <YStack flex={1} paddingTop={appScale(12)}>
          {/* 搜索框 */}
          {activeTab === 'faq' && (
            <SearchHeader
              placeholder={t('home.search')}
              onSearch={onSearch}
            />
          )}

          {activeTab === 'faq' && (
            <YStack flex={1}>
              {/* 分类按钮 */}
              <ScrollView
                ref={categoriesScrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                paddingHorizontal={appScale(24)}
                paddingBottom={appScale(12)}
              >
                <XStack space={'$4'}>
                  {categories.map((category, index) => (
                    <Button
                      key={category.value}
                      unstyled
                      borderWidth={1}
                      borderColor={activeCategory === category.value ? PrimaryColor : '#E0E0E0'}
                      backgroundColor={activeCategory === category.value ? PrimaryColor : '#fff'}
                      paddingHorizontal={appScale(20)}
                      paddingVertical={appScale(8)}
                      borderRadius={appScale(22)}
                      pressStyle={{
                        opacity: 0.85,
                      }}
                      onPress={() => handleCategoryChange(category.value, index)}
                    >
                      <SizableText size="$4" height={appScale(28)} lh={appScale(28)} color={'#212121'} fow={'600'}>
                        {category.label}
                      </SizableText>
                    </Button>
                  ))}
                </XStack>
              </ScrollView>

              {/* FAQ列表 */}
              <ScrollView ref={faqScrollViewRef} flex={1} paddingHorizontal={appScale(24)} paddingTop={appScale(12)}>
                {filteredFaqData.length > 0 &&
                  filteredFaqData.map((item) => (
                    <YStack
                      key={item.question}
                      backgroundColor="#FAFAFA"
                      borderRadius={12}
                      pl={appScale(24)}
                      pr={appScale(24)}
                      mb={appScale(20)}
                      overflow="hidden"
                      borderWidth={1}
                      borderColor="#eeeeee"
                      animation="quick"
                    >
                      <Button
                        paddingVertical={appScale(16)}
                        onPress={() => toggleFaq(item.question)}
                        key={item.question}
                        unstyled
                        pressStyle={{
                          opacity: 0.85,
                        }}
                      >
                        <XStack justifyContent="space-between" alignItems="center" width="100%">
                          <XStack alignItems="center" space="$3">
                            <SizableText col={'#212121'} fontSize={'$4'} fow="700">
                              {item.question}
                            </SizableText>
                          </XStack>
                          {expandedFaq === item.question ? <ChevronUp size={appScale(20)} /> : <ChevronDown size={appScale(20)} />}
                        </XStack>
                      </Button>
                      <YStack
                        height={expandedFaq === item.question ? 'auto' : 0}
                        opacity={expandedFaq === item.question ? 1 : 0}
                        animation={[
                          'quick',
                          {
                            opacity: {
                              overshootClamping: true,
                            },
                            height: {
                              // type: "spring",
                              damping: 15,
                              mass: 1,
                              stiffness: 120,
                            },
                          },
                        ]}
                        overflow="hidden"
                      >
                        <YStack paddingVertical={appScale(16)} borderTopColor={'#eeeeee'} borderTopWidth={1}>
                          <SizableText col={'#424242'} fontSize={'$4'} fow="500">
                            {item.answer}
                          </SizableText>
                        </YStack>
                      </YStack>
                    </YStack>
                  ))}
              </ScrollView>
            </YStack>
          )}

          {activeTab === 'contact' && (
            <ScrollView ref={contactScrollViewRef} flex={1}>
              {contactData.map(renderContactItem)}
            </ScrollView>
          )}
        </YStack>
      </ScrollView>
    </PermissionPage>
  );
};

export default HelpCenterScreen;
