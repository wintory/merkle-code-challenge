import { render } from '@testing-library/react'
import AppProvider from './AppProvider'

describe('AppProvider', () => {
  it('renders children components', () => {
    const { container } = render(
      <AppProvider>
        <div>Child Component</div>
      </AppProvider>
    )

    expect(container).toBeInTheDocument()
    expect(container).toHaveTextContent('Child Component')
  })
})
