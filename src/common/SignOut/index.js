import React, {useEffect} from 'react';
import style from './style';
import {Image, View, Text} from 'react-native';
import {Button} from '..';
import {Texture, Header} from '..';
import {useDispatch, useSelector} from 'react-redux';
import {axiosInstance} from '../../helpers';
import {
  getSummaryDataFail,
  getSummaryDataSucess,
} from '../../Redux/Actions/summary';
import SummaryCard from '../SummaryCard';

export const SignOut = ({navigation}) => {
  const user = useSelector(state => state.user);
  const summaryData = useSelector(state => state.summary);
  const dispatch = useDispatch();

  const handleAnotherRes = async () => {
    if (user.role === 'supervisor') {
      navigation.reset({
        index: 0,
        routes: [{name: 'SupervisorDetail'}],
      });
    } else if (user.role === 'consumer') {
      // const path = await audioRecorderPlayer.startRecorder();
      // if (path) dispatch(startRecording());
      navigation.reset({
        index: 0,
        routes: [{name: 'RecordAudio'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'ShopkeerDetail'}],
      });
    }
  };

  useEffect(() => {
    const date = new Date().toISOString();
    const dateRes = date.split('T')[0];
    axiosInstance
      .get('/customer/ba-summary', {
        params: {
          ba_id: user?.id,
          date: dateRes,
        },
      })
      .then(({data}) => {
        dispatch(getSummaryDataSucess(data));
        console.log(data, 'res');
      })
      .catch(err => {
        dispatch(getSummaryDataFail(err));
        console.log(err, 'err');
      });
  }, [user, dispatch]);

  return (
    <View style={style.root}>
      <Texture />
      <Header navigation={navigation} />
      <View style={style.overlay}>
        <View style={style.header}>
          <Image
            source={require('../../assets/images/smile.png')}
            style={style.image}
            resizeMode="contain"
          />
        </View>
        <View style={style.content}>
          <Text style={style.text}>
            Your data has been successfully submitted
          </Text>

          <SummaryCard
            data={summaryData?.summaryData?.data}
            cardTitle="Your Today's stats"
          />
        </View>

        <View style={style.footer}>
          <Button
            label="Submit another response "
            containerStyles={style.resBtn}
            onPress={handleAnotherRes}
          />
        </View>
      </View>
    </View>
  );
};
