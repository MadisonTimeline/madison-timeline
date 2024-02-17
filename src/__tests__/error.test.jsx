import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ErrorPage from '../app/error/page'

describe('ErrorPage', () => {
  it('renders error message', () => {
    render(<ErrorPage />)
    expect(screen.getByText('Sorry, something went wrong')).toBeInTheDocument()
  })
})