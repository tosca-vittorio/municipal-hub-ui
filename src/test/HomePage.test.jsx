import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'

describe('HomePage smoke', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    expect(container.firstChild).not.toBeNull()
  })
})
