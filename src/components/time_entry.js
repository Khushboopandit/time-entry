import React from "react";
import "../css/main.css";
import { logoutUser, saveTimeEntries, getTimeEntries } from "../libs/storage";

class TimeEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      task_name: "",
      project: "",
      start_date: null,
      end_date: null,
      timer: null,
      data: [],
    };
  }
  async componentDidMount() {
    let entries = JSON.parse(await getTimeEntries());
    this.setState({ data: entries });
  }
  // update to get entries after adding
  async componentDidUpdate() {
    let entries = JSON.parse(await getTimeEntries());
    if (this.state.data.length !== entries.length) {
      this.setState({ data: entries });
    }
  }

  // store time entries
  async saveTimeEntry() {
    const data = Object.freeze({
      task_name: this.state.task_name,
      project: this.state.project,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      timer: this.state.timer,
    });
    saveTimeEntries(data);
    this.setState({
      data: JSON.parse(await getTimeEntries()),
      task_name: "",
      project: "",
      start_date: null,
      end_date: null,
      timer: 0,
    });
  }

  logOut = () => {
    logoutUser();
    this.props.updateState("isAuthenticat", false);
  };

  // handle input fields
  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleDropDown = (e) => {
    this.setState({ project: e.target.value });
  };
  render() {
    return (
      <div className="container">
        <h4 className="logout-btn" onClick={this.logOut}>
          logout
        </h4>
        <h2 className="text-center">Time Entry</h2>

        {/*filds for adding new tasks */}
        <div className="flex justify-between flex-wrap ">
          <input
            type="text"
            placeholder="Enter task name"
            className="text-white"
            name="task_name"
            value={this.state.task_name}
            onChange={this.handleOnChange}
          />
          <select className="drop-down" onChange={this.handleDropDown}>
            <option>Library</option>
            <option>Education</option>
            <option>LMS</option>
          </select>
          <input
            type="date"
            placeholder="Start date"
            name="start_date"
            onChange={this.handleOnChange}
            className="text-white"
          />
          <input
            type="date"
            placeholder="End Date"
            name="end_date"
            onChange={this.handleOnChange}
            className="text-white"
          />
          <input
            type="number"
            placeholder="Set Timer In Minutes"
            name="timer"
            onChange={this.handleOnChange}
            className="text-white"
          />
          <button
            className="btn bg-blue text-white"
            onClick={() => this.saveTimeEntry()}
          >
            Add
          </button>
        </div>
        {/* show added tasks */}
        <table className="mt-3">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Project</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Timer</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((time_entry, i) => {
              return (
                <tr key={i}>
                  <td>{time_entry.task_name}</td>
                  <td>{time_entry.project}</td>
                  <td>{time_entry.start_date}</td>
                  <td>{time_entry.end_date}</td>
                  <td>{time_entry.timer} min</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TimeEntry;
