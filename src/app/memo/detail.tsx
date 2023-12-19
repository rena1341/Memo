import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { useState, useEffect } from 'react'
import { type Memo } from '../../../types/memo'
// import { type Memo } from '../../../types/memo'

const handlePress = (params: Memo): void => {
  router.push({ pathname: '/memo/edit', params: { id: params.id, memo: params.memo } })
}

const Detail = (): JSX.Element => {
  const params = useLocalSearchParams()
  const [memoText, setMemoText] = useState<null | Memo>(null)
  // ページがマウントされたときにサブスクリプションを開始
  useEffect(() => {
    console.log(typeof (params))
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const subscribe = setMemoText(params)
    console.log(params)
    // リスナーの解除
    return () => { void subscribe }
  }, [params])

  return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoList} numberOfLines={1}>{memoText?.memo}</Text>
                <Text style={styles.memoDate}>{memoText?.day}</Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>
                    {memoText?.memo}
                </Text>
            </ScrollView>
            <CircleButton style={{ top: 60, bottom: 'auto' }} onPress={() => { handlePress(params) }}>
                <Icon name='pencil' size={40} color='#ffffff'/>
            </CircleButton>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19
  },
  memoList: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold'
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16
  },
  memoBody: {
    paddingHorizontal: 27
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: '#000000'
  }
})

export default Detail
