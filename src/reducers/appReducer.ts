import { IAction, IState } from "../interface";

export const initialState: IState = {
  lists: [],
  tasks: [],
  currentListId: 0
};

export const initializer = (initState: IState) => {
  const trelloStore = localStorage.getItem('trelloStore');
  if (trelloStore) {
    const store = JSON.parse(trelloStore);
    return { ...initState, ...store };
  }
  return initState;  
}

export const reducer = (state: IState, action: IAction) => {
  const { type, payload } = action;
  switch(type) {
    case 'ADD_LIST': {
      return {
        ...state,
        lists: [...state.lists, payload]
      };
    }
    case 'REMOVE_LIST': {
      const filteredList = state.lists.filter((list: any) => list.id !== payload);
      const filteredTasks = state.tasks.filter((task: any) => task.listId !== payload);
      return {
        ...state,
        lists: filteredList,
        tasks: filteredTasks
      };
    }
    case 'ADD_TASK': {
      return {
        ...state,
        tasks: [...state.tasks, payload]
      };
    }
    case 'REMOVE_TASK': {
      const filteredTasks = state.tasks.filter((task: any) => task.id !== payload);
      console.log("🚀 ~ file: reducer.ts ~ line 40 ~ reducer ~ filteredTasks", filteredTasks)
      return {
        ...state,
        tasks: filteredTasks
      };
    }
    case 'UPDATE_CURRENT_LIST_ID':
      return {
        ...state,
        currentListId: payload
      };
    case 'MOVE_TASK': {
      const { listId, taskId } = payload;
      const task = state.tasks.find((task: any) => task.id === taskId);
      const filterTasks = state.tasks.filter((task: any) => task.id !== taskId);
      const copyiedTaskWithNewListId = {
        ...task,
        listId
      };
      return {
        ...state,
        tasks: [...filterTasks, copyiedTaskWithNewListId]
      };
    }
    default:
      return state;
  }
}
