'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeTaskText_Transaction extends jsTPS_Transaction {
    constructor(initModel, index, task) {
        super();
        this.model = initModel;
        this.index = index;
        this.task = task;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        // Make a model variable for current index and element?
        this.oldHMTL = this.model.currentList.items[index].getDescription();
        this.model.view.swapToDiv(input, this.index, true);
        this.model.currentList.items[index].setDescription(input.value);
    }
        // Undo transaction is change innerHTML back to old
    undoTransaction() {
        this.model.revertTaskText(index, this.oldHTML)
    }
}