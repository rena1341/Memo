import { View, Text, StyleSheet, type TextStyle } from 'react-native'

interface Props {
  children: string
  bang?: boolean
  style?: TextStyle
}

const Hello = (props: Props): React.JSX.Element => {
  const { children, bang, style } = props
  return (
        <View>
            <Text style={[styles.text, style]}>
            {/* 後のスタイルが優先される */}
                Hello {children} {bang === true ? '!' : '' }
            </Text>
        </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontWeight: 'bold'
  }
})

export default Hello
