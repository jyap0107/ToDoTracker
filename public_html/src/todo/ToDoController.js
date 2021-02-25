'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {
    }

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;
        let index = 0;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onclick = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onclick = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onclick = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onclick = function() {
            appModel.removeListConfirmation();
        }
        document.getElementById("confirm-delete").onclick = function() {
            appModel.removeCurrentList();
            appModel.removeListModalHide();
            
        }
        document.addEventListener("keydown", function(event) {
            const key = event.key;
            if (key == "Escape") {
                appModel.removeListModalHide();
            }
        })
        document.getElementById("x-button").onclick = function() {
            appModel.removeListModalHide();
        }
        document.getElementById("add-item-button").onclick = function() {
            appModel.addNewItemTransaction();
        }
        // Event Listener for changing the description
        document.addEventListener("mousedown", function(e) {
            let input = document.querySelector("input");
            // If clicked on input when it is already open
            if (e.target && e.target.matches("input")) {
                return;
            }
            // If did not click on input and there is an input
            if (e.target && !e.target.matches("input")) {
                if (input != null){
                    let parent = input.parentNode;
                    let index = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);
                    if (input.classList.contains("task-col")) {
                        //Should be handled via view.
                        appModel.changeTaskTextTransaction(index, input);
                        // appModel.view.swapToDiv(input, index, true);
                        // appModel.currentList.items[index].setDescription(input.value);
                    }
                    else {
                        appModel.changeDueDateTransaction(index, input);
                    }
                }
            }
            if (e.target && e.target.matches(".task-col") && !e.target.matches("#task-col-header")) {
                appModel.view.swapToInput(e.target, true);
                return;
            }
            if (e.target && e.target.matches(".due-date-col") && !e.target.matches("#date-col-header")) {
                appModel.view.swapToInput(e.target, false);
                return;
            }
            // document.getElementById("todo-list-items-div").addEventListener("click",function(e) {
            //     if (e.target && e.target.matches(".task-col")) {
            //         appModel.swapItemTag(e.target);
            //     }
            // })
            // If clicked onto the status element

        })
        // Event listener for transforming HTML to select and back
        document.addEventListener("mousedown", function(e) {
            let input = document.querySelector("select");
            if (e.target && !e.target.matches("select")) {
                if (input != null) {
                    appModel.view.swapDropdownToDiv(input);
                }
            }
            if (e.target && e.target.matches(".status-dropdown") && !e.target.matches("select")) {
                let element = e.target;
                let parent = element.parentNode.parentNode;
                let index = Array.from(parent.parentNode.children).indexOf(parent);
                appModel.view.swapToDropdown(e.target, appModel.currentList.items[index].status);
            }
        })
        // Event Listener for detecting change of the dropdown
        document.getElementById("todo-list-items-div").addEventListener("change", function(event) {
            let element = event.target;
            if (element.matches(".status-dropdown")) {
                //can be handled by model
                let parent = element.parentNode.parentNode;
                let index = Array.from(parent.parentNode.children).indexOf(parent);
                appModel.changeStatusTransaction(index, element.value)
            }
        })
        document.addEventListener("mousedown", function(event) {
            let element = event.target;
            let index = 0;
            if (element.matches(".arrow-up")) {
                let items = document.getElementById("todo-list-items-div").children;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].contains(element)) {
                        index = i;
                    }
                }
            }
            // if (e.target && e.target.matches("arrow-up")) {
            //     appModel.moveItemUp();
            // }
            // if (e.target && e.target.matches("arrow-down")) {
            //     appModel.moveItemDown();
            // }
            // if (e.target && e.target.matches("close")) {
            //     appModel.moveListUp();
            // }
        }) 

        
        // If you click outside of an input, set all inputs back to div.


        
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        // this.model.currentList = this.model.toDoLists[0];
        this.model.tps.clearAllTransactions();
        this.model.loadList(listId);
        
    }
}