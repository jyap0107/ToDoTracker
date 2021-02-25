'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveItemDown_Transaction extends jsTPS_Transaction {
    constructor(initModel, index, element) {
        super();
        this.model = initModel;
        this.index = index;
        this.element = element;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        // Make a model variable for current index and element?
        this.model.removeItem(this.index);
        document.getElementById("undo-button").classList.add("todo-button");
    }
        // Undo transaction is change innerHTML back to old
    undoTransaction() {
        this.model.addItemToCurrentListByIndex(this.index, this.element);
    }
}