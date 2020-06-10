import React,{Component, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
    Text
  } from 'react-native';
export default class CountDown extends Component{
    run=false;
    constructor(props){
        super(props);
        this.state = {
            m:this.props.startM,
            s:0
        };
    }
    componentDidMount(){
        this.myInterval = setInterval(() => {
            const { s, m } = this.state;
            if (s > 0) {
              this.setState(({ s }) => ({
                s: s - 1
              }))
            }
            if (s === 0) {
              if (m === 0) {
                clearInterval(this.myInterval);
                this.props.navigation.pop();
                this.props.navigation.navigate("Result", { "namePage": "Kết quả thi", "data": this.props.data });
              } else {
                this.setState(({ m }) => ({
                  m: m - 1,
                  s: 59
                }))
              }
            }
          }, 1000);
    }
    componentWillUnmount(){
      clearInterval(this.myInterval);
    }
    render(){
        return(
            <Text style={{ color: '#fff', fontSize: 18 }}>Thời gian: {this.state.m}:{this.state.s}</Text>
        );
    }
}
CountDown.propTypes = {
    startM: PropTypes.number.isRequired,
};