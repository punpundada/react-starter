import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Demo = () => {
    const location = useLocation()

  return (
    <div>
      demo page : {location.pathname}
      <div>
        <Link to={'..'} className='hover:underline' >
            to dashboard
        </Link>
      </div>
    </div>
  )
}

export default Demo
