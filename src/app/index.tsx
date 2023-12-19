import { Redirect, router } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from '../../utils/supabase'

const Index = (): JSX.Element => {
  const getCurrentUser = async (): Promise<void> => {
    const { data } = await supabase.auth.getSession()
    const { session } = data

    if (session !== null && session !== undefined) {
      router.replace('memo/list')
    }
  }

  useEffect(() => {
    void getCurrentUser()
  }, [])

  return <Redirect href='auth/log_in'/>
}
export default Index
