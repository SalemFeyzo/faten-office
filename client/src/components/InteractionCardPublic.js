import { Card, ListGroup } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/ar-tn'
import tl from '../assets/tl.svg'
import usd from '../assets/usd.svg'
import euro from '../assets/euro.svg'
import ll from '../assets/ll.svg'
import syr from '../assets/syr.svg'

const InteractionCardPublic = ({ interaction, accountId }) => {
  moment.updateLocale('ar-tn', {
    months: [
      'كانون الثاني',
      'شباط',
      ' آذار',
      'نيسان',
      'حزيران',
      ' تموز',
      ' آب',
      ' أيلول',
      ' تشرين الأول',
      ' تشرين الثاني',
      ' كانون الأول',
    ],
  })

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const ios = interaction.IOs.filter((io) => io.account._id === accountId)

  return (
    <Card className='m-2'>
      <Card.Body>
        <ListGroup variant='flush'>
          {ios.map((io) => (
            <ListGroup.Item key={io._id}>
              <div className='d-flex flex-lg-row flex-md-row flex-sm-column  flex-xsm-column align-items-center justify-content-between'>
                <span>
                  {' '}
                  المبلغ: <strong>{addDecimal(io.amount)}</strong>{' '}
                </span>
                <span>
                  <strong>{io.currency}</strong>{' '}
                  <img
                    src={
                      io.currency === 'USD'
                        ? usd
                        : io.currency === 'TL'
                        ? tl
                        : io.currency === 'SYR'
                        ? syr
                        : io.currency === 'LL'
                        ? ll
                        : io.currency === 'EURO'
                        ? euro
                        : ''
                    }
                    width='20px'
                    height='20px'
                    alt='icon'
                  />
                </span>
                <strong className={io.ioType}>
                  {io.ioType === 'output'
                    ? ' مخرجات '
                    : io.ioType === 'input'
                    ? ' مدخلات '
                    : ''}
                </strong>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
      <Card.Footer style={{ backgroundColor: '#fff' }}>
        <ListGroup variant='flush'>
          <ListGroup.Item>البيان: {interaction.description}</ListGroup.Item>
          <ListGroup.Item>
            <div className='d-flex flex-lg-row flex-md-row flex-sm-column  flex-xsm-column align-items-center justify-content-between'>
              <small>الموظف: {interaction.user.name}</small>

              <small>
                {moment(interaction.createdAt).locale('ar-tn').format('LLLL')}
              </small>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Footer>
    </Card>
  )
}

export default InteractionCardPublic
