import React, { useEffect, useState, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Settings from '../settings/settings'
import './todo.scss';

import {SettingsContext}  from '../../context/settings-context';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {
  let {showIncomplete, setTaskNumber} = useContext(SettingsContext);
  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => setList(data.results))
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);

  return (
    <>
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
          />
        </div>

          <Settings>
          <h2>Content Settings</h2>
          {/* show complete/incomplete / convert "true" value to boolean */}
  <div onChange={e => showIncomplete(e.target.value ==="true"?true:false)}>
  <input type="radio" name="task-complete" value="true"/>
  <label htmlFor="complete">All</label>
  <input type="radio" id="incomplete" name="task-complete" value="false"/>
  <label htmlFor="incomplete">Incomplete Only</label>
  </div>

          {/* show number of tasks /  */}
   <label htmlFor="number">Number of tasks </label>
  <input type="number" name="tasks-nu" min="1" max={list.length} 
  onChange={e => setTaskNumber(Number(e.target.value))}/>
          </Settings>
      </section>
    </>
  );
};

export default ToDo;
