import React, { useState } from 'react';
import './App.css';
import * as rw from 'the-react-way';

function App() {
  const [updateSignal, reRender] = useState(false);
  const [allTodoItems, updateToDoItems] = useState([]);

  const receiveDataRef = (data: any, index?: number) => {
    updateToDoItems(data);
  }

  const addToDoPlaceHolder = (e: any, data: any) => {
    data.push({
      toAdd: true,
      task: '',
      date: new Date()
    });

    reRender(!updateSignal);
  }

  const addToDoDetails = (e: any, dataItem: any) => {
    // const Task = (document.getElementById('todoTask') as HTMLInputElement).value;
    // const date = (document.getElementById('todoDate') as HTMLInputElement).value;
    const container = (e.target as HTMLButtonElement).closest('.todo-item-container');
    const task = (container?.querySelector('.todoTask') as HTMLInputElement).value;
    const date = (container?.querySelector('.todoDate') as HTMLInputElement).value;

    if (task && date) {
      dataItem.task = task;
      dataItem.date = date;
      dataItem.toAdd = undefined;
      dataItem.toEdit = undefined;

      reRender(!updateSignal);
    }
  }

  const updateToDoDetails = (e: Event, dataItem: any) => {
    addToDoDetails(e, dataItem);
  }

  const enableEditMode = (e: any, dataItem: any, index?: number) => {
    dataItem.toEdit = true;
    reRender(!updateSignal);
  }

  const deleteToDoItem = (e: any, dataItem: any, index: number) => {
    updateToDoItems(items => {
      const _items = items;
      _items.splice(index, 1);
      return _items;
    });
    reRender(!updateSignal);
  }

  return (
    <div className="App">
      <rw.ReadStorage storageKey='todos' type='local' default={[]}>
        <rw.RWCallback call={receiveDataRef} once />
        <rw.RWDataContext updateSignal={updateSignal}>
          <div className='todo-actions'>
            <rw.Button _onClick={addToDoPlaceHolder}>Create a ToDo Item</rw.Button>
          </div>

          <rw.Condition condition={(data, index) => data == null || data.length === 0}>
            <rw.IfTrue>
              <p>Your ToDo list is empty</p>
              {/* <rw.WriteStorage storageKey='todos' type='local' data={'[]'} /> */}
            </rw.IfTrue>
            <rw.Else>
              <div className='todo-item-container'>
                <p><b>Task</b></p>
                <p><b>Due Date</b></p>
                <p><b>Actions</b></p>
              </div>
              <rw.Iterate>
                <rw.Condition condition={(data) => data.toAdd}>
                  <rw.IfTrue>
                    <div className='todo-item-container'>
                      <p><rw.Input type='text' className='todoTask'></rw.Input></p>
                      <p><rw.Input type='date' className='todoDate'></rw.Input></p>
                      <p>
                        <rw.Button _onClick={addToDoDetails}>Add</rw.Button>
                        <rw.Button _onClick={deleteToDoItem}>Delete</rw.Button>
                      </p>
                      {/* <p><button>Delete a ToDo Item</button></p> */}
                    </div>
                  </rw.IfTrue>
                  <rw.Else>
                    <rw.Condition condition={(data) => data.toEdit}>
                      <rw.IfTrue>
                        <div className='todo-item-container'>
                          <p><rw.Input type='text' className='todoTask' _defaultValue='task'></rw.Input></p>
                          <p><rw.Input type='date' className='todoDate' _defaultValue='date'></rw.Input></p>
                          <p>
                            <rw.Button _onClick={updateToDoDetails}>Update</rw.Button>
                            <rw.Button _onClick={deleteToDoItem}>Delete</rw.Button>
                          </p>
                          {/* <p><button>Delete a ToDo Item</button></p> */}
                        </div>
                      </rw.IfTrue>
                      <rw.Else>
                        <div className='todo-item-container'>
                          <p><rw.Text fieldname='task' /></p>
                          <p><rw.Text select={(data) => data.date} /></p>
                          {/* <p><button>Delete a ToDo Item</button></p> */}
                          <p>
                            <rw.Button _onClick={enableEditMode}>Edit</rw.Button>
                            <rw.Button _onClick={deleteToDoItem}>Delete</rw.Button>
                          </p>
                        </div>
                      </rw.Else>
                    </rw.Condition>
                  </rw.Else>
                </rw.Condition>
              </rw.Iterate>
            </rw.Else>
          </rw.Condition>

          <rw.RWDataContext filter={(todoItem => !todoItem.toAdd)}>
            <rw.WriteStorage storageKey='todos' type='local' updateSignal={updateSignal} />
          </rw.RWDataContext>
        </rw.RWDataContext>
      </rw.ReadStorage>
    </div>
  );
}

export default App;
