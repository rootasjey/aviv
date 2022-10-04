import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import MessageItem from '../components/MessageItem'
import { getRelativeDate } from '../utils/date'
import { getMessageBody } from '../utils/texts'

describe('MessageItem', () => {  
  const message: Message = {
    date: "2022-09-22T15:38:31.658653",
    id: '10100',
    read: false,
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

  const onClick = () => {}

  it('renders a message item', () => {
    const { getByText, getByTestId } = render(<MessageItem message={message} onClick={onClick} />)

    const relativeDate = getRelativeDate(message.date)

    expect(getByText(`${message.contact.firstname} ${message.contact.lastname}`)).toBeInTheDocument()
    expect(getByText(message.subject)).toBeInTheDocument()
    expect(getByText(relativeDate)).toBeInTheDocument()
    expect(getByText(getMessageBody(message.body))).toBeInTheDocument()
    expect(getByTestId('MailIcon')).toBeInTheDocument()
  })

  it('renders the correct icon for unread email', () => {
    const { getByTestId } = render(
      <MessageItem 
        message={message} 
        onClick={onClick} 
      />
    )

    expect(getByTestId('MailIcon')).toBeInTheDocument()
  })

  it('renders the correct icon for read email', () => {
    const { getByTestId } = render(
      <MessageItem 
        message={{...message, ...{ read: true }}} 
        onClick={onClick} 
      />
    )

    expect(getByTestId('DraftsIcon')).toBeInTheDocument()
  })

  it('renders the correct icon for phone', () => {
    const { getByTestId } = render(
      <MessageItem 
        message={{...message, ...{ type: 'phone' }}} 
        onClick={onClick} 
      />
    )
    
    expect(getByTestId('PhoneIcon')).toBeInTheDocument()
  })

  it('renders the correct icon for unread sms', () => {
    const { getByTestId } = render(
      <MessageItem 
        message={{...message, ...{ type: 'sms' }}} 
        onClick={onClick} 
      />
    )
    
    expect(getByTestId('SmsFailedIcon')).toBeInTheDocument()
  })

  it('renders the correct icon for read sms', () => {
    const { getByTestId } = render(
      <MessageItem 
        message={{...message, ...{ type: 'sms', read: true }}} 
        onClick={onClick} 
      />
    )

    expect(getByTestId('SmsIcon')).toBeInTheDocument()
  })
})