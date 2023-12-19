import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from './Icon'
import { Link } from 'expo-router'
import { type Memo } from '../../types/memo'
import { supabase } from '../../utils/supabase'

interface Props {
  memo: Memo
}

const handlePress = (memo: Memo): void => {
  Alert.alert('メモを削除します', 'よろしいですか？', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      style: 'destructive',
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onPress: async () => {
        try {
          const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', memo.id)
          if (error !== null) {
            Alert.alert('削除に失敗しました')
          }
        } catch (error) {
          console.error('Error during deletion:', error)
        }
      }
    }
  ])
}

const MemoListItem = (props: Props): JSX.Element | null => {
  const { memo } = props
  if (memo.memo === null || memo.day === null) {
    return null
  }
  return (
    <Link
      href={{ pathname: '/memo/detail', params: { id: memo.id, memo: memo.memo, day: memo.day } }}
      asChild
    >
        <TouchableOpacity style={styles.memoListItem}>
            <View>
                <Text numberOfLines={1} style={styles.memoListItemTitle}>{memo.memo}</Text>
                <Text style={styles.memoListItemDate}>{memo.day}</Text>
            </View>
            <TouchableOpacity onPress={() => { handlePress(memo) }}>
                <Icon name='delete' size={32} color='#B0B0B0' />
            </TouchableOpacity>
        </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)'
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484'
  }
})

export default MemoListItem
