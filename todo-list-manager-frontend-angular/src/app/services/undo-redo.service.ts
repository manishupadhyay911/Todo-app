import { Injectable } from '@angular/core';

interface TaskAction {
  actionType: string;
  task: any;
  previousTaskState?: any;
}

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {
  private undoStack: TaskAction[] = [];
  private redoStack: TaskAction[] = [];

  addAction(actionType: string, task: any, previousTaskState?: any) {
    this.undoStack.push({ actionType, task, previousTaskState });
    this.redoStack = []; 
  }

  undo(): TaskAction | null {
    if (this.undoStack.length === 0) return null;
    const lastAction = this.undoStack.pop()!;
    this.redoStack.push(lastAction);
    return lastAction;
  }

  redo(): TaskAction | null {
    if (this.redoStack.length === 0) return null;
    const lastUndoneAction = this.redoStack.pop()!;
    this.undoStack.push(lastUndoneAction);
    return lastUndoneAction;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}
