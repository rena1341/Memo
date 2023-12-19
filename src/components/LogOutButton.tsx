import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { supabase } from '../../utils/supabase'
import { router } from 'expo-router'

const LogOutButton = (): JSX.Element => {
  const handlePress = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
      router.replace('auth/log_in')
    } catch {
      Alert.alert('ログアウトに失敗しました')
    }
  }
  return (
    <TouchableOpacity>
        <Text style={styles.text} onPress={handlePress}>ログアウト</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.7)'
  }
})
export default LogOutButton
