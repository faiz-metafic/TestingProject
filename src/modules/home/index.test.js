import {render, fireEvent} from '@testing-library/react-native';
import Home from '.';
// const findElement = (tree, element) => {
//   for (node in tree.children) {
//     if (tree.children[node].props.testID === element) return true;
//   }
// };

test('invalid Creds', () => {
  const screen = render(<Home />);
  const EmailInput = screen.getByPlaceholderText('Email');
  fireEvent.changeText(EmailInput, '');
  const PasswordInput = screen.getByPlaceholderText('Password');
  fireEvent.changeText(PasswordInput, '');
  const submitButton = screen.getByTestId('Button');
  fireEvent.press(submitButton);
  expect(screen.getAllByTestId('InvalidEmail').length).toBe(1);
  expect(screen.getAllByTestId('InvalidPassword').length).toBe(1);

  fireEvent.changeText(EmailInput, 'dsadasdasd');
  fireEvent.press(submitButton);
  expect(screen.getAllByTestId('InvalidPassword').length).toBe(1);

  fireEvent.changeText(EmailInput, '');
  fireEvent.changeText(PasswordInput, 'dsadasdasd');
  fireEvent.press(submitButton);
  expect(screen.getAllByTestId('InvalidEmail').length).toBe(1);

  fireEvent.changeText(EmailInput, 'dsadasdasd');
  fireEvent.press(submitButton);
});

// it('Checks API', () => {
//   const screen = render(<Home />);
//   const EmailInput = screen.getByPlaceholderText('Email');
//   const PasswordInput = screen.getByPlaceholderText('Password');
//   fireEvent.changeText(EmailInput, 'dsadasdasd');
//   fireEvent.changeText(PasswordInput, 'dsadasdasd');

//   // when all the conditions are matched
//   fireEvent.press(screen.getByTestId('Button'));

//   // then
//   // mockAxios.get.mockResolvedValueOnce({data: 'helloooo'});
//   mockAxios.mockImplementation(() =>
//     Promise.resolve(mockResponse).then(() => {}),
//   );

//   expect(mockAxios.get).toHaveBeenCalledWith(
//     'https://jsonplaceholder.typicode.com/todos/1',
//   );
//   console.log('EmailInput.props.value', screen.root);
//   // expect(EmailInput.props.value).toBe('Itsss')
// });

// test('API checking', async () => {
//   const screen = render(<Home />);
//   const EmailInput = screen.getByPlaceholderText('Email');
//   fireEvent.changeText(EmailInput, 'sdadafasf');
//   const PasswordInput = screen.getByPlaceholderText('Password');
//   fireEvent.changeText(PasswordInput, 'fsadfasdasjhd');
//   const submitButton = screen.getByTestId('Button');
//   fireEvent.press(submitButton);
//   const mock = new MockAdapter(axios);
//   mock
//     .onGet('https://jsonplaceholder.typicode.com/todos/1')
//     .reply(200, {data: 'helkllllo0'});
//   // const transformedData = await screen.();
//   expect(response.status).toBe(200);
//   expect(transformedData).toBe({data: 'helkllllo0'});
// });
