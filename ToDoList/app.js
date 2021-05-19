const inputBox = document.querySelector(".inputField input");
const addButtton = document.querySelector(".inputField button");
const todolist = document.querySelector(".todolist");
const deleteTasksButton = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user enetered value
    if(userData.trim() != 0) //if user values arent only spaces trim=remove all whitespaces
    {
        addButtton.classList.add("active"); //active the add button
    }
    else
    {
        addButtton.classList.remove("active"); //unactive the add button
    }
}

tasks(); //ak refreshnem stranku aby tam zostal zoznam uloh

// if user click on the add button 
addButtton.onclick = ()=>{
    let userData = inputBox.value; //getting user enetered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage 
    if(getLocalStorage == null) //if local storage is null
    {
        listArray = []; //create blank array
    }
    else
    {
        listArray = JSON.parse(getLocalStorage); //transforming json string into js object
    }
    listArray.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into json string
    tasks(); //calling tasks function  
    addButtton.classList.remove("active"); //unactive the add button
}

// function to add task list inside ul
function tasks()
{
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
    if(getLocalStorage == null) //if local storage is null
    {
        listArray = []; //create blank array
    }
    else
    {
        listArray = JSON.parse(getLocalStorage); //transforming json string into js object
    }
    const num_tasks = document.querySelector(".num_tasks");
    num_tasks.textContent = listArray.length; // passing length value of array to num_tasks 
    let newLiID = '';
    // if array length is greater than 0 -> active deleteTasks button
    if(listArray.length > 0)
    {
        deleteTasksButton.classList.add("active");
    }
    else
    {
        deleteTasksButton.classList.remove("active");
    }
    listArray.forEach((element, index) => {
        newLiID += `<li> ${element} <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
                
    });
    todolist.innerHTML = newLiID; // adding new li id inside ul
    inputBox.value = ""; //once task added -> leave input field blank  
}

function deleteTask(index)
{
    let getLocalStorage = localStorage.getItem("New Todo"); 
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1); //delete or remove the particular indexed li
    // after remove the li -> again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into json string
    tasks(); 
}

//delete all
deleteTasksButton.onclick = ()=>{
    listArray = []; //empty an array
    // after delete all tasks -> update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into json string
    tasks();
}