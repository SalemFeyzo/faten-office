import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrencies } from '../redux/actions/currenciesActions'

const CurrenciesModal = ({ show, handleClose, currencies }) => {
  const [tlUsd, setTlUsd] = useState('')
  const [euroUsd, setEuroUsd] = useState('')
  const [syrUsd, setSyrUsd] = useState('')
  const [llUsd, setLlUsd] = useState('')
  const [id, setId] = useState('')
  const dispatch = useDispatch()
  const currenciesUpdate = useSelector((state) => state.currenciesUpdate)
  const { loading, error, success } = currenciesUpdate
  useEffect(() => {
    if (currencies && currencies.length > 0) {
      setId(currencies[0]._id)
      setTlUsd(currencies[0].tlUsd)
      setEuroUsd(currencies[0].euroUsd)
      setSyrUsd(currencies[0].syrUsd)
      setLlUsd(currencies[0].llUsd)
    }
    return () => {
      //
    }
  }, [currencies, success])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(updateCurrencies(id, { tlUsd, euroUsd, syrUsd, llUsd }))
  }
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Modal.Header closeButton>
        <Modal.Title>تعديل سعر الصرف</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitHandler}>
        <Modal.Body>
          {currencies && currencies.length > 0 && (
            <>
              <Form.Group controlId='tlUsd'>
                <Form.Label>الليرة التركية</Form.Label>
                <Form.Control
                  type='number'
                  step='0.01'
                  value={tlUsd}
                  onChange={(e) => setTlUsd(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='euroUsd'>
                <Form.Label>اليورو</Form.Label>
                <Form.Control
                  type='number'
                  step='0.01'
                  value={euroUsd}
                  onChange={(e) => setEuroUsd(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='syrUsd'>
                <Form.Label>الليرة السورية</Form.Label>
                <Form.Control
                  type='number'
                  step='0.01'
                  value={syrUsd}
                  onChange={(e) => setSyrUsd(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='llUsd'>
                <Form.Label>الليرة اللبنانية</Form.Label>
                <Form.Control
                  type='number'
                  step='0.01'
                  value={llUsd}
                  onChange={(e) => setLlUsd(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' variant='success'>
            حفظ
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CurrenciesModal
