import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <>
      <Spinner
        animation='grow'
        role='status'
        style={{
          height: '50px',
          width: '50px',
          margin: 'auto',
          display: 'block',
        }}
        variant='success'
      >
        <span className='sr-only'>جاري التحميل ...</span>
      </Spinner>
    </>
  )
}

export default Loader
