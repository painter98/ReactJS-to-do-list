import './App.css';
import Add from './components/Add';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App min-h-screen bg-[url(https://thumbs.dreamstime.com/b/todo-list-seamless-pattern-universal-background-66678083.jpg)] bg-cover ">
      <h1 className="text-6xl mb-28">Welcome to To-Do-List</h1>
      <Add/>
      <TaskList/>
    </div>
  );
}

export default App;
