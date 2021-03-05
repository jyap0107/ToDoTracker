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
        document.getElementById("undo-button").addEventListener("click", function(event){
            if (!event.target.classList.contains("disabled")) {
                appModel.undo();
            }
        })
        document.getElementById("redo-button").addEventListener("click", function(event){
            if (!event.target.classList.contains("disabled")) {
                appModel.redo();
            }
        })
        document.getElementById("delete-list-button").onclick = function() {
            if (appModel.currentList != null){
                appModel.removeListConfirmation();
            }
        }
        document.getElementById("confirm-delete").onclick = function() {
            appModel.removeCurrentList();
            appModel.removeListModalHide();
            appModel.view.disableListButtons();
            document.getElementById("todo-lists-list").firstChild.classList.remove("highlight");
            
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
            if (appModel.currentList != null){
                appModel.addNewItemTransaction();
            }
        }
        document.getElementById("close-list-button").onclick = function() {
            appModel.view.hideList();
            appModel.view.disableListButtons();
            appModel.currentList = null;
            appModel.tps.clearAllTransactions();
        }
        // Event Listener for changing the description
        document.addEventListener("click", function(e) {
            let input = document.querySelector("input");
            // If clicked on input when it is already open
            if (e.target && e.target.matches("input")) {
                return;
            }
            // If did not click on input and there is an input
            if (e.target && !e.target.matches("input")) {
                if (input != null){
                    let index = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);
                    if (input.classList.contains("task-col")) {
                        //Should be handled via view.
                        appModel.changeTaskTextTransaction(index, input);
                        // appModel.view.swapToDiv(input, index, true);
                        // appModel.currentList.items[index].setDescription(input.value);
                    }
                    if (input.classList.contains("due-date-col")){
                        appModel.changeDueDateTransaction(index, input);
                    }
                    if (input.parentNode != null && input.parentNode.firstChild == input) {
                    }
                    // if (input.classList.contains("list-sidebar-item") && e.target.id != input.id) {
                    //     appModel.view.swapSidebarToDiv(input);
                    //     console.log("swapped back yes");
                    // }
            };
            if (e.target && e.target.matches(".task-col") && !e.target.matches("#task-col-header")) {
                appModel.view.swapToInput(e.target, true);
                return;
            }
            if (e.target && e.target.matches(".due-date-col") && !e.target.matches("#date-col-header")) {
                appModel.view.swapToInput(e.target, false);
                return;
            }
            // if (e.target && (e.target.matches(".list-sidebar-item"))) {
            //     // console.log(e.target);
            //     // console.log(e.target.parentNode);
            //     appModel.view.swapSidebarToDiv(e.target);
            // }
            // document.getElementById("todo-list-items-div").addEventListener("click",function(e) {
            //     if (e.target && e.target.matches(".task-col")) {
            //         appModel.swapItemTag(e.target);
            //     }
            // })
            // If clicked onto the status element

        }
    })
        // Event listener for transforming HTML to select and back
        document.addEventListener("click", function(e) {
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
        document.addEventListener("click", function(event) {
            let element = event.target;
            let index = 0;
            if (element.matches(".arrow-up") || element.matches(".arrow-down") || element.matches(".close")) {
                let items = document.getElementById("todo-list-items-div").children;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].contains(element)) {
                        index = i;
                    }
                }
                if (element.matches(".arrow-up")) {
                    appModel.moveItemUpTransaction(index);
                }
                if (element.matches(".arrow-down")) {
                    appModel.moveItemDownTransaction(index);
                }
                if (element.matches(".close")) {
                    appModel.removeItemTransaction(index, appModel.currentList.items[index]);
                }
            }
        })

        // If you click outside of an input, set all inputs back to div.


    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        // this.model.currentList = this.model.toDoLists[0];
        if (this.model.currentList == null) {
            this.model.view.disableListButtons();
        }
        this.model.tps.clearAllTransactions();
        this.model.loadList(listId);
    }
}