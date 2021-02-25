'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDueDate_Transaction extends jsTPS_Transaction {
    constructor(initModel, index, value) {
        super();
        this.model = initModel;
        this.index = index;
        this.value = value;
        this.oldHMTL = "";
    }

    doTransaction() {
        // MAKE A NEW ITEM
        // Make a model variable for current index and element?
        this.oldHTML = this.model.currentList.items[this.index].getStatus();
        this.model.currentList.items[this.index].setStatus(this.value);
    }
        // Undo transaction is change innerHTML back to old
    undoTransaction() {
        this.model.revertStatus(this.index, this.oldHTML)
    }
}