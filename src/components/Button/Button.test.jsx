import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from '.'
import userEvent from '@testing-library/user-event'

describe('<Button />', () => {
  it('should render the button with the test "Load More', () => {
    const fn = jest.fn()
    render(<Button text="Load more" disabled={false} onClick={fn} />)
    expect.assertions(1)

    const button = screen.getByRole('button', { name: /load more/i })

    expect(button).toBeInTheDocument('class', 'button')
  })

  it('should call function on button click', () => {
    const fn = jest.fn()
    render(<Button text="Load more" disabled={false} onClick={fn} />)

    const button = screen.getByRole('button', { name: /load more/i })
    // fireEvent.click(button)
    // fireEvent.click(button)
    userEvent.click(button)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn()
    render(<Button text="Load more" disabled={true} onClick={fn} />)
    const button = screen.getByRole('button', { name: /load more/i })
    // fireEvent.click(button)
    // fireEvent.click(button)
    expect(button).toBeDisabled()
  })
  it('should be enabled when disabled is false', () => {
    const fn = jest.fn()
    render(<Button text="Load more" disabled={false} onClick={fn} />)
    const button = screen.getByRole('button', { name: /load more/i })
    expect(button).toBeEnabled()
  })
  it('should match snapshot', () => {
    const fn = jest.fn()
    const { container } = render(<Button text="Load more" disabled={false} onClick={fn} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
