import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {Texture, Header} from '../../common';
import SummaryCard from '../../common/SummaryCard';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  getSummaryDataFail,
  getSummaryDataSucess,
  getSummaryTotalDataFail,
  getSummaryTotalDataSuccess,
} from '../../Redux/Actions/summary';
import {axiosInstance} from '../../helpers';
import {heightPercentageToDP} from '../../utils/responsive';
import config from '../../config';

const UserSummary = () => {
  const {summaryData} = useSelector(state => state.summaryData);
  const {summaryTotalData} = useSelector(state => state.summaryTotalData);
  const user = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const syncDataFeatureFlag = config.featureFlags.syncDataFeature;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const date = new Date().toISOString();
    const dateRes = date.split('T')[0];
    setIsLoading(true);
    axiosInstance
      .get('/customer/ba-summary', {
        params: {
          ba_id: user?.id,
          date: dateRes,
        },
      })
      .then(({data}) => {
        dispatch(getSummaryDataSucess(data));
        setIsLoading(false);
        console.log(data, 'res');
      })
      .catch(err => {
        if (!err.response) {
          return parseError({message: 'No internet connection'});
        }
        dispatch(getSummaryDataFail(err));
        console.log(err, 'err');
      });

    axiosInstance
      .get('/customer/total-summary', {
        params: {
          ba_id: user?.id,
        },
      })
      .then(({data}) => {
        dispatch(getSummaryTotalDataSuccess(data));
      })
      .catch(err => {
        if (!err.response) {
          return parseError({message: 'No internet connection'});
        }
        dispatch(getSummaryTotalDataFail(err));
        console.log(err, 'err');
      });
  }, [user, dispatch]);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Texture />
        <Header />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowIconContainer}>
          <Image
            source={require('../../assets/images/arrow.png')}
            style={styles.texture}
            resizeMode="cover"
          />
        </TouchableOpacity>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={40} />
          </View>
        ) : (
          <>
            {syncDataFeatureFlag && (
              <View style={styles.disclaimerWarning}>
                <Text style={styles.disclaimerText}>
                  <Text style={styles.disclaimerHead}>Disclaimer : </Text>
                  Sync all your data to see the correct records!
                </Text>
              </View>
            )}

            <ScrollView scrollEnabled={syncDataFeatureFlag}>
              <View>
                <SummaryCard
                  data={summaryData?.data}
                  cardTitle="Your Today's Stats"
                />
              </View>
              <View style={{marginBottom: syncDataFeatureFlag ? 20 : 0}}>
                <SummaryCard
                  data={summaryTotalData?.data}
                  cardTitle="Your Total Stats"
                />
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
};

export default UserSummary;
