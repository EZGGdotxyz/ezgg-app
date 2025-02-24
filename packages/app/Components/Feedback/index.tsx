/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2024-01-20 20:09:45
 * @FilePath: /snapx-nfc-app/packages/app/Components/Feedback/index.tsx
 */

import {TouchableWithoutFeedback, Keyboard} from 'react-native';

interface FeedbackProps {
  children?: React.ReactNode;
}

export default function Feedback({children}: FeedbackProps) {
  return <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>;
}
