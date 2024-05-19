import { TouchableOpacity } from 'react-native'
import React from 'react'
import MyStock from './src/MyStock'
import MyStockDetail from './src/MyStockDetail'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp, } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome'

export type RootStackParamList = {
  MyStock: undefined;
  MyStockDetail: { product: Product; brandName: string; brandImage: string;};
}


type Product = {
  product_id: number;
  productName: string;
  Units: string;
  CaseUPC: string;
  BarCode: string;
  Image: string;
}


export type StackNavigation = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const BackButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
      <Icon name="chevron-left" color={"#000"} size={20} />
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='MyStock'
          component={MyStock}
          options={{
            title: 'My Stock',
            headerTitleAlign: 'center',
            headerLeft: () => (<BackButton onPress={() => { }} />)
          }}
        />
        <Stack.Screen
          name='MyStockDetail'
          component={MyStockDetail}
          options={({ navigation }) => ({
            title: 'My Stock',
            headerTitleAlign: 'center',
            headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
