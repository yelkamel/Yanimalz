import { StyleSheet } from 'react-native';
import theme from 'theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  timeStyle: {
    fontSize: theme.textSizes.xxsmall,
    color: theme.colors.primaryLight,
    fontFamily: theme.fontFamily.rubikRegular,
  },
  title: {
    fontSize: theme.textSizes.xsmall,
    fontFamily: theme.fontFamily.rubikRegular,
    color: theme.colors.primaryLight,
    marginBottom: 10,
    marginRight: 20,
    alignSelf: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
  },
  icon: {
    borderRadius: 40,
    opacity: 0.9,

  },
  textDescription: {
    marginLeft: 10,
    color: theme.colors.primaryLight,
  },
  // DETAIL
  eventPast: {
    height: theme.size.pastEventHeight,
    flex: 1,
  },
  nextEvent: {
    height: theme.size.nextEventHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  currentEvent: {
    height: theme.size.currentEventHeight,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 30,
  },
  lightShow: {
    width: 90,
    height: 70,
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 15,
    backgroundColor: theme.colors.accent,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 0,
    left: 10,
    borderRadius: 15,
  },
  borderOpen: {
    width: 90,
    height: 70,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
  },
  // COUTDOWN
  countDownInner: {
    color: theme.colors.white,
    marginVertical: 2,
    fontSize: 23,
    fontFamily: theme.fontFamily.rubikRegular,
  },
});
export default styles;
