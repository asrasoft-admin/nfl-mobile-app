import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Texture, Header} from '../../common';
import SummaryCard from '../../common/SummaryCard';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const UserSummary = () => {
  const summaryData = useSelector(state => state.summary);
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Texture />
        <Header />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/arrow.png')}
            style={styles.texture}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View>
          <SummaryCard
            data={summaryData?.summaryData?.data}
            cardTitle="Your Today's stats"
          />
        </View>
      </View>
    </View>
  );
};

export default UserSummary;
