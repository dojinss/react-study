import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// 경고창
export const alert = (title,text,icon,callback) => {
  MySwal.fire({
    title : title,
    text : text,
    icon,icon
  })
  .then( callback ) // alert 후 실행할 콜백함수
}

// 확인창
export const confirm = (title,text,icon,callback) => {
  MySwal.fire({
    title : title,
    text : text,
    icon,icon,
    showCancelButton : true, // [취소] 버튼 보이기
    cancelButtonColor : '#aaa',
    cancelButtonText : '취소',
    confirmButtonColor : 'tomato',
    confirmButtonText : '확인'
  })
  .then( callback ) // alert 후 실행할 콜백함수
}