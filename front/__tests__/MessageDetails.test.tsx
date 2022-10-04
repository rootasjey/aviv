import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { getBodyMessageDate } from '../utils/date'
import MessageDetails from '../components/MessageDetails'

describe('MessageDetails', () => {  
  const message: Message = {
    date: "2022-09-22T15:38:31.658653",
    id: '10100',
    read: true,
    subject: "Email #10100",
    type: "email",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contact: {
      email: "jdavis@gmail.com",
      firstname: "John",
      lastname: "Davis",
      phone: "0617565449",
    },
  }

  it('renders <MessageDetails />', () => {
    const { getByText, getAllByText, getByTestId, getByLabelText } = render(
      <MessageDetails 
        selectedMessage={message}
        hidden={false}
        onBack={() => {}}
      />
    )

    const relativeDate = getBodyMessageDate(message.date)

    expect(
      getAllByText(`${message.contact.firstname} ${message.contact.lastname}`).length
    ).toBe(2)

    expect(getByText(message.contact.email)).toBeInTheDocument()
    expect(getByText(message.contact.phone)).toBeInTheDocument()
    expect(getByText(relativeDate)).toBeInTheDocument()
    expect(getByText(message.body)).toBeInTheDocument()
    expect(getByTestId('DraftsIcon')).toBeInTheDocument()
    expect(getByLabelText('back')).toBeInTheDocument()
  })
})