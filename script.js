

//Constants
const tName = document.querySelector('#task-name');
const tDesc = document.querySelector('#task-description');
const form = document.querySelector('#add-task');
const toDoList = document.querySelector('#task-list ul');
const openTasks = document.querySelector('#open-count');
const tCount = document.querySelector('#task-count');


//Classes
class UI {

  showMsg(msg, type){

    const myDiv = document.createElement('div');
    myDiv.classList.add('text-center', 'alert')
    myDiv.textContent = msg;

    if (type === 'error'){
      myDiv.classList.add('alert-danger');
    }
    else {
      myDiv.classList.add('alert-success');
    }
    document.querySelector('.primary-content').insertBefore(myDiv, form);
    setTimeout(() => {
      myDiv.remove();
    }, 2000)
}
  listHTML(taskObj){

  const {tasks, taskCount, unchecked} = taskObj;

  toDoList.innerHTML = '';
  tasks.forEach(task => {
    const {name, description, id} = task;
    const newTask = document.createElement('div');
    newTask.classList.add('p-3');
    newTask.dataset.id = id;
    
    //Detailing elements for the div
    const headline = document.createElement('h3');
    headline.innerHTML = name;

    const content = document.createElement('p');
    content.innerHTML = description;

    //Delete Btn
    const delBtn = document.createElement('button');
    delBtn.classList.add('btn', 'btn-success', 'delete-task', 'mr-2');
    delBtn.innerHTML= 'Resolve ✓';
    delBtn.onclick = () => myTasks.removeTask(id);

    //Appending elements to newTask
    newTask.appendChild(headline);
    newTask.appendChild(content);
    newTask.appendChild(delBtn);

    //Appending new task to task List
    toDoList.appendChild(newTask);
  });

  openTasks.textContent = unchecked;
  tCount.textContent = taskCount;

}
}

class Tasks {
  constructor (){
    this.tasks = [];
    this.taskCount = 0;
    this.unchecked = 0;
  }
  
  newTask(task){
    this.tasks = [...this.tasks, task];
    this.taskCount++;
    this.unchecked++;
  }

  removeTask(id){
    this.tasks = this.tasks.filter( task => task.id !== id );
    this.unchecked--;
    ui.showMsg('Task Resolved successfully', 'success');
    ui.listHTML(myTasks);
  }


}


//Instances
const myTasks = new Tasks();
const ui = new UI();


//Event Listeners:
eventListeners();
function eventListeners () {
document.addEventListener('DOMCOntentLoaded', () =>  {
//Possible condition for DOM Content loaded
})
form.addEventListener('submit', addTask);
}


//global functions
function addTask(e) {
  e.preventDefault();

  const taskName = tName.value;
  const taskDescription = tDesc.value;

  if (taskName === '' || taskDescription === ''){
    ui.showMsg('All fields are required', 'error');
    return;
  }
  const myObj = {
    name: taskName,
    description: taskDescription,
    id: Date.now()
  };  
  myTasks.newTask(myObj);

  
  //printing new List
  ui.listHTML(myTasks);

  ui.showMsg('Task added succesfully', 'success');  

  //Resetting form input.
  form.reset();

}
