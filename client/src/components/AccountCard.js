import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const AccountCard = ({ account }) => {
  return (
    <Link to={`/accounts/${account._id}`}>
      <Card className='m-2'>
        <Card.Body>{account.name}</Card.Body>
      </Card>
    </Link>
  )
}

export default AccountCard
