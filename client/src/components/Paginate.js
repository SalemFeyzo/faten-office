import Pagination from 'react-bootstrap-4-pagination'
import { useHistory } from 'react-router-dom'

const Paginate = ({ pages, page, keyword = '' }) => {
  const history = useHistory()
  let paginationConfig = {
    totalPages: pages,
    currentPage: page,
    showMax: 3,
    size: 'md',
    threeDots: true,
    prevNext: true,
    threeDots: true,
    prevNext: true,
    onClick: function (p) {
      history.push(`/dashboard/page/${p}`)
    },
    activeBorderColor: '#36bf1d',
    activeBgColor: '#36bf1d',
    disabledBgColor: '#9cb3ae',
    activeColor: 'white',
    color: '#36bf1d',
    disabledColor: 'white',
    circle: false,
    shadow: false,
  }

  return pages > 1 && <Pagination {...paginationConfig} />
}

export default Paginate
