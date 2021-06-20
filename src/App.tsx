import React, { useEffect, useReducer, useState } from 'react';
import Modal from 'react-modal';

import './App.css';
import { ListForm, TaskForm, List } from './components';
import { TasksContainer } from './containers';

import { IList, IModalState, ITask } from './interface';
import { initializer, initialState, reducer } from './reducers/appReducer';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);
  const { lists, tasks, currentListId } = state;

  // Whenever AppState changes update localstorage.
  useEffect(() => {
    const { lists, tasks } = state;
    localStorage.setItem('trelloStore', JSON.stringify({lists, tasks}));
  }, [state]);

  const [ modalContent, setModalContent ] = useState<IModalState>(null);

  /** AppState Handlers */
  const handleAddList = () => {
    setModalContent('ADD_LIST');
  };

  const handleAddTask = (listId: number) => {
    handleListId(listId);
    setModalContent('ADD_TASK');
  }

  const handleModalClose = () => {
    setModalContent(null);
  }

  const handleListSubmit = (payload: IList) => {
    dispatch({
      type: 'ADD_LIST',
      payload
    });
    handleModalClose();
  }

  const handleTaskSubmit = (payload: ITask) => {
    dispatch({
      type: 'ADD_TASK',
      payload
    });
    handleModalClose();
  }

  const handleListId = (payload: number) => {
    dispatch({
      type: 'UPDATE_CURRENT_LIST_ID',
      payload
    });
  }

  const handleMoveTask = (payload: any) => {
    dispatch({
      type: 'MOVE_TASK',
      payload
    })
  }

  const handleRemoveList = (listId: number) => {
    dispatch({
      type: 'REMOVE_LIST',
      payload: listId
    })
  }

  const handleRemoveTask = (cardId: number) => {
    dispatch({
      type: 'REMOVE_TASK',
      payload: cardId
    })
  }
  /** AppState Handlers Ends*/

  /** Modal Views */
  const getModalView = (modalState: IModalState) => {
    switch(modalState) {
      case 'ADD_LIST':
        return (
          <ListForm
            onSubmit={handleListSubmit}
          />
        );
      case 'ADD_TASK':
        return (
          <TaskForm
            listId={currentListId}
            onSubmit={handleTaskSubmit}
          />
        );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Trello Board</h1>
        <div className='add-list-container'>
          <button className='add-list-btn' onClick={handleAddList}>Add List</button>
        </div>
      </header>
      <main className='app-container'>
        <div className='lists-wrapper'>
          {lists.map((list: any) => (
            <List
              key={list.id}
              list={list}
              removeList={handleRemoveList}
              addTask={handleAddTask}
            >
              <TasksContainer
                listId={list.id}
                tasks={tasks}
                moveTask={handleMoveTask}
                removeTask={handleRemoveTask}
              />
            </List>
          ))}
        </div>
      </main>
      <Modal
        isOpen={Boolean(modalContent)}
        shouldCloseOnOverlayClick={true}
        onRequestClose={handleModalClose}
        style={customStyles}
        overlayClassName='modal-overlay'
      >
        {getModalView(modalContent)}
      </Modal>
    </div>
  );
}

export default App;
