'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import ChangeTaskText_Transaction from './transactions/ChangeTaskText_Transaction.js'
import ChangeDueDate_Transaction from './transactions/ChangeDueDate_Transaction.js'
import ChangeStatus_Transaction from './transactions/ChangeStatus_Transaction.js'
import MoveItemDown_Transaction from './transactions/MoveItemDown_Transaction.js'
import MoveItemUp_Transaction from './transactions/MoveItemUp_Transaction.js'
import RemoveItem_Transaction from './transactions/RemoveItem_Transaction.js'

/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }
    addItemToCurrentListByIndex(index, itemToAdd) {
        this.currentList.items.splice(index, 0, itemToAdd);
        this.view.viewList(this.currentList);

    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addNewItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    enableUndoButton() {
        let a = document.getElementById("undo-button");
        a.classList.add("todo_button");
        a.classList.remove("disabled");
    }
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.enableUndoButton();
        this.tps.addTransaction(transaction);   
    }
    changeTaskTextTransaction(index, input) {
        let transaction = new ChangeTaskText_Transaction(this, index, true, input);
        this.enableUndoButton();
        this.tps.addTransaction(transaction);
    }
    changeDueDateTransaction(index, input) {
        let transaction = new ChangeDueDate_Transaction(this, index, true, input);
        this.enableUndoButton();
        this.tps.addTransaction(transaction);
    }
    changeStatusTransaction(index, value) {
        let transaction =new ChangeStatus_Transaction(this, index, value);
        this.enableUndoButton();
        this.tps.addTransaction(transaction);
    }
    moveItemDownTransaction(index) {
        let transaction = new MoveItemDown_Transaction(this, index);
        this.enableUndoButton();
        this.tps.addTransaction(transaction);
    }
    moveItemUpTransaction(index) {
        let transaction = new MoveItemUp_Transaction(this, index);
        this.enableUndoButton();
        this.tps.addTransaction(transaction);
    }
    removeItemTransaction(index, element) {
        let transaction = new RemoveItem_Transaction(this, index, element);
        this.enableUndoButton();
        this.tps.addTransaction(transaction);
    }

    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }

    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Load the items for the listId list into the UI.
     */

    loadList(listId) {
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);
            this.shiftLists(listIndex);
            this.view.refreshLists(this.toDoLists);
        }
    }

    shiftLists(listIndex) {
        for (let i = listIndex; i > 0; i--) {
            this.toDoLists[i] = this.toDoLists[i-1];
        }
        this.toDoLists[0] = this.currentList;
    }
    moveItemUp(index) {
        if (index != 0) {
            let temp = this.currentList.items[index-1];
            this.currentList.items[index-1] = this.currentList.items[index];
            this.currentList.items[index] = temp;
            this.view.viewList(this.currentList);
        }
    }
    moveItemDown(index) {
        if (index != this.currentList.items.length-1) {
            let temp = this.currentList.items[index+1];
            this.currentList.items[index+1] = this.currentList.items[index];
            this.currentList.items[index] = temp;
            this.view.viewList(this.currentList);
        }
    }

    // swapToDiv(e, index, isTask) {
    //     let newTag = document.createElement("div");
    //     newTag.innerHTML = e.value;
    //     if (isTask) {
    //         newTag.classList.add("task-col");
    //         e.parentNode.replaceChild(newTag, e);
    //         this.currentList.items[index].setDescription(e.value);
    //     }
    //     else {
    //         newTag.classList.add("due-date-col");
    //         e.parentNode.replaceChild(newTag, e);
    //         this.currentList.items[index].setDueDate(e.value);
    //     }
    // }
    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
            let a = document.getElementById("undo-button");
            a.classList.add("todo_button");
            a.classList.remove("disabled");
            
        }
        if (!this.tps.hasTransactionToRedo()) {
            let a = document.getElementById("redo-button");
            a.classList.add("disabled");
            a.classList.remove("todo_button");
        }
    }   

    /**
     * Remove the item at selected index from the current list and refresh.
     */
    removeItem(index) {
        this.currentList.removeItem(this.currentList.items[index]);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        let elements = document.getElementsByClassName("list-item-control");
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("todo_button_edit_current");
        }
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
    }
    removeListConfirmation() {
        if (this.currentList != null) {
            let modal = document.getElementById('delete-list-confirmation');
            modal.style.display = 'block';
        }
    }
    removeListModalHide() {
        let modal = document.getElementById('delete-list-confirmation');
        modal.style.display = 'none';
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
            let a = document.getElementById("redo-button");
            a.classList.add("todo_button");
            a.classList.remove("disabled");
        }
        if (!this.tps.hasTransactionToUndo()) {
            let a = document.getElementById("undo-button");
            a.classList.add("disabled");
            a.classList.remove("todo_button");
        }
    }
    revertTaskText(index, oldHTML) {
        this.currentList.items[index].setDescription(oldHTML);
        this.view.viewList(this.currentList);
    }
    revertDueDate(index, oldHTML) {
        this.currentList.items[index].setDueDate(oldHTML);
        this.view.viewList(this.currentList);   
    }
    revertStatus(index, oldHTML) {
        this.currentList.items[index].setStatus(oldHTML);
        this.view.viewList(this.currentList);   
    }
}