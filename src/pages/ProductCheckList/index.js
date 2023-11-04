import React, {useState, useEffect} from 'react';
import style from './style';
import {Text, ScrollView, View} from 'react-native';
import {Header, Button, Texture, Spinner} from '../../common';
import CheckBox from '@react-native-community/checkbox';
import {useSelector, useDispatch} from 'react-redux';
import {axiosInstance, parseError} from '../../helpers';
import {productAction} from '../../Redux/Actions/products';

export const ProductCheckList = ({route, navigation}) => {
  const state = useSelector(states => states);
  const allProducts = state.allProducts;
  const user = state.user;
  const [modifiedAllProdcuts, setModifiedAllProducts] = useState([]);

  const dispatch = useDispatch();

  const handleValueChange = (index, newValue) => {
    setModifiedAllProducts(prevData => {
      let previousData = [...prevData];
      previousData[index].value = newValue;
      return previousData;
    });
  };

  useEffect(async () => {
    if (allProducts?.data?.length > 0) {
      const newProducts = allProducts.data.map(product => ({
        ...product,
        value: false,
      }));
      setModifiedAllProducts(newProducts);
    } else {
      await axiosInstance
        .get('/shop-keeper/all-shopkeeper-products')
        // .get('/static/all-products')
        .then(({data}) => {
          if (data.success) {
            dispatch(productAction(data.data));
          }
        })
        .catch(error => parseError(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts?.data]);

  const handleSubmit = async () => {
    let allProductsIds = [];

    modifiedAllProdcuts.forEach(product => {
      if (product.value === true) allProductsIds.push(product.id);
    });
    if (allProductsIds.length === 0) return;

    await axiosInstance
      .post('/shop-keeper/associate-products-shopKeeper', {
        shopKeeper_id: route.params.id,
        product_ids: allProductsIds,
        user_id: user.id,
      })
      .then(res => {
        if (res.data.success) {
          navigation.navigate('ImageCapture', {...route.params});
        }
      })
      .catch(error => {
        parseError(error);
      });
  };

  return (
    <View style={{height: '100%'}}>
      <Texture />
      <Header navigation={navigation} />
      {allProducts?.data?.length > 0 ? (
        <ScrollView contentContainerStyle={style.container}>
          <Text style={style.heading}> Product CheckList </Text>

          <View style={style.content}>
            <View>
              <Text style={style.subHeading}>Please Select</Text>
              {modifiedAllProdcuts.map((item, index) => (
                <View style={style.product} key={`product container ${index}`}>
                  <CheckBox
                    value={item.value}
                    onValueChange={newValue =>
                      handleValueChange(index, newValue)
                    }
                    style={style.checkBox}
                    tintColors={{false: 'green', true: 'green'}}
                  />
                  <Text style={style.description}>{item.name}</Text>
                </View>
              ))}
            </View>
            <Button
              label="Submit"
              onPress={handleSubmit}
              containerStyles={style.button}
            />
          </View>
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};
