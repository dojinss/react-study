import React from 'react';

const BoardPagination = ({ pagination }) => {
  return (
    <div className='page-box'>
      {
        pagination?.first < pagination?.start
          ?
          <Link><FirstPageIcon /></Link>
          :
          ''
      }
      {
        pagination?.first < pagination?.start
          ?
          <Link><NavigateBeforeIcon /></Link>
          :
          ''
      }
      {
        pagination?.last > pagination?.end
          ?
          <Link><NavigateNextIcon /></Link>
          :
          ''
      }
      {
        pagination?.last > pagination?.end
          ?
          <Link><LastPageIcon /></Link>
          :
          ''
      }
    </div>
  )
}

export default BoardPagination