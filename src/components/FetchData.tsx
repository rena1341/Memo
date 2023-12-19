import { supabase } from '../../utils/supabase'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

interface MapNumber {
  i: number
}

const FetchData = ({ i }: MapNumber): JSX.Element | null => {
  const [data, setData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const session = await supabase.auth.getSession()
        const { data, error } = await supabase
          .from('User')
          .select('memo')
          .eq('uid', session.data.session?.user.id)
        console.log(data)
        if (error !== null) {
          throw new Error(error.message)
        }

        if (data !== null) {
          setData(data[i].memo)
        } else {
          throw new Error('Data not found')
        }
      } catch (error: any) {
        setError(error.message)
      }
    }

    void getData()
  }, [i])

  if (error !== null) {
    return <View><Text>Error: {error}</Text></View>
  }

  if (data !== null) {
    return <View><Text>{data}</Text></View>
  }

  return null
}

export default FetchData
