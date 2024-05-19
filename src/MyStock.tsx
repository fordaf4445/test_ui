import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, } from 'react'
import { StackNavigation } from '../App'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import data from '../assets/data/data.json'

const MyStock = () => {
    const navigation = useNavigation<StackNavigation>();
    const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});

    const images: { [key: string]: any } = {
        "brandImage1": require('../assets/picture/Inked_Organics.jpg'),
        "brandImage2": require('../assets/picture/Moloko.jpg'),
    }

    const toggleExpand = (id: number) => {
        setIsExpanded(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    const maxText = (text: string, max: number) => {
        if (text.length > max) {
            return text.slice(0, max) + '...';
        }
        return text;
    }

    return (
        <View style={styles.contrainer}>
            <FlatList
                data={data.brands}
                keyExtractor={(item) => item.brand_id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => { toggleExpand(item.brand_id) }}>
                            <View style={styles.renderItemContrainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
                                    <Image source={images[item.brandImage]} style={styles.brandImage} />
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginLeft: 10 }}>{item.brandName}</Text>
                                </View>
                                <View style={{ paddingRight: 20 }}>
                                    <AntDesign name={isExpanded[item.brand_id] ? 'up' : 'down'} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {isExpanded[item.brand_id] && (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ paddingLeft: 20, height: 30, justifyContent: 'center' }}>
                                        <Text>Product</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingRight: 20, alignItems: 'center' }}>
                                        <Entypo name='dot-single' size={25} color={'#A4C8D4'} />
                                        <Text>Unit</Text>
                                        <Entypo name='dot-single' size={25} color={'#D7BB9A'} />
                                        <Text>Case</Text>
                                    </View>
                                </View>
                                <FlatList
                                    data={item.products}
                                    keyExtractor={(item) => item.product_id.toString()}
                                    renderItem={({ item: product }) => (
                                        <TouchableOpacity onPress={() => { navigation.navigate('MyStockDetail', { product, brandName: item.brandName, brandImage: item.brandImage }) }}>
                                            <View style={styles.productContainer}>
                                                <View >
                                                    <Text style={{ color: 'black', fontSize: 16 }}>{maxText(product.productName, 30)}</Text>
                                                </View>
                                                <View style={[styles.unitContainer]}>
                                                    <Text style={{ color: '#5E8A93' }}>{product.Units}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )} />
                            </View>
                        )}
                    </View>
                )} />
        </View>
    )
}

export default MyStock

const styles = StyleSheet.create({
    contrainer: {
        flex: 1,
    },
    renderItemContrainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
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
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 2,
    },
    unitContainer: {
        // borderWidth: 1,
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#DFF6FE'
    },
})