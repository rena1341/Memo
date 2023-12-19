import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Link, router } from 'expo-router'

import Button from '../../components/Button'
import { useState } from 'react'
import { supabase } from '../../../utils/supabase'

const handlePress = async (email: string, password: string): Promise<void> => {
  try {
    // supabaseで用意されているログインの関数
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error !== null) throw new Error(error.message)
    // エラーハンドリング

    console.log(data.user)
    console.log(data.session)
    router.replace('/memo/list')
  } catch (error: any) {
    // エラーが発生した場合にアラートでエラー内容を表示
    Alert.alert('ユーザー名またはパスワードが正しくありません。再試行してください。')
  }
}

const LogIn = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
        <View style={styles.container}>
            <View style={styles.inner}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => { setEmail(text) }}
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='Email Address'
              textContentType='emailAddress'
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(text) => { setPassword(text) }}
              autoCapitalize='none'
              secureTextEntry
              placeholder='Password'
              textContentType='password'
            />
            <Button label='Submit' onPress={() => { void handlePress(email, password) }}/>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Not registered</Text>
                <Link href='/auth/sign_up' asChild replace>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}>Sign up here!</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            </View>
        </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16
  },
  footer: {
    flexDirection: 'row'
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#000000'
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3'
  }
})

export default LogIn
