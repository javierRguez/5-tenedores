import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RestaurantsScreen } from '../screens/RestaurantsScreen'
import { screen } from './screenName'

const Stack = createNativeStackNavigator()

export function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.restaurants}
        component={RestaurantsScreen}
        options={{ title: 'Restaurantes' }}
      />
    </Stack.Navigator>
  )
}
