import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import { RestaurantsStack } from './RestaurantsStack'
import { FavoritesStack } from './FavoritesStack'
import { RankingStack } from './RankingStack'
import { SearchStack } from './SearchStack'
import { AccountStack } from './AccountStack'
import { screen } from './screenName'

const Tab = createBottomTabNavigator()

function screenOptions(route, color) {
  let iconName
  switch (route.name) {
    case screen.restaurant.tab:
      iconName = 'compass-outline'
      break
    case screen.favorites.tab:
      iconName = 'heart-outline'
      break
    case screen.ranking.tab:
      iconName = 'star-outline'
      break
    case screen.search.tab:
      iconName = 'magnify'
      break
    case screen.account.tab:
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
          name={screen.restaurant.tab}
          component={RestaurantsStack}
          options={{ title: 'Restaurantes' }}
        />
        <Tab.Screen
          name={screen.favorites.tab}
          component={FavoritesStack}
          options={{ title: 'Favoritos' }}
        />
        <Tab.Screen
          name={screen.ranking.tab}
          component={RankingStack}
          options={{ title: 'Ranking' }}
        />
        <Tab.Screen
          name={screen.search.tab}
          component={SearchStack}
          options={{ title: 'Buscar' }}
        />
        <Tab.Screen
          name={screen.account.tab}
          component={AccountStack}
          options={{ title: 'Cuenta' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
