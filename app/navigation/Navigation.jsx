import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@react-native-elements/base'
import RestaurantsStack from './RestaurantsStack'
import FavoritesStack from './FavoritesStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

function screenOptions(route, color) {
  let iconName
  switch (route.name) {
    case 'restaurant-stack':
      iconName = 'compass-outline'
      break
    case 'favorites-stack':
      iconName = 'heart-outline'
      break
    case 'top-restaurants-stack':
      iconName = 'star-outline'
      break
    case 'search-stack':
      iconName = 'magnify'
      break
    case 'account-stack':
      iconName = 'home-outline'
      break

    default:
      break
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurant-stack"
        screenOptions={({ route }) => ({
          tabBarInactiveTintColor: '#646464',
          tabBarActiveTintColor: '#00a680',
          headerShown: false,
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="restaurant-stack"
          component={RestaurantsStack}
          options={{ title: 'Restaurantes' }}
        />
        <Tab.Screen
          name="favorites-stack"
          component={FavoritesStack}
          options={{ title: 'Favoritos' }}
        />
        <Tab.Screen
          name="top-restaurants-stack"
          component={TopRestaurantsStack}
          options={{ title: 'Top 5' }}
        />
        <Tab.Screen
          name="search-stack"
          component={SearchStack}
          options={{ title: 'Buscador' }}
        />
        <Tab.Screen
          name="account-stack"
          component={AccountStack}
          options={{ title: 'Cuenta' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
