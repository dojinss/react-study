import React from 'react'

const TodoFooter = ({onAllRemove,onAllDone}) => {
  return (
    <div className="footer">
        <div className="item">
            <button type='button' className="btn"
              onClick={()=>onAllRemove()}
            >전체삭제</button>
        </div>
        <div className="item">
            <button type='button' className="btn"
              onClick={()=>onAllDone()}
            >전체완료</button>
        </div>
    </div>
  )
}

export default TodoFooter