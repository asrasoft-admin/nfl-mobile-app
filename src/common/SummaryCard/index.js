import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import {toTitleCase} from '../../helpers';

const SummaryCard = ({data, cardTitle}) => {
  return (
    <View style={styles.flatListContainer}>
      <Text style={styles.todayTextContainer}>{cardTitle}</Text>
      <FlatList
        data={data && Object.keys(data)}
        renderItem={({item, index}) => (
          <View style={styles.flatListContent} key={index}>
            <Text style={styles.heading}>{data && toTitleCase(item)} : </Text>
            <Text style={styles.title}>{data && data[item]}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SummaryCard;
