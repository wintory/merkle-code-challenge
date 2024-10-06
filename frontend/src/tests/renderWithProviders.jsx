import { render } from '@testing-library/react'
import AppProvider from '../providers/AppProvider'

const renderWithProviders = (uiComponent, options = {}) => {
  const Wrapper = ({ children }) => <AppProvider>{children}</AppProvider>

  return {
    ...render(uiComponent, { wrapper: Wrapper, ...options }),
  }
}

export default renderWithProviders
