type Contact = {
  email: string
  firstname: string
  lastname: string
  phone: string
}

type Message = {
  body: string
  code?: number
  contact: Contact
  date: string
  id: string
  type: string
  read: boolean
  subject: string 
}

type Realtor = {
  id: number
  logo: string
  name: string
  unread_messages: number
}
