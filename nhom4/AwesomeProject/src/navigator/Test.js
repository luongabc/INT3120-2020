
import React, { Component, useState, useEffect } from 'react';
import {
  Text, View, Image
} from 'react-native';
import {
  Container, Header, Tab, Tabs,
  ScrollableTab, Button,  Right, Content,Icon,Title,Body,
  ListItem, CheckBox
} from 'native-base';
import { FirebaseApp } from '../component/FirebaseConfig';
import ComponentCommon from '../component';
import HeaderApp from '../component/HeaderApp';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading:true
    };
  }
  componentDidMount() {
    var listQuestion = this.props.route.params.data.Question.split(" ");
    if(listQuestion.length!=this.state.data.length){
      for (var i = 0; i < listQuestion.length; i++) {
        FirebaseApp.database().ref('Question').child(listQuestion[i]).once('value').then(snapshot => {
          this.setState({ data: [...this.state.data, snapshot.val()] });
        });
      }
    }
    let myInterval =setInterval(() => {if(listQuestion.length==this.state.data.length){
      this.setState({loading:false});
      clearInterval(myInterval);
      }; }, 1000);
  }
  render() {
    const { namePage } = this.props.route.params;
    const { navigation } = this.props;
    if(this.state.loading){
      return(
        <Container>
          {HeaderApp(navigation,this.props.route.params.namePage)}
        </Container>
      )
    }
    
      return (
        <Container>
        {HeaderApp(navigation,namePage)}
        <Content style={{ margin: 1 }}>
          <Header style={{ height: 30 }}>
            <Content>
              <ComponentCommon.CountDown startM={20} navigation={navigation} data={this.state.data} />
            </Content>
            <Right>
            <Button style={{ backgroundColor:'green'}}onPress={() => {
              navigation.pop();
              navigation.navigate("Result", { "namePage": "Kết quả thi", "data": this.state.data });
            }}>
              <Text style={{ color:'#fff'}} > Nộp bài</Text>
            </Button>
          </Right>
          </Header>
          <Tabs renderTabBar={() => <ScrollableTab />}>
            {this.state.data.map((question, i) => {
              if(question != null){
                let count = i + 1;
                return (
                  <Tab  heading={"Câu " + count} key={i}>
                    {this.ShowTabContent(question)}
                  </Tab>)
                }
            })}
          </Tabs>
        </Content>
        </Container>
      );
  }
  ShowTabContent(question) {
    const show = [];
    for (var key in question.Answers) {
      show.push(<ShowCheckBox answer={question.Answers[key]} key={key} />)
    };
    return (
      <View style={{ paddingTop: 10, paddingRight: 10 }}>
        <View >
          <Text style={{ color: 'blue', fontSize: 16, paddingLeft: 10 }}>{question.QuestionText}</Text>
          <Image style={{ resizeMode: 'center' }} source={{ uri: question.LinkImage, height: 200 }} />
        </View>
        {show}
      </View>
    );
  }
}

const ShowCheckBox = (props) => {
  const [select, setSelect] = useState(false);
  props.answer.select = select;
  return (
    <ListItem stype={{ flexDirection: 'row' }}>
      <CheckBox style={{ marginRight: 20 }} checked={select} onPress={() => {
        setSelect(!select);
      }} />
      <Text >{props.answer.AnswerText}</Text>
    </ListItem>
  );
}
