/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import style from './style';

const list = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];

export const SearchableDropdowns = ({
  items = list,
  handleSelect,
  defaultIndex,
  selectedItems,
  placeholder,
  multi,
}) => {
  return (
    <SearchableDropdown
      multi={multi}
      defaultIndex={defaultIndex}
      onItemSelect={handleSelect}
      selectedItems={selectedItems}
      containerStyle={style.container}
      itemStyle={style.item}
      itemsContainerStyle={{maxHeight: 100}}
      items={items}
      resetValue={false}
      textInputProps={{
        placeholder: placeholder,
        placeholderTextColor: 'gray',
        underlineColorAndroid: 'transparent',
        style: style.textInput,
        onTextChange: text => text,
      }}
      listProps={{
        nestedScrollEnabled: true,
      }}
    />
  );
};
