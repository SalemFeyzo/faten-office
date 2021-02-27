import bcrybt from 'bcryptjs'

const users = [
  {
    name: 'Salem',
    email: 'admin@gmail.com',
    isAdmin: true,
    password: bcrybt.hashSync('123456', 10),
  },
  {
    name: 'Faten',
    email: 'faten@gmail.com',
    isAdmin: false,
    password: bcrybt.hashSync('123456', 10),
  },
]

export default users
