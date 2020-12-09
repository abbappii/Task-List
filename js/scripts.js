
// Define ui element 

let form = document.querySelector("#task_form");
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task')

// define event listeners
form.addEventListener('submit',addTask);
// romove task el
taskList.addEventListener('click', removeTask);
// clear task  el
clearBtn.addEventListener('click',clearTask);
// filter task el
filter.addEventListener('keyup', filterTask);
 
// after page load,for showing information in webpage 
document.addEventListener('DOMContentLoaded', getTask);

// define function

function addTask(e){
    if (taskInput.value === ''){
        alert('add a task');
    }
    else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');       // for cross symbol
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);   // add task in local storage 

        taskInput.value = '';       // after add task ,clear input button
    }
    e.preventDefault();
}


function removeTask(e){
    if (e.target.hasAttribute('href')){
        if (confirm('Are you sure ?')){
            let ele = e.target.parentElement;
            // console.log(ele);
            ele.remove();
            removeFromLs(ele);  // delete from local storage 
        }
    }
}

// clear task button 

function clearTask(e){
    taskList.innerHTML = '';  // inner html = ' ' ; mane oi list ke faka kora
    localStorage.clear();     // local stroage clear 
}


// filter task 
function filterTask(e){
     let text = e.target.value.toLowerCase(); //user input, use lowercase for matching
    //  console.log(text);
    document.querySelectorAll('li').forEach(task =>{
        let item = task.firstChild.textContent;         // checking all item to define a foreach loop
        if (item.toLowerCase().indexOf(text)!=-1){
            task.style.display = 'block';       // if get will show
        }
        else{
            task.style.display = 'none';
        }
    })
}


  
// store in local storage 

function storeTaskInLocalStorage(task){
    let tasks ;
    if (localStorage.getItem('tasks')=== null){     // if nul will show
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);   //task push
 

    localStorage.setItem('tasks',JSON.stringify(tasks));  // item pss
}

function getTask(){
    let tasks ;
    if (localStorage.getItem('tasks')=== null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

// local stroage  remove  function 

function removeFromLs(taskItem){
    let tasks ;
    if (localStorage.getItem('tasks')=== null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);  // to remove <a> tag

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            task.splice(index,1);
        };
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}