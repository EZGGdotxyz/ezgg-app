/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 12:58:37
 * @FilePath: /ezgg-app/packages/app/Components/SearchHeader/index.tsx
 */
import {AppImage, Button, Input, SizableText, Text, XStack, useToastController} from '@my/ui';
import {Airplay, AlignJustify, ChevronRight, ChevronUp, ChevronDown, Trash2} from '@tamagui/lucide-icons';
import {useRematchModel} from 'app/store/model';
import {Platform} from 'react-native';
import {Link} from 'solito/link';
import {useRouter} from 'solito/router';
import {NativeModules} from 'react-native';
import {createRef, useEffect, useRef, useState} from 'react';
import {appScale} from 'app/utils';
import {useTranslation} from 'react-i18next';
import {YStack} from '@my/ui';
import {PrimaryColor} from 'app/config';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';

export type SearchHeaderProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  onSearch: (data: any) => void;
  placeholder: string;
};
// 首页 餐厅详情
const SearchHeader: React.FC<any> = ({searchText, setSearchText, onSearch, placeholder}: SearchHeaderProps) => {
  const [{unread}] = useRematchModel('app');
  const {push, back, replace} = useRouter();
  const {t, i18n} = useTranslation();
  const toast = useToastController();
  const scheme = 'light';
  const dispatch = useDispatch<Dispatch>();
  const inputRef = useRef(null);

  const getPt = () => {
    if (Platform.OS === 'web') {
      return 0;
    } else if (Platform.OS === 'ios') {
      return 48;
    } else {
      return 22;
    }
  };

  return (
    <YStack flexShrink={0} pos={'relative'} w="100%" pb={appScale(20)} pt={appScale(12)}>
      <XStack
        h={appScale(60)}
        w={'100%'}
        jc={'space-between'}
        ai={'center'}
        paddingLeft={appScale(24)}
        paddingRight={appScale(24)}
      >
        <XStack
          flex={1}
          borderRadius={12}
          paddingLeft={appScale(20)}
          paddingRight={appScale(20)}
          pt={appScale(18)}
          pb={appScale(18)}
          ai={'center'}
          bc={'#FAFAFA'}
        >
          <XStack w={'100%'} flex={1} ai="center" overflow="hidden">
            <AppImage
              width={appScale(20)}
              height={appScale(20)}
              src={require(`app/assets/images/search2.png`)}
              type="local"
            />
            <Input
              unstyled
              ref={inputRef}
              style={{
                borderWidth: 0,
                paddingLeft: 8,
                paddingRight: 8,
                height: 22,
                lineHeight: 22,
                fontSize: 14,
                flex: 1,
                color: '#212121',
              }}
              value={searchText}
              onChangeText={(text) => {
                // setSearchText(text);
                setSearchText(text);
              }}
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                  onSearch(searchText);
                }
              }}
              // color={'$color'}
              size={'$2'}
              fow={'400'}
              keyboardType="default"
              placeholder={placeholder}
            />
          </XStack>
          {/* <Button
            unstyled
            style={{
              borderRadius: 18,
              height: 36,
              paddingLeft: 16,
              paddingRight: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            pressStyle={{
              opacity: 0.85,
            }}
            bc={'$color'}
            flexShrink={0}
            onPress={() => {
              inputRef?.current?.blur();
              onSearch(searchText);
            }}
          >
            <SizableText size="$3" color={'$color1'} fow={'500'}>
              {t('card.search.btn')}
            </SizableText>
          </Button> */}
        </XStack>
      </XStack>
    </YStack>
  );
};

export default SearchHeader;
