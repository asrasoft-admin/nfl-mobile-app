import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Texture, Header} from '../../common';
import SummaryCard from '../../common/SummaryCard';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const UserSummary = () => {
  const {summaryData} = useSelector(state => state.summaryData);
  const {summaryTotalData} = useSelector(state => state.summaryTotalData);
  const navigation = useNavigation();

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
          <View style={styles.disclaimerContainer}></View>
        </TouchableOpacity>
        <Text style={styles.disclaimerText}>
          Sync All your data to see the correct record
        </Text>
        <View>
          <SummaryCard
            data={summaryData?.data}
            cardTitle="Your Today's stats"
          />
        </View>
        <View>
          <SummaryCard
            data={summaryTotalData?.data}
            cardTitle="Your Total stats"
          />
        </View>
      </View>
    </View>
  );
};

export default UserSummary;
