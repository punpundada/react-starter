import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      dashboard
      <Link to={"demo"} className='block' >Demo page</Link>
    </div>
  )
}

export default Dashboard
