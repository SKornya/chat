import React from 'react'

export default function MyCard({ logo, content, footer }) {
  return (
    <div className='col-12 col-md-8 col-xxl-6'>
      <div className='card shadow-sm'>
        <div className='card-body row p-5'>
          <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
            <img className='rounded-circle' src={logo} alt='' />
          </div>
          {content} 
        </div>
        {footer}
      </div>
    </div>
  )
}
