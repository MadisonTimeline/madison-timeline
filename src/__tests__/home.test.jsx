import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home', () => {
  it('renders the title', () => {
    render(<Home />)
    expect(screen.getByText('Welcome to Madison Timeline')).toBeInTheDocument()
  })
})