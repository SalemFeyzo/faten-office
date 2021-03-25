import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { updateCapital } from '../redux/actions/capitalActions'

const CapitalModal = ({ show, handleClose, capital }) => {
  const [amount, setAmount] = useState('')
  const [id, setId] = useState('')
  const dispatch = useDispatch()
  const capitalUpdate = useSelector((state) => state.capitalUpdate)
  const { loading, error, success } = capitalUpdate
  useEffect(() => {
    if (capital && capital.length > 0) {
      setAmount(capital[0].amount)
      setId(capital[0]._id)
    }
    return () => {
      //
    }
  }, [capital, success])
  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log('submited')
    dispatch(updateCapital(id, { amount }))
  }
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>تعديل رأس المال</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitHandler}>
        <Modal.Body>
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
          <Form.Group controlId='amount'>
            <Form.Control
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' variant='primary'>
            حفظ
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CapitalModal
