import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import PictureSwitch from './pictureSwitch';
import { TIME_STATUS } from '../../data';


class Detail extends React.Component {
  state={
  }

  render() {
    const { rowData, setNotifForEvent, rowId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, {
            color: rowData.lineColor,
          }]}
        >
          {rowData.title}
        </Text>
        <PictureSwitch
          action={() => {
          setNotifForEvent(rowId);
        }}
          picture={rowData.picture}
          isOpen={rowData.hasNotif}
          enabled={rowData.status === TIME_STATUS[2]}
        />
      </View>

    );
  }
}

Detail.propTypes = {
  rowData: PropTypes.shape({
    hasNotif: PropTypes.bool.isRequired,
  }).isRequired,
  rowId: PropTypes.number.isRequired,
  setNotifForEvent: PropTypes.func.isRequired,
};

export default Detail;
