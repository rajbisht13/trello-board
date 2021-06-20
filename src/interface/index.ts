export type IViewState = 'CREATE_LIST' | 'POPULATE_LIST';
export type IModalState = 'ADD_LIST' | 'ADD_TASK' | null;

export interface IList {
  id: number;
  name: string;
}

export interface ITask {
  id: number;
  name: string;
  listId: number;
  description: string;
  createdAt: number;
}

export interface IState {
  lists: Array<IList>;
  tasks: Array<ITask>;
  currentListId: number;
}

export type IAction = 
  | { type: 'ADD_LIST', payload: any }
  | { type: 'ADD_TASK', payload: any }
  | { type: 'REMOVE_TASK', payload: any }
  | { type: 'REMOVE_LIST', payload: any }
  | { type: 'UPDATE_CURRENT_LIST_ID', payload: number }
  | { type: 'MOVE_TASK', payload: number };