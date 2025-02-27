/*
 * @Date: 2023-12-18 14:37:38
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 23:37:18
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

// 幫助中心
const HelpCenterScreen = () => {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState('faq'); // 'faq' or 'contact'
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('General');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('What is ezgg.app?');
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
    {type: 'Customer Service', icon: 'headphones'},
    {type: 'WhatsApp', icon: 'whatsapp'},
    {type: 'Website', icon: 'globe'},
    {type: 'Facebook', icon: 'facebook'},
    {type: 'Twitter', icon: 'twitter'},
    {type: 'Instagram', icon: 'instagram'},
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

  const renderFaqItem = (item: {question: string; answer: string}) => (
    <YStack key={item.question} backgroundColor="$background" marginBottom={8} borderRadius={8} overflow="hidden">
      <Button
        unstyled
        onPress={() => toggleFaq(item.question)}
        backgroundColor="$background"
        paddingVertical={16}
        paddingHorizontal={16}
      >
        <XStack justifyContent="space-between" alignItems="center" width="100%">
          <Text fontWeight="600" fontSize={16}>
            {item.question}
          </Text>
          {expandedFaq === item.question ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </XStack>
      </Button>
      {expandedFaq === item.question && (
        <YStack paddingHorizontal={16} paddingBottom={16}>
          <Text color="$gray10">{item.answer}</Text>
        </YStack>
      )}
    </YStack>
  );

  const renderContactItem = (item: {type: string; icon: string}) => (
    <Button
      key={item.type}
      unstyled
      backgroundColor="$background"
      marginBottom={8}
      borderRadius={8}
      paddingVertical={16}
      paddingHorizontal={16}
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
          <Text fontWeight="600" fontSize={16}>
            {item.type}
          </Text>
        </XStack>
        <ChevronRight size={20} />
      </XStack>
    </Button>
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // 重置展开的FAQ
    setExpandedFaq(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // 重置搜索文本
    setSearchText('');
  };

  return (
    <PermissionPage isHomePage={true}>
      <AppHeader2 title={t('screen.profile.helpCenter.title')} fallbackUrl="/profile" />

      {/* 标签切换 */}
      <XStack width="100%" borderBottomWidth={1} borderBottomColor="#EEEEEE">
        <Button
          unstyled
          flex={1}
          paddingVertical={12}
          onPress={() => handleTabChange('faq')}
          borderBottomWidth={activeTab === 'faq' ? 3 : 0}
          borderBottomColor={activeTab === 'faq' ? '#FFA500' : 'transparent'}
        >
          <Text
            textAlign="center"
            fontWeight={activeTab === 'faq' ? '600' : '400'}
            color={activeTab === 'faq' ? '#000000' : '#999999'}
          >
            FAQ
          </Text>
        </Button>
        <Button
          unstyled
          flex={1}
          paddingVertical={12}
          onPress={() => handleTabChange('contact')}
          borderBottomWidth={activeTab === 'contact' ? 3 : 0}
          borderBottomColor={activeTab === 'contact' ? '#FFA500' : 'transparent'}
        >
          <Text
            textAlign="center"
            fontWeight={activeTab === 'contact' ? '600' : '400'}
            color={activeTab === 'contact' ? '#000000' : '#999999'}
          >
            Contact Support
          </Text>
        </Button>
      </XStack>

      <ScrollView ref={scrollViewRef} flex={1}>
        {/* 搜索框 */}
        <YStack padding={16}>
          <XStack
            backgroundColor="#F5F5F5"
            borderRadius={8}
            paddingHorizontal={12}
            paddingVertical={8}
            alignItems="center"
          >
            <Search size={20} color="#999999" />
            <Input
              flex={1}
              marginLeft={8}
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
              borderWidth={0}
              backgroundColor="transparent"
            />
          </XStack>
        </YStack>

        {activeTab === 'faq' && (
          <YStack flex={1}>
            {/* 分类按钮 */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} paddingHorizontal={16} paddingBottom={8}>
              <XStack space={8}>
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    backgroundColor={activeCategory === category.value ? '#FFA500' : '#F5F5F5'}
                    paddingHorizontal={16}
                    paddingVertical={8}
                    borderRadius={16}
                    onPress={() => handleCategoryChange(category.value)}
                  >
                    <Text color={activeCategory === category.value ? '#FFFFFF' : '#000000'}>{category.label}</Text>
                  </Button>
                ))}
              </XStack>
            </ScrollView>

            {/* FAQ列表 */}
            <ScrollView ref={faqScrollViewRef} flex={1} paddingHorizontal={16} paddingTop={8}>
              {filteredFaqData.length > 0 ? (
                filteredFaqData.map(renderFaqItem)
              ) : (
                <YStack padding={16} alignItems="center">
                  <Text color="$gray10">No results found</Text>
                </YStack>
              )}
            </ScrollView>
          </YStack>
        )}

        {activeTab === 'contact' && (
          <ScrollView ref={contactScrollViewRef} flex={1} paddingHorizontal={16} paddingTop={16}>
            {contactData.map(renderContactItem)}
          </ScrollView>
        )}
      </ScrollView>
    </PermissionPage>
  );
};

export default HelpCenterScreen;
