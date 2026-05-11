// Global test setup. Add matchers, mocks, or polyfills here as needed.

// jsdom doesn't implement ResizeObserver; Headless UI's Dialog uses it.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}
