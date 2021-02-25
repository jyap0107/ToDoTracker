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
            let elements = document.getElementsByClassName("list-item-control");
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add("todo_button_edit_current");
            }
        }
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
                                + "<div class='list-controls-col'>" 
                                + " <div class='list-item-control material-icons arrow-up todo_button'>keyboard_arrow_up</div>"
                                + " <div class='list-item-control material-icons arrow-down todo_button'>keyboard_arrow_down</div>"
                                + " <div class='list-item-control material-icons close todo_button'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
                                //"<div class='status-dropdown'>Incomplete<div class=select-options</div>"
            itemsListDiv.innerHTML += listItemElement;
        }
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}