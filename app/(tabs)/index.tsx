import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/theme/theme-context';
import CustomButton from '@/components/ui/CustomButton';
import Button from '@/components/ui/CustomButton';
import Input from '@/components/ui/CustomTextInput';

export default function TabOneScreen() {
  const theme = useTheme();
  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Tab One</Text>
        <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
      </View>
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
