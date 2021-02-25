'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDueDate_Transaction extends jsTPS_Transaction {
    constructor(initModel, index, task, input) {
        super();
        this.model = initModel;
        this.index = index;
        this.task = task;
        this.input = input;
        this.oldHMTL = "";
    }

    doTransaction() {
        // MAKE A NEW ITEM
        // Make a model variable for current index and element?
        this.oldHTML = this.model.currentList.items[this.index].getDueDate();
        this.view.swapToDiv(input, index, false);
        this.currentList.items[index].setDueDate(input.value);
    }
        // Undo transaction is change innerHTML back to old
    undoTransaction() {
        this.model.revertDueDate(this.index, this.oldHTML)
    }
}