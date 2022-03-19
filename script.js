 //creating element
      //append child
      let storedTasks=[];
      let counter=0;
      storedTasks=JSON.parse(localStorage.getItem('taskList')) ||[];
      function updateTask(){
          storedTasks.forEach(task=>{
            let newTaskName = task.title;
        let newTaskDate = task.date;
        let newTaskItem = document.createElement("li");

        newTaskItem.innerHTML = `<span>${newTaskName}</span> <span>${newTaskDate}</span><br>
         <button onclick="editTask(event)" class="edit">Edit</button>
        <button onclick="deleteTask(event)" class="delete">X</button>
        <input class="task-checkbox" type="checkbox" onclick="checkstatus()"/><br>`;

        document.getElementById("task-list-box").appendChild(newTaskItem);
          })
      }
      function updateStorage(){
          let tasksArray=[];

          let tasks=document.getElementsByTagName("li");

          let TasksList=Array.from(tasks);
          TasksList.forEach(Element=>{
              let obj={};
              obj.title=Element.children[0].innerText;
              obj.date=Element.children[1].innerText;
              tasksArray.push(obj);
          })
          localStorage.setItem('taskList',JSON.stringify(tasksArray));
          storedTasks=JSON.parse(localStorage.getItem('taskList'))
      }
      //add Task
      function addTaskHandler(event) {
        let newTaskName = document.getElementById("task-name").value;
        let newTaskDate = document.getElementById("task-date").value;
        let newTaskItem = document.createElement("li");

        newTaskItem.innerHTML = `<span>${newTaskName}</span> <span>${newTaskDate}</span><br>
         <button onclick="editTask(event)" class="edit">Edit</button>
        <button onclick="deleteTask(event)" class="delete">X</button>
        <input class="task-checkbox" type="checkbox" onclick="checkstatus()"/><br>`;

        document.getElementById("task-list-box").appendChild(newTaskItem);
        updateStorage();

        let inputbox1 = event.target.parentNode.children[0];
        inputbox1.value = "";
      }
      //delete Task
      function deleteTask(event) {
        if (event.target.parentNode) event.target.parentNode.remove();
        updateStorage();
      }

      //update task
      function editTask(event) {
        let currentItem = event.target.parentNode;
        let currentItemTaskName = currentItem.children[0];
        let currentItemTaskDate = currentItem.children[1];

        currentItem.innerHTML = `<span>${currentItem.children[0].innerText}</span> <span>${currentItem.children[1].innerText}</span>

        <input type="text" id="current-task-name" placeholder=${currentItemTaskName.innerText}>
        <input type="date" name="" id="current-task-date" placeholder="${currentItemTaskDate.value}">
        <button onclick="saveTask(event)">Save</button> <button onclick="deleteTask(event)">X</button>
        <input class="task-checkbox" type="checkbox" onclick="checkstatus()"/><br>`;

        currentItem.children[0].style.display = "none";
        currentItem.children[1].style.display = "none";

        updateStorage();
      }
      function saveTask(event) {
        let currentItem = event.target.parentNode;
        let currentItemTaskName = currentItem.children[0];
        let currentItemTaskDate = currentItem.children[1];

        let editedTaskName = currentItem.children[2];
        let editedTaskDate = currentItem.children[3];

        currentItemTaskName.innerText = editedTaskName.value;
        currentItemTaskDate.innerText = editedTaskDate.value;

        editedTaskDate.remove();
        editedTaskName.remove();

        currentItem.children[0].style.display = "inline";
        currentItem.children[1].style.display = "inline";

        currentItem.children[2].setAttribute("onclick", "editTask(event)");
        currentItem.children[2].innerText = "Edit";

        updateStorage();
      }
      function checkstatus(){
        let selectedTasks = document.querySelectorAll(".task-checkbox");
        let btn=document.getElementById("deletebtn");
        let flag=false;
        for(let i=0;i<selectedTasks.length;i++){
          if(selectedTasks[i].checked){
            // btn.classList.remove("hide");
            btn.classList.remove('hide');
            setTimeout(function () {
              btn.classList.remove('visuallyhidden');
            }, 10);
            flag=true;
            break;
          }
        }
        if(!flag){
        //   btn.classList.add("hide");
          btn.classList.add('visuallyhidden');    
    btn.addEventListener('transitionend', function(e) {
      btn.classList.add('hide');
    }, {
      capture: false,
      once: true,
      passive: false
    });
        }
      }
      function deleteMultipleTasksHandler() {
        let selectedTasks = document.querySelectorAll(".task-checkbox");
        selectedTasks.forEach((Element) => {
          if (Element.checked) {
            Element.parentNode.remove();
          }
        });
        // document.getElementById("deletebtn").classList.add("hide");
        let btn=document.getElementById("deletebtn");
        btn.classList.add('visuallyhidden');    
    btn.addEventListener('transitionend', function(e) {
      btn.classList.add('hide');
    }, {
      capture: false,
      once: true,
      passive: false
    });
        
        updateStorage();
      }

      function searchTaskHandler(){
           let searchText=document.getElementById('task-search').value;
           let nodes = document.getElementById('task-list-box').childNodes;
           if(searchText==='' || searchText===' '){
            for(var i=0; i<nodes.length; i++)
            nodes[i].style.display='flex';
           }
           let resultTasks=storedTasks.filter((task)=>task.title.toLowerCase().substring(0,searchText.length)===searchText);
           let indices=[]
           resultTasks.forEach(task=>{
            let newTaskName = task.title;
        let newTaskDate = task.date;
        let newTaskItem = document.createElement("li");
        for(var i=0; i<nodes.length; i++){
          if(nodes[i].children[0].innerText===newTaskName)
            indices.push(i);
        }
          })
          if(searchText!=='' && searchText!==' '){
            let index=0;
            for(var i=0; i<nodes.length; i++){
              if(i===indices[index]){
                nodes[i].style.display='flex';
                index++;
              }
              else
                nodes[i].style.display='none';
            }
          }
       }