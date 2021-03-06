import React , {useContext} from 'react';
import {SettingsContext}  from '../../context/settings-context';

function TodoList (props){
  let {incomplete, taskNumber} = useContext(SettingsContext);
  let renderArr;

  //bring array of incomplete tasks (default)
let incompleteArr = props.list.filter(item => !item["complete"])
// 1] render complete / incomplete?
 renderArr = incomplete? props.list : incompleteArr;


//2] limit tasks number
let tasksLeftArr = renderArr.filter((item,index) => index<taskNumber);
// render tasks when number changed 
 renderArr = taskNumber? tasksLeftArr : renderArr;




// 3] sort tasks 

 //difficulty / complete (false < true)
 function sortNum (a, b) {
  return a[props.sort] - b[props.sort];
 }

 
 //text //assignee
function sortStr(a, b) {
  
  if(a[props.sort]&&b[props.sort]){ //in case they were empty (undefined)
  var textA = a[props.sort].toUpperCase(); 
  var textB = b[props.sort].toUpperCase(); 
  if (textA < textB) {
    return -1;
  }
  if (textA > textB) {
    return 1;
  }
  return 0;
}}

if(props.sort ==="difficulty" || props.sort ==="complete")
 renderArr.sort(sortNum); 
else 
renderArr.sort(sortStr); 



    return (
      <ul>
        {renderArr.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.handleComplete(item._id)}>
              {item.text}
            </span>
            <div className="divBtn">
            <div  >
              <img onClick={(e) => {props.deleteItem(item._id)}} src="data:image/png;base64,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"
              alt="delete" />
             <img  src="data:image/png;base64,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"
              alt="edit" />
            </div>  
           </div>
          </li>
        ))}
      </ul>
    );
  
}

export default TodoList;
