import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../App'
import { StackNavigation } from '../App'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type MyStockDetailProps = {
  route: RouteProp<RootStackParamList, 'MyStockDetail'>
}

const MyStockDetail: React.FC<MyStockDetailProps> = ({ route }) => {
  const { product, brandName, brandImage } = route.params;

  const images: { [key: string]: any } = {
    "brandImage1": require('../assets/picture/Inked_Organics.jpg'),
    "brandImage2": require('../assets/picture/Moloko.jpg'),
  }

  const imageProduct: { [key: string]: any } = {
    "productImage1": require('../assets/picture/keto_seeds_bread.png'),
    "Inked Organics": require('../assets/picture/Inked_Organics.jpg'),
    "Moloko": require('../assets/picture/Moloko.jpg'),
  }

  const navigation = useNavigation<StackNavigation>();

  return (
    <View style={styles.contrainer}>
      <View style={styles.brandContrainer}>
        <Image source={images[brandImage]} style={styles.brandImage} />
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginLeft: 10 }}>{brandName}</Text>
      </View>
      <View style={styles.productContrainer}>
        <Image source={imageProduct[product.Image ? product.Image : brandName]} style={styles.productImage} />
        <View style={{ alignItems: 'center', marginTop: 15, backgroundColor: '#fff', height: 100 }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>{product.productName}</Text>
          </View>
          <View style={styles.unitContainer}>
            <Text style={{ color: '#5E8A93' }}>{product.Units + " Units"}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.textBottom}>Cese UPC</Text>
        <Text>{product.CaseUPC}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.textBottom}>Bar Code</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name='barcode-scan' size={20} />
          <Text>  {product.BarCode}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => { navigation.goBack() }}>
        <View style={styles.closeContainer}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Close</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default MyStockDetail

const styles = StyleSheet.create({
  contrainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  brandContrainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    marginTop: 10,
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 1,
  },
  productContrainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 1,
  },
  brandImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'black',
    margin: 5,
  },
  productImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#F3F3F3',
    margin: 5,
  },
  unitContainer: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#DFF6FE',
    margin: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#F3F3F3',
  },
  textBottom: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  closeContainer: {
    backgroundColor: '#495261',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    margin: 20,
    borderRadius: 15,
  },
})