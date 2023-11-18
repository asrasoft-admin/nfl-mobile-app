import React, {useState, useEffect} from 'react';
import style from './style';
import {Text, ScrollView, View, ActivityIndicator} from 'react-native';
import {Header, Deal, Texture, Button, Dropdown, Input} from '../../common';
import {useForm} from 'react-hook-form';
import {axiosInstance, handleSync, stopRecording} from '../../helpers';
import {widthPercentageToDP as wp} from 'utils/responsive';
import {pack_swap_product, Brand} from '../../dummyData';
import {parseError} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {CustomSpinner} from '../../common/Spinner';
import {
  recordSuccess,
  stopAudioRecording,
  uploadSuccess,
} from '../../Redux/Actions/RecordAudio';
import uploadAudioToCloudinary from '../../services/cloudinary/Cloudinary';
import {saveUser} from '../../Redux/Actions/allUsers';

export const Deals = ({route, navigation, containerStyles}) => {
  const [isLoading, setLoading] = useState(false);
  const [allDeals, setAllDeals] = useState([]);
  const [allPackSwapProducts, setAllPackSwapProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const customer = useSelector(state => state.customer);
  const {allCustomersDetails} = useSelector(state => state.allCustomers);
  console.log({allCustomersDetails});
  const {
    isRecording,
    audioPath: audio,
    downloadLink: downloadUrl,
  } = useSelector(state => state.Recorder);
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const user = state.user;
  const {deals} = state.deals;

  const {control, handleSubmit, formState} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const {errors} = formState;

  const deal = allDeals.find(item => item.selected === true);

  const handleProceed = async data => {
    let allDealsIds = [];

    allDeals.forEach(deal => {
      if (deal.selected) allDealsIds.push(deal.id);
    });
    if (allDealsIds.length === 0) return;

    try {
      if (deal?.id) {
        let audioPath, downloadLink;
        console.log({downloadUrl});
        setLoading(true);
        if (audio) {
          audioPath = audio;
        } else {
          audioPath = await stopRecording();
          dispatch(stopAudioRecording(audioPath));
        }
        // if (Boolean(downloadUrl)) {
        //   downloadLink = downloadUrl;
        // } else {
        //   downloadLink = await uploadAudioToCloudinary(audioPath);
        //   if (!downloadLink)
        //     throw new Error('Something went wrong in recording audio');
        //   dispatch(uploadSuccess(downloadLink));
        // }

        const dealQty = quantities.filter(
          item => allDeals.find(it => it.id === item.id).selected,
        );
        if (dealQty.length === 0) {
          throw new Error('Select the deal');
        }
        console.log({dealQty});
        const qtyIsNull = dealQty.every(
          item => item.quantity === 0 && !Boolean(item.quantity),
        );
        // if (qtyIsNull) {
        //   throw new Error('Enter quantity of the selected deals');
        // }
        console.log({});
        const cusData = {
          ...customer,
          audioPath,
          audio_record_time: new Date().getTime(),
          audio_record_date: new Date(),
          deals: dealQty,
        };
        let filterDeal = [...deals];
        const dealIndex = filterDeal.findIndex(item => item.id === deal?.id);

        if (filterDeal[dealIndex].selected === true) {
          filterDeal[dealIndex].selected = false;
          setAllDeals(filterDeal);
        }

        if (user?.role === 'consumer') {
          // dispatch(saveUser(cusData));
          await handleSync([cusData]);
        }
        dispatch(recordSuccess());
        setLoading(false);
        navigation.navigate('SignOut');
        // const res = await axiosInstance.post('/customer/details', {
        //   ...customer,
        //   audio: downloadLink,
        //   audio_record_time: new Date().getTime(),
        //   audio_record_date: new Date(),
        // });
        // if (res.data.success) {
        //   dispatch(recordSuccess());
        //   const {data: resData} = await axiosInstance.post(
        //     '/customer/add-deal',
        //     {
        //       customer_id: res.data.data.id,
        //       deals: dealQty,
        //       user_id: user.id,
        //     },
        //   );

        //   if (resData.success) {
        //     setLoading(false);
        //     navigation.navigate('SignOut');
        //   }
        // }
      } else if (packSwapValid) {
        throw new Error('Please select deal');
      } else throw new Error('Please select any one deal');
    } catch (error) {
      setLoading(false);
      parseError(error);
    }
  };

  const fetchDeals = async () => {
    const temp = deals.map(item => ({id: item.id, quantity: 1}));
    setQuantities(temp);
    setAllDeals(deals);
  };

  useEffect(() => {
    fetchDeals();
    console.log({deals});
  }, []);

  const onChange = (dealId, quantity) => {
    const updatedQuantities = quantities.map(item => {
      if (item.id === dealId) {
        return {...item, quantity};
      }
      return item;
    });
    console.log({updatedQuantities});
    setQuantities(updatedQuantities);
  };
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
            onChange={onChange}
            quantities={quantities}
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
        {/* {packSwap()} */}
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
