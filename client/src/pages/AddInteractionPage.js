import { useEffect, useState } from 'react'
import { Button, Form, Card, Container } from 'react-bootstrap'
import Select from 'react-select'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listAccounts } from '../redux/actions/accountActions'
import {
  addInteractionIO,
  getInteractionDetails,
  updateInteraction,
} from '../redux/actions/interactionActions'
import {
  INTERACTION_DETAILS_RESET,
  INTERACTION_LIST_RESET,
  INTERACTION_UPDATE_RESET,
} from '../redux/constants/interactionConstants'

const InteractionTest = ({ history, match }) => {
  const [formNum, setFormNum] = useState(null)
  const [account, setAccount] = useState('')
  const [ioType, setIoType] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')
  const [interactionType, setInteractionType] = useState('')
  const [description, setDescription] = useState('')

  const id = match.params.id

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const accountsList = useSelector((state) => state.accountsList)
  const {
    loading: loadingAccounts,
    error: errorAccounts,
    accounts,
  } = accountsList

  const selectAccountOptions =
    accounts &&
    accounts.map((account) => {
      return { label: account.name, value: account._id }
    })
  const interactionDetails = useSelector((state) => state.interactionDetails)
  const {
    loading: loadingInteractionDetails,
    error: errorInteractionDetails,
    success: successInteractionDetails,
    interaction,
  } = interactionDetails

  const interactionUpdate = useSelector((state) => state.interactionUpdate)
  const {
    loading: loadingInteractionUpdate,
    error: errorInteractionUpdate,
    success: successInteractionUpdate,
  } = interactionUpdate

  const interactionAddIO = useSelector((state) => state.interactionAddIO)
  const {
    loading: loadingInteractionAddIO,
    error: errorInteractionAddIO,
  } = interactionAddIO
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  useEffect(() => {
    if (!userInfo) history.push('/')
    dispatch(listAccounts())
    dispatch({ type: INTERACTION_LIST_RESET })
    if (!successInteractionDetails) dispatch(getInteractionDetails(id))
    if (successInteractionDetails) {
      setDescription(interaction.description)
      setInteractionType(interaction.interactionType)
    }
    if (successInteractionUpdate) {
      dispatch({ type: INTERACTION_UPDATE_RESET })
      dispatch({ type: INTERACTION_DETAILS_RESET })
      dispatch(listAccounts())
      dispatch(getInteractionDetails(id))
    }
    return () => {
      //
    }
  }, [
    dispatch,
    id,
    history,
    userInfo,
    interaction,
    successInteractionDetails,
    successInteractionUpdate,
  ])
  const addIO = (e) => {
    e.preventDefault()
    setFormNum(formNum + 1)
    dispatch(
      addInteractionIO(id, {
        account,
        ioType,
        amount,
        currency,
      })
    )
  }

  const updateInteractionHandler = (e) => {
    e.preventDefault()
    dispatch(updateInteraction(id, { interactionType, description }))
  }

  return (
    <Container>
      <FormContainer>
        <Card>
          <Card.Body>
            {loadingInteractionDetails && <Loader />}
            {errorInteractionDetails && (
              <Message variant='danger'>{errorInteractionDetails}</Message>
            )}
            {loadingInteractionUpdate && <Loader />}
            {errorInteractionUpdate && (
              <Message variant='danger'>{errorInteractionUpdate}</Message>
            )}
            <Form onSubmit={updateInteractionHandler}>
              <Form.Group controlId='input-output'>
                <Form.Label>نوع الحركة</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => setInteractionType(e.target.value)}
                >
                  <option value={interactionType}>
                    {interactionType === 'exchange'
                      ? 'تصريف'
                      : interactionType === 'outbound-transfer'
                      ? 'حوالة صادرة'
                      : interactionType === 'incoming-transfer'
                      ? 'حوالة واردة'
                      : interactionType === 'pay'
                      ? 'دفعة'
                      : interactionType === 'debt'
                      ? 'دين'
                      : interactionType === 'expense'
                      ? 'مصروف'
                      : ''}
                  </option>
                  <option value='exchange'>تصريف</option>
                  <option value='outbound-transfer'>حوالة صادرة</option>
                  <option value='incoming-transfer'>حوالة واردة</option>
                  <option value='pay'>دفعة</option>
                  <option value='debt'>دين</option>
                  <option value='expense'>مصروف</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>البيان</Form.Label>
                <Form.Control
                  type='text'
                  as='textarea'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='success' className='btn-block'>
                حفظ
              </Button>
            </Form>
          </Card.Body>
        </Card>
        {loadingAccounts && <Loader />}
        {errorAccounts && <Message variant='danger'>{errorAccounts}</Message>}
        <Card className='mt-3'>
          <Card.Body>
            {loadingInteractionAddIO && <Loader />}
            {errorInteractionAddIO && (
              <Message variant='danger'>{errorInteractionAddIO}</Message>
            )}
            {formNum && (
              <Message variant='success'>تم اضافة: {formNum}</Message>
            )}
            <Form onSubmit={addIO}>
              <Form.Group controlId='interaction-type'>
                <Form.Label>مدخلات أو مخرجات</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => setIoType(e.target.value)}
                >
                  <option value='1'>اختر</option>
                  <option value='input'>مدخلات</option>
                  <option value='output'>مخرجات</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='amount'>
                <Form.Label>المبلغ</Form.Label>
                <Form.Control
                  type='number'
                  step='0.01'
                  onChange={(e) => addDecimal(setAmount(e.target.value))}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='currency-type'>
                <Form.Label>العملة</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value='1'>اختر</option>
                  <option value='USD'>USD</option>
                  <option value='TL'>TL</option>
                  <option value='SYR'>SYR</option>
                  <option value='LL'>LL</option>
                  <option value='EURO'>EURO</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='accountId'>
                <Form.Label>الحساب</Form.Label>
                {accounts && (
                  <Select
                    placeholder='اختر'
                    isSearchable
                    options={selectAccountOptions}
                    value={selectAccountOptions.label}
                    onChange={(option) => setAccount(option.value)}
                  />
                )}
              </Form.Group>

              <Button type='submit' variant='success' className='btn-block'>
                اضافة
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </FormContainer>
    </Container>
  )
}

export default InteractionTest
