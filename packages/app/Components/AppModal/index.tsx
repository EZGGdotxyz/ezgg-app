/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 14:30:43
 * @FilePath: /ezgg-app/packages/app/Components/AppModal/index.tsx
 */
import {Button, Paragraph, YStack} from '@my/ui';
import {PrimaryColor} from 'app/config';
import {useRematchModel} from 'app/store/model';
import {Modal, TouchableWithoutFeedback, View} from 'react-native';

interface AppButtonProps {
  modalVisible: any;
  setModalVisible: (values) => void;
  children: React.ReactNode;
  animationType?: string;
  zIndex: number;
  isExit?: boolean;
}

export default function AppModal(props: AppButtonProps) {
  const {modalVisible, setModalVisible, children, animationType = 'fade', zIndex = 10, isExit = true} = props;
  const [app] = useRematchModel('app');

  const onExit = () => {
    if (isExit) {
      setModalVisible(false);
    }
  };

  return (
    <Modal
      animationType={'fade'}
      onDismiss={onExit}
      onRequestClose={onExit}
      transparent={true}
      visible={modalVisible}
      zIndex={zIndex}
      useNativeDriver={true}
      statusBarTranslucent={true}
    >
      <YStack pos={'relative'} width={app.appWidth} height={app?.appHeight} bc={'rgba(0, 0, 0, 0.5)'}>
        <Button
          unstyled
          pressStyle={{
            opacity: 0.85,
          }}
          chromeless
          w={'100%'}
          height={'100%'}
          bc={'rgba(0, 0, 0, 0.5)'}
          onPress={onExit}
        ></Button>
        {children}
      </YStack>
    </Modal>
  );
}
