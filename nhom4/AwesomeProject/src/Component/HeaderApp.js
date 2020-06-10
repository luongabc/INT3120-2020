import React from 'react';
import {
    View
  } from 'react-native';
import {
    Button, Body,
    Icon, Title,Header
} from 'native-base';

export default HeaderApp=(navigation,namePage)=>{
    return(
        <Header>
            <Button onPress={() => { navigation.goBack() }}>
                <Icon name="menu" ></Icon>
            </Button>
            <Body style={{ paddingLeft: 20 }}>
                <Title>{namePage}</Title>
            </Body>
        </Header>
    );
};