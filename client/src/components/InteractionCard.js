import { Card, ListGroup } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/ar-tn'
import del from '../assets/delete.svg'
import tl from '../assets/tl.svg'
import usd from '../assets/usd.svg'
import euro from '../assets/euro.svg'
import ll from '../assets/ll.svg'
import syr from '../assets/syr.svg'
import edit from '../assets/edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteInteraction } from '../redux/actions/interactionActions'

const InteractionCard = ({ interaction }) => {
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
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = () => {
    if (window.confirm('هلا انت متأكد من الحذف؟')) {
      dispatch(deleteInteraction(interaction._id))
    }
  }
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  return (
    <Card className='m-2'>
      <Card.Body>
        <ListGroup variant='flush'>
          {interaction.IOs.map((io) => (
            <ListGroup.Item key={io._id}>
              <div className='d-flex flex-lg-row flex-md-row flex-sm-column  flex-xsm-column align-items-center justify-content-between'>
                <span>
                  {' '}
                  المبلغ: <strong>{addDecimal(io.amount)}</strong>
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
                    ? 'مخرجات '
                    : io.ioType === 'input'
                    ? 'مدخلات '
                    : ''}
                </strong>
                <span>
                  {io.ioType === 'output'
                    ? 'من حساب: '
                    : io.ioType === 'input'
                    ? 'إلى حساب: '
                    : ''}
                  {io.account.name}
                </span>
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
                نوع الحركة:{' '}
                {interaction.interactionType === 'exchange'
                  ? 'تصريف'
                  : interaction.interactionType === 'outbound-transfer'
                  ? 'حوالة صادرة'
                  : interaction.interactionType === 'incoming-transfer'
                  ? 'حوالة واردة'
                  : interaction.interactionType === 'pay'
                  ? 'دفعة'
                  : interaction.interactionType === 'debt'
                  ? 'دين'
                  : interaction.interactionType === 'expense'
                  ? 'مصروف'
                  : ''}
              </small>

              <small>
                {moment(interaction.createdAt).locale('ar-tn').format('LLLL')}
              </small>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            {userInfo && userInfo._id === interaction.user._id && (
              <div className='d-flex flex-row align-items-center justify-content-between'>
                <img
                  src={edit}
                  style={{ cursor: 'pointer' }}
                  width='30px'
                  height='30px'
                  alt='icon'
                />
                <img
                  src={del}
                  style={{ cursor: 'pointer' }}
                  width='30px'
                  height='30px'
                  alt='icon'
                  onClick={deleteHandler}
                />
              </div>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card.Footer>
    </Card>
  )
}

export default InteractionCard
