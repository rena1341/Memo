import { View, TextInput, StyleSheet } from 'react-native'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { supabase } from '../../../utils/supabase'
import KeyboardSafeView from '../../components/KeyboardAboidingView'
const handlePress = async (memoText: string | object | undefined, params: any): Promise<void> => {
  console.log(memoText)
  const { data, error } = await supabase
    .from('users')
    .update([
      {
        memo: memoText
      }
    ])
    .eq('id', params.id)
  if (error !== null) {
    console.error('Error updating data:', error.message)
  } else {
    console.log('Data updated successfully:', data)
  }
  router.replace('memo/list')
}

const Edit = (): JSX.Element => {
  const params = useLocalSearchParams()
  const [memoText, setMemoText] = useState<object | undefined | string>(undefined)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    setMemoText(params.memo)
  }, [])

  return (
    <KeyboardSafeView style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
              multiline
              style={styles.input}
              value={memoText}
              onChangeText={(text) => { setMemoText(text) }}
              autoFocus
            />
        </View>
        <CircleButton onPress={() => { void handlePress(memoText, params) }}>
            <Icon name='check' size={40} color='#ffffff'/>
        </CircleButton>
    </KeyboardSafeView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24
  }
})
export default Edit
