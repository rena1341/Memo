import { View, TextInput, StyleSheet } from 'react-native'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router } from 'expo-router'
import { supabase } from '../../../utils/supabase'
import { useState } from 'react'
import { formattedDate } from '../../components/GetDate'
// { year, month, day, hour, minute }
import KeyboardSafeView from '../../components/KeyboardAboidingView'

interface HandlePress {
  inputState: string
}
const handlePress = async ({ inputState }: HandlePress): Promise<void> => {
  const { data } = await supabase.auth.getSession()
  const uid = data.session?.user.id
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          memo: inputState,
          day: formattedDate,
          uid
        }
      ])
      // year + '/' + month + '/' + day + '/' + hour + ':' + minute
    if (error !== null) {
      console.error('Error inserting data:', error.message)
    } else {
      console.log('Data inserted successfully:', data)
    }
    router.back()
  } catch (error: any) {
    console.error('Unhandled Promise Rejection:', error.message)
  }
}

const Create = (): JSX.Element => {
  const [inputState, setInputState] = useState('')
  return (
    <KeyboardSafeView style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
              multiline
              style={styles.input}
              value={inputState}
              onChangeText={(text) => { setInputState(text) }}
              autoFocus
            />
        </View>
        <CircleButton onPress={() => { void handlePress({ inputState }) }}>
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
export default Create
