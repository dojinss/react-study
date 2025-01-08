import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoFooter from './TodoFooter'

const TodoContainer = () => {

    
    // URL
    const URL = "http://localhost:8080/todos"

    // 🔹 State
    const [todoList, setTodoList] = useState([])
    const [input, setInput] = useState('')
    
    // 페이징
    let page = 1
    
    // 🔅 이벤트

    // 체크박스 토글 함수
    const onToggle = async (todo) => {


        // 클라이언트에서 status 변경
        // const newTodoList = todoList.map((item) => {
        //     return item.id == todo.id ? { ...item, status: !item.status } : item
        // })
        // 클라이언트에서 sort(정렬)
        // newTodoList.sort((a, b) => {
        //     return a.status == b.status ? a.seq - b.seq : (a.status ? 1 : -1)
        // })

        // 상태 수정 요청
        const data = {
            ...todo,
            status : !todo.status
        }
        const option = {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }
        try {
            const response = await fetch(URL,option)
            if (response.ok) {
                // 🔹 State 업데이트
                loadTodoList()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // 삭제
    const onRemove = async (id) => {
        const option = {
            method : "DELETE"
        }
        try {
            const response = await fetch(URL + `/${id}`,option)
            if (response.ok) {
                loadTodoList()
            }
        } catch (error) {
            console.log(error)
        }

    }
    // 전체 삭제
    const onAllRemove = async () => {
        const option = {
            method : "DELETE"
        }
        try {
            const response = await fetch(URL,option)
            if (response.ok) {
                loadTodoList()
            }
        } catch (error) {
            console.log(error)
        }
    }
    // 전체완료
    const onAllDone = async () => {
        const option = {
            method : "PUT"
        }
        try {
            const response = await fetch(URL + `/all`,option)
            if (response.ok) {
                loadTodoList()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // 할일 입력 변경 이벤트 함수
    const onChange = (e) => {
        const val = e.target.value
        console.log(val)
        setInput(val)
    }

    // 할일 추가
    const onSubmit = async (e) => {
        e.preventDefault() // 기본 이벤트 동작 방지
        let name = input
        if ( name == '') name = '제목없음'
        // 데이터 등록 요청
        const data = {
            name : name,
            seq : 1
        }
        const option = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }
        try {
            const response = await fetch(URL,option)
            if (response.ok) {
                loadTodoList()
                setInput('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // 목록 불러오기
    const loadTodoList = (page) => {
        let url = URL + (page? `?page=${page}` : '')
        fetch(url)
            .then(response => response.json())
            .then(data => { setTodoList(data.list) })
            .catch(error => { console.log(error) })
    }

    // 인피니티 스크롤
    const moreList = (e) => {
        loadTodoList(page)
    }

    useEffect(() => {
        loadTodoList()
    }, [])


    return (
        <div className='container'>
            <TodoHeader />
            <TodoInput 
                input={input}
                onChange={onChange}
                onSubmit={onSubmit}
            />
            <TodoList 
                todoList={todoList} 
                onToggle={onToggle} 
                onRemove={onRemove}    
            />
            <TodoFooter 
                onAllDone={onAllDone}
                onAllRemove={onAllRemove}
            />
        </div>
    )
}

export default TodoContainer