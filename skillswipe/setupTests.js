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
          name: '',
          title: '',
          location: '',
          school: '',
          experience: 'Five years of experience in full stack development',
          experience2: 'Three years of experience in mobile development',
          experience3: 'Two years of experience in data analysis',
          image:
            'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
          cover:
            'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
        },
      })
    ),
    getPendingRequest: jest.fn(() =>
      Promise.resolve({
        data: [],
      })
    ),
    changeStatus: jest.fn(() => Promise.resolve({})),
  }
})

beforeAll(() => {
  const originalWarn = console.warn.bind(console.warn)
  console.warn = (msg) =>
    !msg.toString().includes('Could not parse CSS stylesheet') && originalWarn(msg)
})
