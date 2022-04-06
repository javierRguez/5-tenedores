import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TopRestaurants from '../screens/TopRestaurants'

const Stack = createNativeStackNavigator()

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top-restaurants"
        component={TopRestaurants}
        options={{ title: 'Los Mejores Restaurantes' }}
      />
    </Stack.Navigator>
  )
}
