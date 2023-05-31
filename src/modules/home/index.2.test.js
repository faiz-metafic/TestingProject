import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import axios from 'axios';
import Home from '.';

jest.mock('axios');

describe('Home component', () => {
  // Test case for invalid Email
  it('should display error message for invalid email', () => {
    // Rendering the Component
    const {getByTestId} = render(<Home />);
    // Getting the emailInput Instance
    const emailInput = getByTestId('EmailInput');
    // Getting the button Instance
    const button = getByTestId('Button');

    // changing text on email input to test
    fireEvent.changeText(emailInput, 'test');

    //Pressing the button
    fireEvent.press(button);

    //Getting the invalid Email Text instance
    const invalidEmailText = getByTestId('InvalidEmail');
    expect(invalidEmailText).toBeTruthy();
  });

  it('should display error message for invalid password', () => {
    const {getByTestId} = render(<Home />);
    const passwordInput = getByTestId('PasswordInput');
    const button = getByTestId('Button');

    fireEvent.changeText(passwordInput, '123456');

    fireEvent.press(button);

    const invalidPasswordText = getByTestId('InvalidPassword');
    expect(invalidPasswordText).toBeTruthy();
  });

  it('should make a GET request and update email on successful submission', async () => {
    // Rendering the UI
    const {getByTestId} = render(<Home />);

    // getting Buttons Instance
    const button = getByTestId('Button');

    // getting TextInputs Instance
    const emailInput = getByTestId('EmailInput');
    const passwordInput = getByTestId('PasswordInput');

    // Changing the values in Text Input to pass the validation
    fireEvent.changeText(emailInput, 'testasd');
    fireEvent.changeText(passwordInput, 'testdsadas');

    // Mocking the API
    axios.get.mockResolvedValue({data: 'jhgdajhdgjkashdkjhaskdk'});

    // Pressing the Button
    fireEvent.press(button);

    // Checking the URL
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1',
    );

    // Waiting for the api response
    await act(async () => {
      await expect(axios.get).toHaveBeenCalledTimes(1);
    });
    // expected output
    expect(emailInput.props.value).toBe('mail@gmail.com');
  });

  it('should make a GET request and update email on Failure submission', async () => {
    // Rendering the UI
    const {getByTestId} = render(<Home />);

    // getting Buttons Instance
    const button = getByTestId('Button');

    // getting TextInputs Instance
    const emailInput = getByTestId('EmailInput');
    const passwordInput = getByTestId('PasswordInput');

    // Changing the values in Text Input to pass the validation
    fireEvent.changeText(emailInput, 'testasd');
    fireEvent.changeText(passwordInput, 'testdsadas');

    // Mocking the API
    axios.get.mockRejectedValueOnce({});

    // Pressing the Button
    fireEvent.press(button);

    // Checking the URL
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1',
    );

    // Waiting for the api response
    await act(async () => {
      await expect(axios.get).toHaveBeenCalled();
    });
    // expected output
    expect(emailInput.props.value).toBe('testasd');
  });

  it('should not display error messages for valid email and password', () => {
    const {getByTestId, queryByTestId} = render(<Home />);
    const emailInput = getByTestId('EmailInput');
    const passwordInput = getByTestId('PasswordInput');
    const button = getByTestId('Button');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '12345678');

    fireEvent.press(button);

    expect(queryByTestId('InvalidEmail')).toBeNull();
    expect(queryByTestId('InvalidPassword')).toBeNull();
  });
});
