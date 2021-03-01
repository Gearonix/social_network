import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const pt = (param,def='0px') => (props) => props[param] ? props[param] : def
export const Button = styled.TouchableOpacity`
  background : ${pt('background')};
  border: ${pt('border','none')};
  border-radius: ${pt('borderRadius','40px')};
  width: ${pt('width')};
  height: ${pt('height')};
  margin: ${pt('m','0px')};
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
`

export const Margin0Auto = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${pt('mt')};
  margin-right: ${pt('mr')};
  margin-left: ${pt('ml')};
  margin-bottom: ${pt('mb')};
`
export const Text = styled.Text`
  color : ${pt('color','white')};
  font-size: ${pt('fontSize','18px')};
  text-align: ${pt('ta','left')};
  margin-top: ${pt('mt')};
  margin-right: ${pt('mr')};
  margin-left: ${pt('ml')};
  margin-bottom: ${pt('mb')};
`
export const Container = styled.ScrollView`
  width: 100%;
  position: relative;
  background: rgba(25, 26, 29, 1);
`
export const Flex = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${pt('jc','flex-start')};
  align-items: ${pt('ai','flex-start')};
`
export const Page = styled.View`
  width: 100%;
  height: ${Dimensions.get('window').height-50+'px'};
  background: rgba(25, 26, 29, 1);

`
export const FullContainer = styled(Container)`
  height: 100%;
`
console.log(Dimensions.get('window').height)