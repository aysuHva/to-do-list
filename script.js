const form = document.querySelector("form");
const input = document.querySelector(".addToTask");
const taskList = document.querySelector(".taskList");
const sort = document.querySelector(".sort");
let items;
let icon = true;

checkList();

eventListeners();

function checkList() {
  if (taskList.children.length == 0) {
    taskList.style.display = "none";
  }
}



function eventListeners() {
  form.addEventListener("submit", addNewItem);
  taskList.addEventListener("click", deleteItem);
  sort.addEventListener("click", sortListDir);
}

function createItem(text) {
  taskList.style.display = "block";
  const li = document.createElement("li");
  li.classList = "todo-item";
  li.appendChild(document.createTextNode(text));
  const a = document.createElement("a");
  a.classList = "delete-item";
  a.setAttribute("href", "#");
  a.innerHTML = '<img src="./img/x-btn.svg"/ class="x-btn">';
  li.appendChild(a);
  taskList.appendChild(li);
}

function addNewItem(e) {
  if (input.value !== "" && input.value !== " ") {
    createItem(input.value);
    
    input.value = "";
  } else {
    alert("Xananı doldurun!");
  }
  e.preventDefault();
}
function deleteItem(e) {
  console.log(e.target);
  console.log(e.target.className);
  if (e.target.className === "x-btn") {
    e.target.parentElement.parentElement.remove();
    
  }
  checkList();
  e.preventDefault();
}

function sortListDir() {
  let i,
    switching,
    b,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    b = taskList.getElementsByTagName("LI");
    for (i = 0; i < b.length - 1; i++) {
      shouldSwitch = false;
      if (dir == "asc") {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          document.querySelector(".sort").innerHTML =
            '<img src="./img/sort-icon-2.svg"/ class="sort-icon">';
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          document.querySelector(".sort").innerHTML =
            '<img src="./img/sort-icon-1.svg"/ class="sort-icon">';
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
