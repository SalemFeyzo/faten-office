import { useEffect, useState } from 'react'
import { Container, Button, Col, Row } from 'react-bootstrap'
import menu from '../assets/menu.svg'

import Message from '../components/Message'
import Loader from '../components/Loader'
import InteractionCard from '../components/InteractionCard'
import Paginate from '../components/Paginate'
import { useDispatch, useSelector } from 'react-redux'
import {
  listInteractions,
  addInteraction,
  listInteractionsByAccount,
  listInteractionsByDate,
  listInteractionsByUser,
  listInteractionsByType,
} from '../redux/actions/interactionActions'

import {
  INTERACTION_ADD_RESET,
  INTERACTION_DETAILS_RESET,
  INTERACTION_LIST_BY_ACCOUNT_RESET,
  INTERACTION_LIST_BY_DATE_RESET,
  INTERACTION_LIST_BY_TYPE_RESET,
  INTERACTION_LIST_BY_USER_RESET,
  INTERACTION_LIST_RESET,
} from '../redux/constants/interactionConstants'
import FiltersMenu from '../components/FiltersMenu'
import FormContainer from '../components/FormContainer'
import SearchBox from '../components/SearchBox'

const Dashboard = ({ history, match }) => {
  const [accountId, setAccountId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [userId, setUserId] = useState('')
  const [interactionType, setInteractionType] = useState('')

  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const interactionList = useSelector((state) => state.interactionList)
  const {
    loading,
    error,
    interactions: allInteractions,
    page,
    pages,
  } = interactionList

  const interactionListByAccount = useSelector(
    (state) => state.interactionListByAccount
  )
  const { interactions: interactionsByAccount } = interactionListByAccount

  const interactionListByDate = useSelector(
    (state) => state.interactionListByDate
  )
  const { interactions: interactionsByDate } = interactionListByDate

  const interactionListByUser = useSelector(
    (state) => state.interactionListByUser
  )
  const { interactions: interactionsByUser } = interactionListByUser

  const interactionListByType = useSelector(
    (state) => state.interactionListByType
  )
  const { interactions: interactionsByType } = interactionListByType

  const interactionDelete = useSelector((state) => state.interactionDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = interactionDelete

  const interactionAdd = useSelector((state) => state.interactionAdd)
  const {
    loading: loadingAddInteraction,
    success: addInteractionSuccess,
    interaction,
  } = interactionAdd

  useEffect(() => {
    if (!userInfo) history.push('/')

    if (accountId) {
      dispatch({ type: INTERACTION_LIST_RESET })
      dispatch({ type: INTERACTION_LIST_BY_DATE_RESET })
      dispatch({ type: INTERACTION_LIST_BY_USER_RESET })
      dispatch(listInteractionsByAccount(accountId))
    } else if (startDate && endDate) {
      dispatch({ type: INTERACTION_LIST_RESET })
      dispatch({ type: INTERACTION_LIST_BY_ACCOUNT_RESET })
      dispatch({ type: INTERACTION_LIST_BY_USER_RESET })
      dispatch(listInteractionsByDate(startDate, endDate))
    } else if (userId) {
      dispatch({ type: INTERACTION_LIST_RESET })
      dispatch({ type: INTERACTION_LIST_BY_ACCOUNT_RESET })
      dispatch(listInteractionsByUser(userId))
    } else if (interactionType) {
      dispatch({ type: INTERACTION_LIST_RESET })
      dispatch({ type: INTERACTION_LIST_BY_USER_RESET })
      dispatch({ type: INTERACTION_LIST_BY_ACCOUNT_RESET })
      dispatch(listInteractionsByType(interactionType))
    } else {
      dispatch({ type: INTERACTION_LIST_BY_ACCOUNT_RESET })
      dispatch({ type: INTERACTION_LIST_BY_DATE_RESET })
      dispatch(listInteractions(keyword, pageNumber))
    }

    if (addInteractionSuccess) {
      history.push(`/addinteraction/${interaction._id}`)
      dispatch({ type: INTERACTION_ADD_RESET })
    }
    return () => {
      //
    }
  }, [
    history,
    userInfo,
    dispatch,
    addInteractionSuccess,
    successDelete,
    accountId,
    startDate,
    endDate,
    userId,
    interactionType,
    keyword,
    pageNumber,
  ])

  const addInteractionAndGo = () => {
    dispatch(addInteraction())
  }
  const resetFilters = () => {
    dispatch({ type: INTERACTION_LIST_BY_ACCOUNT_RESET })
    dispatch({ type: INTERACTION_LIST_BY_DATE_RESET })
    dispatch({ type: INTERACTION_LIST_BY_USER_RESET })
    dispatch({ type: INTERACTION_LIST_BY_TYPE_RESET })
    dispatch(listInteractions())
  }

  const openSidebar = () => {
    document.getElementById('sidebar').classList.remove('sidebar-closed')
    document.getElementById('sidebar').classList.add('sidebar-opened')
  }
  const closeSidebar = () => {
    document.getElementById('sidebar').classList.remove('sidebar-opened')
    document.getElementById('sidebar').classList.add('sidebar-closed')
  }
  return (
    <>
      <FiltersMenu
        closeSidebar={closeSidebar}
        setAccountId={setAccountId}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setUserId={setUserId}
        resetFilters={resetFilters}
        setInteractionType={setInteractionType}
      />
      <Container>
        <div className='d-flex flex-row align-items-center justify-content-between'>
          {' '}
          <h4>جميع الحركات</h4>
          <Button variant='success' onClick={addInteractionAndGo}>
            حركة جديدة
          </Button>
        </div>
        {/* <FormContainer><SearchBox /></FormContainer> */}
        <img
          src={menu}
          style={{ cursor: 'pointer' }}
          width='30px'
          height='30px'
          alt='icon'
          onClick={openSidebar}
        />
        <Container onClick={closeSidebar}>
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loading && <Loader />}
          {error && <Message variant='dander'>{error}</Message>}
          {loadingAddInteraction && <Loader />}

          {interactionsByAccount ? (
            <Row>
              {interactionsByAccount.map((interaction) => (
                <Col key={interaction._id} sm={12} md={12} lg={6} xl={6}>
                  <InteractionCard interaction={interaction} />
                </Col>
              ))}
            </Row>
          ) : interactionsByDate ? (
            <Row>
              {interactionsByDate.map((interaction) => (
                <Col key={interaction._id} sm={12} md={12} lg={6} xl={6}>
                  <InteractionCard interaction={interaction} />
                </Col>
              ))}
            </Row>
          ) : interactionsByUser ? (
            <Row>
              {interactionsByUser.map((interaction) => (
                <Col key={interaction._id} sm={12} md={12} lg={6} xl={6}>
                  <InteractionCard interaction={interaction} />
                </Col>
              ))}
            </Row>
          ) : interactionsByType ? (
            <Row>
              {interactionsByType.map((interaction) => (
                <Col key={interaction._id} sm={12} md={12} lg={6} xl={6}>
                  <InteractionCard interaction={interaction} />
                </Col>
              ))}
            </Row>
          ) : allInteractions ? (
            <Row>
              {allInteractions.map((interaction) => (
                <Col key={interaction._id} sm={12} md={12} lg={6} xl={6}>
                  <InteractionCard interaction={interaction} />
                </Col>
              ))}
            </Row>
          ) : (
            ''
          )}
        </Container>
        <Row className='pagination-dash'>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
