import { View, StyleSheet, FlatList } from 'react-native'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import LogOutButton from '../../components/LogOutButton'
import { supabase } from '../../../utils/supabase'
import { type Memo } from '../../../types/memo'

const handlePress = (): void => {
  router.push('/memo/create')
}
const List = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([])
  const navigation = useNavigation()
  const abortController = new AbortController()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton/>
      }
    })
  }, [])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const session = await supabase.auth.getSession()

        const fetchDataPromise = supabase
          .from('users')
          .select('*')
          .eq('uid', session.data.session?.user.id)
          .order('created_at', { ascending: false })

        const { data, error } = await fetchDataPromise

        if (!abortController.signal.aborted) {
          if (error !== null) {
            console.error('Error fetching data:', error.message)
          } else {
            const remoteMemos: Memo[] = data.map((item: any) => ({
              id: item.id,
              memo: item.memo,
              day: item.day
            }))
            setMemos(remoteMemos)
            console.log('RemoteMemos', remoteMemos)
          }
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    void fetchData()

    return () => {
      abortController.abort()
    }
  }, [navigation])

  useEffect(() => {
    const fetchMemos = supabase
      .channel('users')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'users'
        },
        (payload: any) => {
          console.log('PAYLOAD', payload)
          if (payload.event === 'INSERT') {
            const { day, memo } = payload.new
            setMemos((prevMemos) => [...prevMemos, { day, memo }])
          }
          if (payload.eventType === 'DELETE') {
            setMemos((prevMemos) => prevMemos.filter((prevMemo) => prevMemo.id !== payload.old.id))
          }
          if (payload.eventType === 'UPDATE') {
            const { id, memo } = payload.new
            setMemos((prevMemos: Memo[] | undefined) => {
              // 更新対象のメモのインデックスを探す
              const updatedMemoIndex = prevMemos.findIndex((item: { id: any }) => item.id === id)
              if (updatedMemoIndex !== -1) {
                // 更新が見つかった場合、新しいメモで更新する
                const updatedMemos = [...prevMemos]
                updatedMemos[updatedMemoIndex] = { id, memo }
                console.log('updatedMemos', updatedMemos)
                return updatedMemos
              }
              // 更新が見つからない場合、何も変更せずに返す
              return prevMemos
            })
          }
          // setMemos(payload.new.memo)
          // 配列のものに上書きしている
          // INSERTの表示がまだできてない？
          console.log(memos)
        }
      )
      .subscribe()
    return () => {
      void fetchMemos.unsubscribe()
    }
  }, [])

  return (
        <View style={styles.container}>
          <FlatList
            data={memos}
            renderItem={({ item }) => <MemoListItem memo={item}/>}
          />
            <CircleButton onPress={handlePress}>
                <Icon name='plus' size={40} color='#ffffff'/>
            </CircleButton>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})

export default List
