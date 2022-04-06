import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Restaurants from '../screens/Restaurants'

const Stack = createNativeStackNavigator()

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants-init"
        component={Restaurants}
        options={{ title: 'Restaurantes' }}
      />
    </Stack.Navigator>
  )
}
