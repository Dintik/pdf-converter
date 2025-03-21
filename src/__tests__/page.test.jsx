import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('Page', () => {
  it('renders form with label and textarea', () => {
    render(<Page />)

    const form = screen.getByTestId('pdf-form')
    expect(form).toBeInTheDocument()

    const label = screen.getByText('Enter text to convert to PDF')
    expect(label).toBeInTheDocument()

    const textarea = screen.getByRole('textbox', {
      name: 'Enter text to convert to PDF'
    })
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('required')

    const convertButton = screen.getByRole('button', {
      name: 'Convert to PDF'
    })
    expect(convertButton).toBeInTheDocument()
  })
})
