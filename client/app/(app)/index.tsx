import { Text, View } from 'react-native';

import { useSession } from '../../components/ctx';

export default function Index() {
  const { signOut } = useSession();
  const {session} = useSession();
  const {user} = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> {session} </Text>
      <Text> {user} </Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
