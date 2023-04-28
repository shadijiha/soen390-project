import { emailValidator } from '@/Util/Validator'

const valid = [
  'email@example.com',
  'firstname.lastname@example.com',
  'email@subdomain.example.com',
  'firstname+lastname@example.com',
  'email@123.123.123.123',
  'email@[123.123.123.123]',
  '"email"@example.com',
  '1234567890@example.com',
  'email@example-one.com',
  '_______@example.com',
  'email@example.name',
  'email@example.museum',
  'email@example.co.jp',
  'firstname-lastname@example.com',
]

const invalid = [
  'plainaddress',
  '#@%^%#$@#$@#.com',
  '@example.com',
  'Joe Smith <email@example.com>',
  'email.example.com',
  'email@example@example.com',
  '.email@example.com',
  'email.@example.com',
  'email..email@example.com',
  'あいうえお@example.com',
  'email@example.com (Joe Smith)',
  'email@example',
  'email@-example.com',
  'email@example.web',
  'email@111.222.333.44444',
  'email@example..com',
  'Abc..123@example.com',
]

describe('Validator', () => {
  it('should pass valid emails', () => {
    valid.forEach((email) => expect(emailValidator(email)).toBeTruthy())
  })
  it('should not pass invalid emails', () => {
    invalid.forEach((email) => expect(emailValidator(email)).toBeFalsy())
  })
})
