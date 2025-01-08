import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todoList, onToggle, onRemove }) => {

  // 🔹 state 선언
  const [page, setPage] = useState(1)
  const [newList, setNewList] = useState([])

  // 데이터 목록 추가
  const addList = (page) => {
    fetch("http://localhost:8080/todos?page="+page)
    .then(Response => Response.json())
    .then(data => {
      console.log(data)

      // 마지막 페이지 여부 체크
      if ( page > data.pagination.last) {
        console.log("마지막 페이지 입니다.")
        return false
      }

      const newTodoList = [...newList, ...data.list]
      setNewList(newTodoList)
      setPage(page)
    })
    .catch(error => {console.error(error)})
  }

  // 🔅 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const todoListElement = document.querySelector(".todoList")
    const scrollHeight = todoListElement.scrollHeight // 스크롤 높이
    const scrollTop = todoListElement.scrollTop       // 스크롤 위치
    const clientHeight = todoListElement.clientHeight // 컨텐츠 높이
    const maxScrollHeight = scrollHeight - clientHeight
    
    if (scrollTop >= maxScrollHeight) {
      console.log("마지막")
      addList(page + 1)
    }
  }
  useEffect(() => {
    const todoListElement = document.querySelector(".todoList")
    // 스크롤 이벤트 등록
    if (todoListElement) {
      todoListElement.addEventListener('scroll', handleScroll)
    }
    // 스크롤 이벤트 제거
    return () => {
      if (todoListElement) {
        todoListElement.removeEventListener('scroll', handleScroll)
      }
    }
  })
  

  return (
    <div className="todoList">
      <ul>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>
      <ul id="new-list">
        {newList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
      </ul>
    </div>
  )
}

export default TodoList