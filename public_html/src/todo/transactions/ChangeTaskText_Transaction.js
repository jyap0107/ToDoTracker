'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeTaskText_Transaction extends jsTPS_Transaction {
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
        this.oldHTML = this.model.currentList.items[this.index].getDescription();
        if (this.input.parentNode != null) {
            this.model.view.swapToDiv(this.input, true);
        }
        this.model.currentList.items[this.index].setDescription(this.input.value);
        this.model.view.viewList(this.model.currentList);
    }
        // Undo transaction is change innerHTML back to old
    undoTransaction() {
        this.model.revertTaskText(this.index, this.oldHTML);
    }
}