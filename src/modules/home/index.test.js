import {render, screen, fireEvent} from '@testing-library/react-native';
import Home from '.';
import renderer from 'react-test-renderer';

test('invalid Email', () => {
  render(<Home/>)
  const EmailInput = screen.getByPlaceholderText('Email')
  fireEvent.changeText(EmailInput,'')
  const PasswordInput = screen.getByPlaceholderText('Password')
  fireEvent.changeText(PasswordInput,'')
  const submitButton=screen.getByTestId('Button')
  fireEvent.press(submitButton)
  const InvalidEmail=screen.getByTestId('InvalidEmail')
  const InvalidPassword=screen.getByTestId('InvalidPassword')
  expect(InvalidEmail).toBeTruthy()
  expect(InvalidPassword).toBeTruthy()
  fireEvent.changeText(EmailInput,'dsadasdasd')
  fireEvent.changeText(PasswordInput,'dsadasdasd')
  fireEvent.press(submitButton)
});

