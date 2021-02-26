'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
            thisController.a = true;
            document.getElementById("add-item-button").classList.add("todo_button");
            document.getElementById("delete-list-button").classList.add("todo_button");
            document.getElementById("close-list-button").classList.add("todo_button");
            document.getElementById("add-item-button").classList.remove("disabled");
            document.getElementById("delete-list-button").classList.remove("disabled");
            document.getElementById("close-list-button").classList.remove("disabled");
            document.getElementById("undo-button").classList.remove("todo_button");
            document.getElementById("redo-button").classList.remove("todo_button");
            document.getElementById("todo-lists-list").firstChild.classList.add("highlight");
        }
    }
    enableListButtons() {
        console.log("dog");
        document.getElementById("add-item-button").classList.remove("disabled");
        document.getElementById("delete-list-button").classList.remove("disabled");
        document.getElementById("close-list-button").classList.remove("disabled");
    }
    disableListButtons() {
        document.getElementById("add-item-button").classList.add("disabled");
        document.getElementById("delete-list-button").classList.add("disabled");
        document.getElementById("close-list-button").classList.add("disabled");
        document.getElementById("add-item-button").classList.remove("todo_button");
            document.getElementById("delete-list-button").classList.remove("todo_button");
            document.getElementById("close-list-button").classList.remove("todo_button");

        document.getElementById("undo-button").classList.remove("todo_button");
        document.getElementById("redo-button").classList.remove("todo_button");
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    hideList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        document.getElementById("todo-lists-list").firstChild.classList.remove("highlight");
        this.clearItemsList();
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    swapToDiv(e, isTask) {
        let newTag = document.createElement("div");
        newTag.innerHTML = e.value;
        if (isTask) {
            newTag.classList.add("task-col");
            e.parentNode.replaceChild(newTag, e);
        }
        else {
            newTag.classList.add("due-date-col");
            e.parentNode.replaceChild(newTag, e);
        }
    }
    swapToInput(e, isTask) {
        let newTag = document.createElement("input");
        newTag.defaultValue = e.innerHTML;
        if (isTask) {
            newTag.classList.add("task-col");
        }
        else {
            newTag.type = "date";
            newTag.classList.add("due-date-col");
        }
        e.parentNode.replaceChild(newTag, e);
    }
    swapToDropdown(e, status) {
        let select1 = document.createElement("select");
        select1.classList.add("status-dropdown");
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        option1.value = "incomplete";
        option1.innerHTML = "incomplete";
        option2.value = "complete";
        option2.innerHTML = "complete";
        option2.selectedIndex = "0";
        select1.appendChild(option1);
        select1.appendChild(option2);
        select1.value = status
        e.parentNode.replaceChild(select1, e);
    }
    swapDropdownToDiv(e) {
        let newTag = document.createElement("div");
        newTag.classList.add("status-dropdown");
        newTag.innerHTML = e.value;
        if (e.value == "complete") {
            newTag.classList.add("complete-status");
        }
        else {
            newTag.classList.add("incomplete-status");
        }
        e.parentNode.replaceChild(newTag, e);
    }
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();
        /*
        1. On click, call method
         */
        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                + "<div class='task-col'>" + listItem.description + "</div>"
                                + "<div class='due-date-col' type=text>" + listItem.dueDate + "</div>"
                                + "<div class='status-col'>"
                                + "<div class='status-dropdown'>" + listItem.getStatus() + "</div></div>"
                                + "<div class='list-controls-col'>";
            if (i == 0) {
                listItemElement += " <div class='list-item-control material-icons arrow-up disabled'>keyboard_arrow_up</div>"
            }
            else {
                listItemElement += " <div class='list-item-control material-icons arrow-up todo_button'>keyboard_arrow_up</div>"
            }
            if (i == list.items.length -1) {
                listItemElement += " <div class='list-item-control material-icons arrow-down disabled'>keyboard_arrow_down</div>"
            }
            else {
                listItemElement += " <div class='list-item-control material-icons arrow-down todo_button'>keyboard_arrow_down</div>"
            }
            listItemElement += " <div class='list-item-control material-icons close todo_button'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
                                //"<div class='status-dropdown'>Incomplete<div class=select-options</div>"
            itemsListDiv.innerHTML += listItemElement;
        }
        let statuses = document.getElementsByClassName("status-dropdown");
        for (let i = 0; i < statuses.length; i++) {
            if (statuses[i].innerHTML == "complete") {
                statuses[i].classList.add("complete-status");
            }
            if (statuses[i].innerHTML == "incomplete") {
                statuses[i].classList.add("incomplete-status");
            }
        }
        if (document.getElementById("todo-lists-list").children.length != 0) {
            document.getElementById("todo-lists-list").firstChild.classList.add("highlight");
        }
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}