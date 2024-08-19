import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UndoRedoService } from './undo-redo.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient, private undoRedoService: UndoRedoService) { }

  getTasks(filter: string = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?status=${filter}`);
  }

  addTask(task: any): Observable<any> {
    this.undoRedoService.addAction('add', task);
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(id: string, task: any): Observable<any> {
    const previousTaskState = { ...task };
    this.undoRedoService.addAction('update', task, previousTaskState);
    return this.http.put<any>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string, task: any): Observable<void> {
    this.undoRedoService.addAction('delete', task);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  undo(): Observable<any> {
    const lastAction = this.undoRedoService.undo();
    if (!lastAction) return of(null);

    switch (lastAction.actionType) {
      case 'add':
        return this.http.delete(`${this.apiUrl}/${lastAction.task._id}`);
      case 'update':
        return this.http.put(`${this.apiUrl}/${lastAction.task._id}`, lastAction.previousTaskState);
      case 'delete':
        return this.http.post(this.apiUrl, lastAction.task);
      default:
        return of(null);
    }
  }

  redo(): Observable<any> {
    const lastUndoneAction = this.undoRedoService.redo();
    if (!lastUndoneAction) return of(null);

    switch (lastUndoneAction.actionType) {
      case 'add':
        return this.http.post(this.apiUrl, lastUndoneAction.task);
      case 'update':
        return this.http.put(`${this.apiUrl}/${lastUndoneAction.task._id}`, lastUndoneAction.task);
      case 'delete':
        return this.http.delete(`${this.apiUrl}/${lastUndoneAction.task._id}`);
      default:
        return of(null);
    }
  }

  canUndo(): boolean {
    return this.undoRedoService.canUndo();
  }

  canRedo(): boolean {
    return this.undoRedoService.canRedo();
  }
}
