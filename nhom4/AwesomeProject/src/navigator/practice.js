
import React,{Component} from 'react';
import { StyleSheet,Text, View,SafeAreaView,ScrollView } from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Grid, Col, Row } from 'native-base';
import { TouchableHighlight } from 'react-native-gesture-handler';
import HeaderApp from '../component/HeaderApp';

export default class Practice extends Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.route.params.data
        }
    }
    
    render(){
        return(
            <View >
                {HeaderApp(this.props.navigation,this.props.route.params.namePage)}
                <ScrollView style={[styles.scrollView,{marginBottom:60}]}>
                    {this.showContent(this.state.data)}
                </ScrollView>
            </View>
        )
    }
    showContent(obj){
        let arr=[];
        if(obj!=undefined){
            for(var key in obj){
                arr.push(
                    <View key={key}>
                        <Text style={[styles.nameTest,{backgroundColor:'green',lineHeight:40,color:'#fff',paddingLeft:5}]}>{obj[key].name}</Text>
                        <Text style={[styles.title,{paddingLeft:5}]}>Hướng dẫn:</Text>
                        <View style={{paddingLeft:10}}>{this.show(obj[key].request)}</View>
                        <Text style={[styles.title,{paddingLeft:5}]}>Lỗi phạt:</Text>
                        <View style={{paddingLeft:10}}>{this.show(obj[key].error)}</View>
                        <TouchableHighlight onPress={()=>this.props.navigation.push("ViewPageWeb")}>
                            <Text style={styles.link}>Video hướng dẫn</Text>
                        </TouchableHighlight>
                    
                    </View>

                );
            }
        };
        return arr;
    }
    show(obj){
        let arr=[];
        if(obj!=undefined){
            for(var key in obj){
                arr.push(
                    <Text key={key}>-{obj[key]}</Text>
                );
            }
        };
        return arr;
    }

}
styles=StyleSheet.create({
    nameTest:{
        fontSize:18,
        fontWeight:'bold'
    },
    title:{
        fontSize:16,
        fontWeight:'bold'
    },
    link:{
        color:'green',
        fontSize:18,
        margin:10,
        fontStyle:'italic',
        backgroundColor:'orange'
    }

})