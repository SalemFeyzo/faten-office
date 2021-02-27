import { Spinner } from 'react-bootstrap'

const ButtonLoader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        height: '20px',
        width: '20px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default ButtonLoader
