import React, {useState, useEffect} from 'react';
import style from './style';
import {Text, ScrollView, View, ActivityIndicator} from 'react-native';
import {Header, Deal, Texture, Button, Dropdown, Input} from '../../common';
import {useForm} from 'react-hook-form';
import {axiosInstance} from '../../helpers';
import {widthPercentageToDP as wp} from 'utils/responsive';
import {pack_swap_product, Brand} from '../../dummyData';
import {parseError} from '../../helpers';
import {useSelector} from 'react-redux';
import {CustomSpinner} from '../../common/Spinner';

export const Deals = ({route, navigation, containerStyles}) => {
  const [isLoading, setLoading] = useState(false);
  const [allDeals, setAllDeals] = useState([]);
  const [allPackSwapProducts, setAllPackSwapProducts] = useState([]);

  const state = useSelector(state => state);
  const user = state.user;

  const {control, handleSubmit, formState} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const {errors} = formState;

  const deal = allDeals.find(item => item.selected === true);

  const packSwapValidation = (data, dealId) => {
    const packSwapProduct = allPackSwapProducts.find(
      item => item?.id === data?.pack_swap_product,
    );
    const previousBrand = Brand.find(item => item?.id === data.prevBrand);

    if (packSwapProduct?.id && previousBrand?.id && dealId) {
      return {
        valid: true,
        packSwapProduct,
        previousBrand,
      };
    } else if (packSwapProduct?.id || previousBrand?.id) {
      throw new Error('Please fill all details of Pack Swap');
    } else {
      return {
        valid: false,
        packSwapProduct: null,
        previousBrand: null,
      };
    }
  };

  const handleProceed = async data => {
    let allDealsIds = [];

    allDeals.forEach(deal => {
      if (deal.selected) allDealsIds.push(deal.id);
    });
    if (allDealsIds.length === 0) return;

    try {
      const {
        packSwapProduct,
        previousBrand,
        valid: packSwapValid,
      } = packSwapValidation(data, deal);

      if (deal?.id || packSwapValid || data.redemptionCode) {
        setLoading(true);
        const {data: resData} = await axiosInstance.post('/customer/add-deal', {
          customer_id: route.params?.id,
          deal_ids: allDealsIds,
          pack_swap_product: packSwapProduct?.name,
          pack_swap_brand: previousBrand?.name,
          pack_redemption_code: data.redemptionCode,
          user_id: user.id,
        });

        if (resData.success) {
          setLoading(false);
          navigation.navigate('SignOut');
        }
      } else if (packSwapValid) {
        throw new Error('Please select deal');
      } else throw new Error('Please select any one deal');
    } catch (error) {
      setLoading(false);
      parseError(error);
    }
  };

  const fetchDeals = async () => {
    await axiosInstance
      .get('/deal/specific-deals', {
        params: {
          category_id: user.category_id,
          activity_id: user.activity_id,
        },
      })
      .then(res => {
        if (res.data.success) {
          setAllDeals(res.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        parseError(error);
        setAllDeals([]);
      });
  };

  const fetchAllPackSwapProducts = async () => {
    await axiosInstance
      .get('/customer/all-pack-swap-products')
      .then(res => {
        if (res.data.success) {
          const packSwapProducts = [{name: 'Pack Swap Product', id: ''}];
          packSwapProducts.push(...res.data.data);
          setAllPackSwapProducts(packSwapProducts);
        }
      })
      .catch(error => {
        setLoading(false);
        parseError(error);
      });
  };

  useEffect(() => {
    fetchDeals();

    if (allPackSwapProducts.length === 0) {
      fetchAllPackSwapProducts();
    }
  }, []);

  const handleSelect = deal => {
    let deals = [...allDeals];
    const dealIndex = deals.findIndex(item => item.id === deal.id);

    if (deals[dealIndex].selected === true) {
      deals[dealIndex].selected = false;
      setAllDeals(deals);
    } else {
      deals[dealIndex].selected = true;
      setAllDeals(deals);
    }
  };

  const bogo = () => {
    return allDeals.length > 0 ? (
      <View style={style.allDeals}>
        <Text style={style.heading}>Deal Details</Text>
        {allDeals.map((deal, index) => (
          <Deal
            containerStyles={style.deal}
            handleSelect={() => handleSelect(deal)}
            deal={deal}
            key={`deal ${index}`}
          />
        ))}
      </View>
    ) : (
      <CustomSpinner />
    );
  };

  const packSwap = () => {
    return (
      <View>
        <Text style={style.heading}>Pack Swap</Text>
        <View style={style.allDeals}>
          <View
            style={[style.childContainer, containerStyles && containerStyles]}>
            <Dropdown
              control={control}
              name="pack_swap_product"
              error={!!errors?.pack_swap_product}
              message={errors?.pack_swap_product?.message}
              containerStyles={style.inputContainer}
              // items={pack_swap_product}
              items={allPackSwapProducts}
            />
            <Dropdown
              control={control}
              name="prevBrand"
              error={!!errors?.prevBrand}
              message={errors?.prevBrand?.message}
              containerStyles={style.inputContainer}
              items={Brand}
            />
          </View>
        </View>
      </View>
    );
  };

  const packRedemption = () => {
    return (
      <View>
        <Text style={style.heading}>Pack Redemption</Text>
        <View style={style.allDeals}>
          <View
            style={[style.childContainer, containerStyles && containerStyles]}>
            <Input
              ref={control}
              control={control}
              name="redemptionCode"
              placeholder="Redemption Code"
              error={!!errors?.redemptionCode}
              message={errors?.redemptionCode?.message}
              containerStyles={style.inputContainer}
            />
          </View>
        </View>
      </View>
    );
  };

  const madeEasy = () => {
    return (
      <View>
        <Text style={style.heading}>Made Easy</Text>
        <View style={style.allDeals}>
          <View
            style={[style.childContainer, containerStyles && containerStyles]}>
            <Input
              ref={control}
              control={control}
              name="madeEasy"
              placeholder="Reference id"
              error={!!errors?.madeEasy}
              message={errors?.madeEasy?.message}
              containerStyles={style.inputContainer}
            />
          </View>
        </View>
      </View>
    );
  };

  const dds = () => {
    return (
      <View>
        {bogo()}
        {packSwap()}
      </View>
    );
  };

  const mohallah = () => {
    return (
      <View>
        {bogo()}
        {packSwap()}
        {madeEasy()}
      </View>
    );
  };

  const trade = () => {
    return (
      <View>
        {bogo()}
        {packSwap()}
        {packRedemption()}
      </View>
    );
  };

  return (
    <View style={{height: '100%'}}>
      <Texture />
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={style.container}>
        {user?.activity_id === 1
          ? dds()
          : user?.activity_id === 2
          ? mohallah()
          : user?.activity_id === 3
          ? trade()
          : null}

        <Button
          label={!isLoading && 'Proceed'}
          primary={formState.isValid}
          icon={
            isLoading && (
              <ActivityIndicator
                style={{position: 'absolute', left: wp('36')}}
              />
            )
          }
          active={formState.isValid && !isLoading}
          onPress={handleSubmit(handleProceed)}
          containerStyles={style.btn}
        />
      </ScrollView>
    </View>
  );
};
