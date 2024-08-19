class UndoRedoService {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }

    saveState() {
        const currentState = {/* Get the current state of tasks */};
        this.undoStack.push(currentState);
        this.redoStack = []; // Clear redo stack on a new action
    }

    undo() {
        if (this.undoStack.length > 0) {
            const state = this.undoStack.pop();
            this.redoStack.push(state);
            // Apply the state
            return state;
        } else {
            throw new Error('No actions to undo');
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const state = this.redoStack.pop();
            this.undoStack.push(state);
            // Apply the state
            return state;
        } else {
            throw new Error('No actions to redo');
        }
    }
}

module.exports = new UndoRedoService();
