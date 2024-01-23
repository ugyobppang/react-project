import React, { useState } from 'react'
import styles from 'App.module.css';

function App() {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const titleChangeHandler = event => {
    setTitle(event.target.value);
  }

  const detailChangeHandler = event => {
    setDetail(event.target.value);
  }

  // todo 추가 버튼
  const addBtnClickHandler = () => {
    // 1. 새로운 todo 객체 생성
    const newTodos = {
      id: todos.length + 1,
      title,
      detail,
      isDone: false,
    };

    // 2. 배열에 더하기
    setTodos([...todos, newTodos])

    // 버튼 클릭 후 값 초기화
    setTitle('');
    setDetail('');
  }

  // todo 삭제 버튼
  const removeBtnClickHandler = id => {
    const idFilterTodos = todos.filter(item => item.id !== id);
    setTodos(idFilterTodos);
  }

  // 완료 버튼
  const doneClickHandler = id => {
    const doneTodos = todos.map(item => {
      if (item.id === id) {
        item.isDone = true;
      }
      return item;
    })
    setTodos(doneTodos);
  }

  // 취소 버튼
  const cancellClickHandler = id => {
    const cancellTodos = todos.map(item => {
      if (item.id === id) {
        item.isDone = false;
      }
      return item;
    })
    setTodos(cancellTodos);
  }
  

  return (
    <div className={styles['app-area']}>
      <div className={styles['header']}>
        <h1>My Todo List</h1>
        <div className={styles['input-area']}>
          <p>제목 :&nbsp;
            <input
              type='text'
              value={title}
              onChange={titleChangeHandler}
            />
          </p>
          <p>내용 :&nbsp;
            <input
              type='text'
              value={detail}
              onChange={detailChangeHandler}
            />
          </p>
          <button className={styles['add-button']} onClick={addBtnClickHandler}>추가하기</button>
        </div>
      </div>
      <div className={styles['todo-area']}>
        <div className={styles['working-area']}>
          <p>Working...</p>
          <div className={styles['list-area']}>
            {todos.filter(item => item.isDone === false).map(function (item) {
              return (
                <div key={item.id} className={styles['list']}>
                  <p className={styles['title']}>{item.title}</p>
                  <p className={styles['detail']}>{item.detail}</p>
                  <div className={styles['list-button-area']}>
                    <button onClick={() => removeBtnClickHandler(item.id)}>삭제하기</button>
                    <button onClick={() => doneClickHandler(item.id)}>완료</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles['done-area']}>
          <p>Done!</p>
          <div className={styles['list-area']}>
            {todos.filter(item => item.isDone === true).map(function (item) {
              return (
                <div key={item.id} className={styles['list']}>
                  <p className={styles['title']}>{item.title}</p>
                  <p className={styles['detail']}>{item.detail}</p>
                  <div className={styles['list-button-area']}>
                    <button onClick={() => removeBtnClickHandler(item.id)}>삭제하기</button>
                    <button onClick={() => cancellClickHandler(item.id)}>취소</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App