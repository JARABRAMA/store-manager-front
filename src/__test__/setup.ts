import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest' // Attaches custom matchers to Vitest

// Automatically clean up the virtual DOM after each test case
afterEach(() => {
  cleanup()
})