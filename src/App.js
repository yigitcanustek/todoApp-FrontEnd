import { useState, useEffect } from "react";
import "./App.css";
import { API } from "aws-amplify";


const myAPI = "api9b386169";
const path = "/text";


const getList = (data) =>{
  API.get(myAPI, path).then(data);
}


const TodoInput = ({ todo, setTodo, addTodo }) => {
  return (
    <div className="input">
      <input
        type="text"
        id="todo_txt"
        value={todo}
        placeholder="Listeye eklenecek görevi giriniz."
        onChange={(e) => setTodo(e.target.value)}
      />
      <button id="todo_btn" onClick={addTodo}>
        Ekle
      </button>
    </div>
  );
};

const TodoList = ({ list, remove }) => {
  return (
    <>
      {list?.length > 0 ? (
        <div className="list">
          {list.map((entry, index) => (
            <div key={index}>
              <p >
                {entry.text}
                
              </p>
              <button className="delete-button" onClick={() => remove(entry.id)}>
                  Sil
                </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>Yapılacakları ekleyin.</p>
        </div>
      )}
    </>
  );
};

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todo !== "") {
      API.post(myAPI, path, {
        body:{
          "text":todo
        }
      }).then(()=>{
        getList(setTodos);
        setTodo("");
      })
   
     
    }
  };


  const deleteTodo = (index) => {
    API.del(myAPI, path, {
      body:{
        "id":index
      }
    }).then(()=>{
      getList(setTodos)
    });
    
  };

  useEffect(()=>{
    getList(setTodos);
  },[]);



  return (
     <>
     <div >
        <h1 style={{display:"flex", justifyContent:"center", marginBottom:"0", borderRadius:"25px 25px 0 0", borderColor:"black", borderWidth:"5px 15px 5px 5px", borderStyle:"solid", backgroundColor:"#BAFCA2"}}>Yapılacaklar</h1>
      </div>
      <div className="main-container">
        <TodoList list={todos} remove={deleteTodo} />
        <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
      </div>
     </> 
  );
}

export default App;
