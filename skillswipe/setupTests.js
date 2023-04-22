import '@testing-library/jest-dom'

// const virtualConsole = new jsdom.VirtualConsole()
// virtualConsole.sendTo(console, { omitJSDOMErrors: true })
// virtualConsole.on('jsdomError', (err) => {
//   if (err.message !== 'Could not parse CSS stylesheet') {
//     console.error(err)
//   }
// })
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}))
jest.mock('@/pages/api/api', () => {
  const original = jest.requireActual('@/pages/api/api')
  return {
    ...original,
    checkLogin: jest.fn(() =>
      Promise.resolve({
        data: {
          id: 1,
          firstName: 'test',
          lastName: 'test',
          email: 'test',
          password: 'test',
          mobileNo: 'test',
        },
      })
    ),
  }
})

beforeAll(() => {
  const originalWarn = console.warn.bind(console.warn)
  console.warn = (msg) =>
    !msg.toString().includes('Could not parse CSS stylesheet') && originalWarn(msg)
})
