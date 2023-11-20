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
            <Text style={styles.heading}>
              {data && toTitleCase(item) === 'Sales'
                ? 'Trials'
                : toTitleCase(item) === 'Total Sales'
                ? 'Total Trials'
                : toTitleCase(item)}{' '}
              :{' '}
            </Text>
            <Text style={styles.title}>{data[item] ? data[item] : 0}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SummaryCard;
