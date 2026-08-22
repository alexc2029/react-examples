import { Component } from 'react';
import Count from './Count';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      isBeingEdited: '',
      editVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleEditChange(e) {
    this.setState((state) => ({
      ...state,
      editVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }
  handleResubmit(todo) {
    const newTodos = [...this.state.todos];
    const index = newTodos.indexOf(todo);
    newTodos[index] = this.state.editVal;
    this.setState((state) => ({
      ...state,
      todos: newTodos,
      editVal: '',
      isBeingEdited: '',
    }));
  }

  handleDelete(todo) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.filter((t) => t !== todo),
    }));
  }

  handleEditClick(todo) {
    this.setState((state) => ({
      ...state,
      isBeingEdited: todo,
      editVal: todo,
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>
          <Count count={this.state.todos.length} /> tasks!
        </h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <div key={todo}>
              {this.state.isBeingEdited === todo ? (
                <input
                  type="text"
                  value={this.state.editVal}
                  onChange={this.handleEditChange}
                ></input>
              ) : (
                <li>{todo}</li>
              )}
              {this.state.isBeingEdited === todo ? (
                <button onClick={() => this.handleResubmit(todo)}>
                  Resubmit
                </button>
              ) : (
                <button onClick={() => this.handleEditClick(todo)}>Edit</button>
              )}
              <button onClick={() => this.handleDelete(todo)}>Delete</button>
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
