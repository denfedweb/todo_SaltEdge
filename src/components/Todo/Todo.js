import React, { useState } from 'react'
import style from './Todo.module.scss'
import uuid from 'react-uuid'
import usePersistedState from '../../hooks/usePersistedState'
import { Card, Input, Divider, List, Checkbox, Button } from 'antd'
import { DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons'

export default function Todo() {
  const [todoList, setTodoList] = usePersistedState('todoList', [])
  const [todoFieldValue, setTodoFieldValue] = useState('')

  function addTodo(e) {
    if (e.key === 'Enter' && todoFieldValue) {
      setTodoList([...todoList, {text: todoFieldValue, id: uuid()}])
      setTodoFieldValue('')
    }
  }

  function changeTodoState(e, idx) {
    const newTodoList = [...todoList]
    const currentTodoIdx = newTodoList.findIndex(todo => todo.id === idx)
    newTodoList[currentTodoIdx].activated = e.target.checked
    setTodoList(newTodoList)
  }

  function removeTodo(idx) {
    const newTodoList = todoList.filter(todo => todo.id !== idx)
    setTodoList(newTodoList)
  }

  function editTodo(idx) {
    const newTodoList = [...todoList]
    const currentTodoIdx = newTodoList.findIndex(todo => todo.id === idx)
    newTodoList[currentTodoIdx].edited = true
    setTodoList(newTodoList)
  }

  function changeItemField(e, idx) {
    if (e.key === 'Enter' && e.target.value) {
      const newTodoList = [...todoList]
      const currentTodoIdx = newTodoList.findIndex(todo => todo.id === idx)
      newTodoList[currentTodoIdx].text = e.target.value
      newTodoList[currentTodoIdx].edited = false
      setTodoList(newTodoList)
    }
  }

  function cancelEditTodo(idx) {
    const newTodoList = [...todoList]
    const currentTodoIdx = newTodoList.findIndex(todo => todo.id === idx)
    newTodoList[currentTodoIdx].edited = false
    setTodoList(newTodoList)
  }

  return (
    <div className={style.Block}>
      <Card style={{ width: '100%' }}>
        <Input 
          value={todoFieldValue}
          onChange={e => setTodoFieldValue(e.target.value)}  
          data-testid="inputAddTodo"
          placeholder="Add a todo..."
          onKeyPress={addTodo} 
        />
        <Divider />
        <List
          data-testid="todos"
          dataSource={todoList}
          renderItem={item => (
            <List.Item className={style.ListItem}>
              <Checkbox 
                checked={item.activated} 
                onChange={(event) => changeTodoState(event, item.id)}
              >
                {item.edited ?
                  <Input 
                    defaultValue={item.text}
                    onChange={changeItemField} 
                    onKeyPress={(event) => changeItemField(event, item.id)} 
                  />
                 :
                  <p className={item.activated ? style.Activated : null}>{item.text}</p>
                }
              </Checkbox>
              {
                item.edited ? 
                  <Button 
                    onClick={() => cancelEditTodo(item.id)} 
                    style={{marginTop: "4px"}}
                    size="small" 
                    shape="circle" 
                    icon={<CloseOutlined />} 
                  />
                : 
                  <Button 
                    onClick={() => editTodo(item.id)} 
                    style={{marginTop: "4px"}} 
                    type="primary" 
                    size="small" 
                    shape="circle" 
                    icon={<EditOutlined />} 
                  />
              }
              <Button 
                onClick={() => removeTodo(item.id)} 
                data-testid="delete-button"
                style={{marginTop: "4px", marginLeft: "5px"}} 
                type="danger" 
                size="small" 
                shape="circle" 
                icon={<DeleteOutlined />} 
              />
            </List.Item>
          )}
        />
        <Divider />
        <div>Developed by <a href="https://denfedweb.github.io/" rel="noreferrer" target="_blank">denfedweb</a></div>
      </Card>
    </div>
  )
}
