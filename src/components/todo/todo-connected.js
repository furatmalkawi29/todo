import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../../hooks/useAjax'

import './todo.scss';

const todoAPI = 'https://furat-api-server.herokuapp.com/api/v1/todo';


const ToDo = () => {
  const [list, setList] = useState([]);
  const [hitApi] = useAjax();
  const options = {mode: 'cors',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' }}


  const _addItem = async (item) => {
    
    try{item.due = new Date();
   
    let  data = await hitApi('post',todoAPI,item,options);
    setList([...list,data]);
  }catch(error){
    console.error(error);
  }
  };


  const deleteItem = async (id) =>{
    try{
      let response;
    let item = list.filter(i => i._id === id)[0] || {};

    let data;
    if (item._id) {

    let url = `${todoAPI}/${id}`;
    data = await hitApi('delete',url,{},{mode: 'cors'});
    }

        let myList = list.filter(listItem => listItem._id !== data._id );
        setList(myList);
            }catch(error){
        console.error(error);

    }   
}
  

  const _toggleComplete = async id => {

    try{
    let item = list.filter(i => i._id === id)[0] || {};
    let data;

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;
      data = await hitApi('put',url,item,options);
    }
      
    setList(list.map(listItem => listItem._id === item._id ? data : listItem));
    }
      catch(error){
    }
  };


   const _getTodoItems = async () => {
     try{
     let data = await hitApi('get',todoAPI,{},{mode: 'cors'});
     setList(data);
    }catch(error){
      console.error(error);
    }
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
          {/* {console.log(list)} */}
          <TodoList
            list={list}
            handleComplete={_toggleComplete} deleteItem={deleteItem}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
