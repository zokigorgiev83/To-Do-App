var todoItems = [];

function restoreItems() {
  todoItems = getItems();
}

function createUnorderedList() {
  var ul = document.createElement("ul");
  document.getElementById("items").appendChild(ul);
  ul.setAttribute("id", "ulIdentifier");
}

function displayList() {
  var listHolder = document.getElementById("ulIdentifier");

  for (var i = 0; i < todoItems.length; i++) {
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    var id = todoItems[i].id;

    checkbox.type = "button";
    checkbox.setAttribute("class", "checkbox");

    li.innerHTML = todoItems[i].item;

    if(todoItems[i].done) {
      li.style.textDecoration = "line-through";
      li.innerHTML = "done " + todoItems[i].item;
    }

    listHolder.appendChild(li);
    li.appendChild(checkbox);

    (function (id) {
      checkbox.onclick = function() {
        deleteItem(id);
        renderList();
        saveItems();
      };

      li.onclick = function() {
        toggleStatus(id);
        renderList();
        saveItems();
      };
    })(id);
  }
}

function removeListItems() {
  var items = document.getElementById("items");
  var unorderedList = document.getElementById("ulIdentifier");
  if(unorderedList !== null) {
    items.removeChild(unorderedList);
  }
}

function addNewItem() {
  var input = document.getElementById("input").value;
  var obj = {"item":"" + input};

  if (input === "" || input === " ") {
    alert("Please, fill out this field.");
    return false;
  }

  obj.id = Date.now();
  obj.done = false;
  todoItems.push(obj);

  localStorage.setItem("list", JSON.stringify(todoItems));
  renderList();
  document.getElementById("form").reset();
}

function addClickEventToButton() {
  var btn = document.getElementById("btn");
  btn.onclick = addNewItem;
}

function renderList() {
  removeListItems();
  createUnorderedList();
  displayList();
}

function deleteItem(id) {
  todoItems = todoItems.filter(function (obj) {
    return obj.id != id;
  });
}

function finishedTasks() {
  todoItems = todoItems.filter(function (obj) {
    return obj.done === true;
  });
}

function unfinishedTasks() {
  todoItems = todoItems.filter(function (obj) {
    return obj.done === false;
  });
}

function showAllTasks() {
  var allItems = document.getElementById("all");
  allItems.onclick = function() {
    restoreItems();
    renderList();
  };
}

function showCompletedTasks() {
  var doneItems = document.getElementById("completed");

  doneItems.onclick = function() {
    finishedTasks();
    renderList();
    restoreItems();
  };
}

function showUncompletedTasks() {
  var activeItems = document.getElementById("active");

  activeItems.onclick = function() {
    unfinishedTasks();
    renderList();
    restoreItems();
  };
}

function saveItems() {
  localStorage.setItem("list", JSON.stringify(todoItems));
}

function getItems() {
  var getList = localStorage.getItem("list");
  if (getList !== null) {
    return JSON.parse(getList);
  }
  return [];
}

function toggleStatus(id) {
  todoItems.map(function(item) {
    if(id == item.id) {
      item.done = !item.done;
    }
  });
}

restoreItems();
renderList();
addClickEventToButton();
showAllTasks();
showCompletedTasks();
showUncompletedTasks();
