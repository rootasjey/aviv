import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import MessageDrawer from '../components/MessageDrawer'
import { getIcontring } from '../utils/icons';
import { getRelativeDate } from '../utils/date';

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => {},
})

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('MessageDrawer', () => {  
  const messages: Message[] = [
    {
      body: "Lorem Ipsum #10100 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "jdavis@gmail.com",
        firstname: "John",
        lastname: "Davis",
        phone: "0617565449"
      },
      date: "2022-09-22T15:38:31.658653",
      id: "10100",
      read: true,
      subject: "Email #10100",
      type: "email"
    },
    {
      body: "Lorem Ipsum #10101 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "rthomas@gmail.com",
        firstname: "Richard",
        lastname: "Thomas",
        phone: "0659138533"
      },
      date: "2022-09-09T15:38:31.659317",
      id: "10101",
      read: false,
      subject: "Appel #10101",
      type: "phone"
    },
    {
      body: "Lorem Ipsum #10102 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "cjones@gmail.com",
        firstname: "Christopher",
        lastname: "Jones",
        phone: "0623368036"
      },
      date: "2022-09-08T15:38:31.659400",
      id: "10102",
      read: false,
      subject: "Appel #10102",
      type: "phone"
    },
    {
      body: "Lorem Ipsum #10103 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "jsmith@gmail.com",
        firstname: "Joseph",
        lastname: "Smith",
        phone: "0657322352"
      },
      date: "2022-09-15T15:38:31.659469",
      id: "10103",
      read: true,
      subject: "SMS #10103",
      type: "sms"
    },
    {
      body: "Lorem Ipsum #10104 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "cjackson@gmail.com",
        firstname: "Charles",
        lastname: "Jackson",
        phone: "0618826989"
      },
      date: "2022-09-08T15:38:31.659536",
      id: "10104",
      read: false,
      subject: "SMS #10104",
      type: "sms"
    },
    {
      body: "Lorem Ipsum #10105 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "jbrown@gmail.com",
        firstname: "Joseph",
        lastname: "Brown",
        phone: "0687495254"
      },
      date: "2022-09-25T15:38:31.659602",
      id: "10105",
      read: true,
      subject: "Appel #10105",
      type: "phone"
    },
    {
      body: "Lorem Ipsum #10106 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "manderson@gmail.com",
        firstname: "Michael",
        lastname: "Anderson",
        phone: "0698102412"
      },
      date: "2022-09-01T15:38:31.659672",
      id: "10106",
      read: false,
      subject: "SMS #10106",
      type: "sms"
    },
    {
      body: "Lorem Ipsum #10107 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "cwilson@gmail.com",
        firstname: "Christopher",
        lastname: "Wilson",
        phone: "0662432307"
      },
      date: "2022-09-03T15:38:31.659738",
      id: "10107",
      read: false,
      subject: "Appel #10107",
      type: "phone"
    },
    {
      body: "Lorem Ipsum #10108 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "cjohnson@gmail.com",
        firstname: "Charles",
        lastname: "Johnson",
        phone: "0686252542"
      },
      date: "2022-09-22T15:38:31.659801",
      id: "10108",
      read: true,
      subject: "Appel #10108",
      type: "phone"
    },
    {
      body: "Lorem Ipsum #10109 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "mdavis@gmail.com",
        firstname: "Michael",
        lastname: "Davis",
        phone: "0678019694"
      },
      date: "2022-09-06T15:38:31.659867",
      id: "10109",
      read: false,
      subject: "Appel #10109",
      type: "phone"
    }
  ]

  it('renders <MessageDrawer />', () => {
    const { getByText, getAllByText, getAllByTestId } = render(
      <MessageDrawer
        hasNextPage={true}
        hidden={false}
        isMobileSize={false}
        loadMore={() => {}}
        loading={false}
        messages={messages}
        onSelectedMessageChanged={() => {}}
      />
    )

    
    // ------------
    // 1st message
    // ------------
    const firstMessage: Message = messages[0]
    
    expect(
      getByText(`${firstMessage.contact.firstname} ${firstMessage.contact.lastname}`)
    ).toBeInTheDocument()

    expect(getByText(firstMessage.subject)).toBeInTheDocument()
    expect(getByText(RegExp(firstMessage.body.substring(0, 20), 'i'))).toBeInTheDocument()

    const firstIconString = getIcontring(firstMessage.type, firstMessage.read)
    expect(getAllByTestId(firstIconString).length).toBeGreaterThan(0)

    expect(getAllByText(getRelativeDate(firstMessage.date)).length).toBeGreaterThan(0)

    // ------------
    // 3rd message
    // ------------
    const thirdMessage: Message = messages[2]

    expect(
      getByText(`${thirdMessage.contact.firstname} ${thirdMessage.contact.lastname}`)
    ).toBeInTheDocument()

    expect(getByText(thirdMessage.subject)).toBeInTheDocument()
    expect(getByText(RegExp(thirdMessage.body.substring(0, 20), 'i'))).toBeInTheDocument()

    const thirdIconString = getIcontring(thirdMessage.type, thirdMessage.read)
    expect(getAllByTestId(thirdIconString).length).toBeGreaterThan(0)

    expect(getAllByText(getRelativeDate(thirdMessage.date)).length).toBeGreaterThan(0)
  })
})