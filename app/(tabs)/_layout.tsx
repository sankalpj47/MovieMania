import { View, Text, ImageBackground,Image} from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
// import { icons } from '@/constants/icons'

const Tabicon= ({focused,title}: any ) => {
  if(focused){
  return (
    <ImageBackground
      source={images.highlight}
      className='flex flex-row w-full flex-1 min-w-[110px] min-h-20  justify-center items-center rounded-full  overflow-hidden'
    >
    
      <Text className='text-neutral-900  font-extrabold'>{title}</Text>
    </ImageBackground>
  )
}
else{
  return (
    <View className='flex flex-row w-full flex-1 min-w-[97px] min-h-12 justify-center items-center overflow-hidden'>
      <Text className='text-gray-300'>{title}</Text>
    </View>
  )
}
}

const _layout = () => {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, 
      tabBarStyle : {
        backgroundColor: '#0f0D23',
        // height: '13%',
        marginHorizontal : 20,
        marginBottom : 56,
        height: 52,
        position: 'absolute',
        overflow: 'hidden',
        borderRadius: 32,
        borderWidth : 1,
      },
      tabBarItemStyle : {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 10,
      }
    }}>
        <Tabs.Screen
        name="index"
        options={{
            title: "Home",
          headerShown: false,
          tabBarIcon:({focused}) => (
            <Tabicon 
             focused={focused}
             title="Home"
            />
          )
        }} />

        <Tabs.Screen
        name="search"
        options={{
           title: "Search",
         headerShown: false,
         tabBarIcon:({focused}) => (
           <Tabicon 
            focused={focused}
            title="Search"
           />
         )
        }} />
         
       
         <Tabs.Screen
        name="saved"
        options={{
            title: "Saved",
          headerShown: false,
          tabBarIcon:({focused}) => (
            <Tabicon 
             focused={focused}
             title="Saved"
            />
          )
        }} />


    </Tabs>
  )
}

export default _layout