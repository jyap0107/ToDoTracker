'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveItemDown_Transaction extends jsTPS_Transaction {
    constructor(initModel, index) {
        super();
        this.model = initModel;
        this.index = index;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        // Make a model variable for current index and element?
        this.model.moveItemUp(this.index);
    }
        // Undo transaction is change innerHTML back to old
    undoTransaction() {
        this.model.moveItemUp(this.index);
    }
}