'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeListName_Transaction extends jsTPS_Transaction {
    constructor(initModel, input) {
        super();
        this.model = initModel;
        this.input = input;
        this.oldHMTL = "";
    }

    doTransaction() {
        // MAKE A NEW ITEM
        // Make a model variable for current index and element?
        this.oldHTML = this.model.currentList.getName();
        if (this.input.parentNode != null) {
            this.model.view.swapListNameToDiv(this.input, true);
        }
        this.model.currentList.items[this.index].setDescription(this.input.value);
        this.model.view.viewList(this.model.currentList);
    }
        // Undo transaction is change innerHTML back to old
    undoTransaction() {
        this.model.revertTaskText(this.index, this.oldHTML);
    }
}