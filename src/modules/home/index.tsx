import React, {Component} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import axios from 'axios';

interface State {
  email: string;
  password: string;
  showEmailError: boolean;
  showPasswordError: boolean;
}

export default class Home extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showEmailError: false,
      showPasswordError: false,
    };
  }

  verifyEmail = () => {
    return this.state.email.length < 5;
  };

  verifyPassword = () => {
    return this.state.password.length < 7;
  };

  onSubmitPress = () => {
    if (this.verifyEmail() || this.verifyPassword()) {
      if (this.verifyEmail()) {
        this.setState({showEmailError: true});
      } else {
        this.setState({showEmailError: false});
      }
      if (this.verifyPassword()) {
        this.setState({showPasswordError: true});
      } else {
        this.setState({showPasswordError: false});
      }
    } else {
      axios
        .get('https://jsonplaceholder.typicode.com/todos/1')
        .then(() => {
          this.setState({email: 'mail@gmail.com'});
          return {data: 'jhgdajhdgjkashdkjhaskdk'};
        })
        .catch(error => {
          return [];
        });
    }
  };

  render() {
    return (
      <View>
        <TextInput
          testID="EmailInput"
          placeholder="Email"
          value={this.state.email}
          onChangeText={(text: string) => {
            this.setState({
              ...this.state,
              email: text,
            });
          }}
        />
        {this.state.showEmailError && (
          <Text testID="InvalidEmail"> {'Invalid Email'} </Text>
        )}
        <TextInput
          testID="PasswordInput"
          placeholder="Password"
          value={this.state.password}
          onChangeText={(text: string) => {
            this.setState({
              ...this.state,
              password: text,
            });
          }}
        />
        {this.state.showPasswordError && (
          <Text testID="InvalidPassword"> {'Invalid Password'} </Text>
        )}
        <Button title="Submit" testID="Button" onPress={this.onSubmitPress} />
      </View>
    );
  }
}
