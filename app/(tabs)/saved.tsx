import { View, Text,Image } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'

const saved = () => {
  return (
    <View className='flex-1 bg-primary'>
         <Image
        className="absolute z-0 w-full h-full"
        source={images.bg}
        resizeMode="cover" 
      />
      <Text>saved</Text>
    </View>
  )
}

export default saved