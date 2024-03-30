import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ExploreBoardsPage from '../app/explore-boards/page'

describe('ExploreBoardsPage', () => {
    it('renders the Showing text', () => {
        render(<ExploreBoardsPage />)
    })

})


