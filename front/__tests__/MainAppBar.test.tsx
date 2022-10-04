import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import MainAppBar from '../components/MainAppBar'

describe('MainAppBar', () => {
  const realtors: Realtor[] = [
    {
      "id": 101,
      "logo": "http://placehold.it/100x100?text=Agence+101",
      "name": "Agence #101",
      "unread_messages": 77
    },
    {
      "id": 102,
      "logo": "http://placehold.it/100x100?text=Agence+102",
      "name": "Agence #102",
      "unread_messages": 72
    },
    {
      "id": 103,
      "logo": "http://placehold.it/100x100?text=Agence+103",
      "name": "Agence #103",
      "unread_messages": 73
    }
  ]

  it('renders <MainAppBar />', async () => {
    const selectedRealtor = realtors[0]

    const { getByText, getByTestId, getByRole } = render(
      <MainAppBar 
        isVerySmall={false}
        onRailtorChanged={() => {}}
        unreadCount={selectedRealtor.unread_messages}
        selectedRealtorId={selectedRealtor.id.toString()}
        realtors={realtors}
      />
    )

    expect(getByText(/aviv group/i)).toBeInTheDocument()
    expect(getByText(`${selectedRealtor.unread_messages}`)).toBeInTheDocument()
    expect(getByTestId('EmailOutlinedIcon')).toBeInTheDocument()
    expect(getByRole('combobox')).toBeInTheDocument()
    
    for (const realtor of realtors) {
      expect(getByText(realtor.name)).toBeInTheDocument()
    }

    const select = getByRole('combobox')
    expect((select as HTMLSelectElement).value).toBe('101')
  })
})