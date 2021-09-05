const addBtn = document.getElementById("add-btn");
const input = document.getElementById("input");
const pNum = document.getElementById("priority");
const todoList = document.querySelector(".todo-list");
const filter = document.getElementById("type");
let arr=[];

if(localStorage.getItem("arr")===null){
    localStorage.setItem("arr", JSON.stringify(arr));
}

arr=JSON.parse(localStorage.getItem("arr"));
window.addEventListener("DOMContentLoaded", rendertodo);

function addtodo(e){
    e.preventDefault();
    let inputVal = input.value.trim();
    if(inputVal==""){
        alert("Please enter a valid input");
    }
    else{ 
        let newtask={priority: pNum.value,
                    task: inputVal
                };
        arr.push(newtask);
        localStorage.setItem("arr", JSON.stringify(arr));

        rendertodo();
        input.value="";
    }   
}

function rendertodo(){
    arr.sort((a,b)=>{
        return b.priority-a.priority;
    });
    let content="";
    
    for(let tasks of arr){
        content+=  `<div class="todo">
            <li class="todo-item">${tasks.task}</li>
            <div>
                <i class="fas fa-check check-btn"></i>                
                <i class="fas fa-trash del-btn"></i>
            </div>
        </div>`;
    }
    todoList.innerHTML=content;
}

function filtertodo(e){

    let todos=todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        if(e.target.value === "all"){
            todo.style.display = "flex";
        }
        else if(e.target.value === "completed"){
            if(todo.classList.contains("completed"))
                todo.style.display = "flex";
            else
                todo.style.display = "none";
        }
        else if(e.target.value === "active"){
            if(!todo.classList.contains("completed") && !todo.classList.contains("deleted"))
                todo.style.display = "flex";
            else
                todo.style.display = "none";
        }
        else if(e.target.value === "deleted"){
            if(todo.classList.contains("deleted"))
                todo.style.display = "flex";
            else
                todo.style.display = "none";
        }
        
    });
}

const d = Date.now();
console.log(d);


todoList.addEventListener("click", (e)=>{
    if(e.target.nodeName === "I" && e.target.classList.contains("del-btn")){
        // console.log(e);
        e.target.parentElement.parentElement.remove();
    }
    if(e.target.nodeName === "I" && e.target.classList.contains("check-btn")){
        console.log(e.target.parentElement.parentElement);       
        if(!e.target.parentElement.parentElement.classList.contains("completed"))
            e.target.parentElement.parentElement.classList.add("completed");
        
    }
    // console.log(e.target.nodeName);
    // e.target.erase();
});

addBtn.addEventListener("click", addtodo);
filter.addEventListener("click", filtertodo);
