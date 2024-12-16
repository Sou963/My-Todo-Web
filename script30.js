document.addEventListener("DOMContentLoaded", () => {
  const todo_form = document.querySelector(".to-do");
  const todo_input = document.querySelector("#input_todo");
  const todo_button = document.querySelector("#addbutton");
  const todo_list = document.querySelector("#list");
  const todo_massage = document.querySelector("#massage");

  //Addtodo
  const add_todo = (event) => {
    event.preventDefault();
    const todo_value = todo_input.value;
    // console.log(todo_input.value);
    //unique id
    const todo_id = Date.now().toString();
    // console.log(todo_id);
    create_todo(todo_id, todo_value);
    create_todo_massage("Added success-fully", "success");
    //manage localstorage
    const todos = localstoragetodo();
    todos.push({ todo_id, todo_value });
    localStorage.setItem("mytodos", JSON.stringify(todos));
    todo_input.value = "";
  };
  //showing the massage add or delete
  const create_todo_massage = (text, status) => {
    todo_massage.textContent = text;
    todo_massage.classList.add(`massage-${status}`);
    setTimeout(() => {
      todo_massage.textContent = "";
      todo_massage.classList.remove(`massage-${status}`);
    }, 1000); //timer
  };
  //create innerhtml and delete button and given how it work
  const create_todo = (todo_id, todo_value) => {
    const todo_elment = document.createElement("li");
    todo_elment.id = todo_id;
    todo_elment.classList.add("list-style");
    todo_elment.innerHTML = `
    <span>${todo_value}</span>
    <span> <button class="but" id="deletebutton" ><i class="fa fa-trash"></i> </button></span>
    `;
    todo_list.appendChild(todo_elment);
    const delete_button = todo_elment.querySelector("#deletebutton");
    delete_button.addEventListener("click", deletetodo);
  };
  //deletetodo
  const deletetodo = (event) => {
    ///console.log("delete todo");
    //get the list
    const selected_todo =
      event.target.parentElement.parentElement.parentElement;
    //delete form todo
    todo_list.removeChild(selected_todo);
    //showing massage
    create_todo_massage("Deleted successfully", "danger");
    //see all element to the local storage unique id
    var todos = localstoragetodo();
    //filter the id
    todos = todos.filter((todo) => todo.todo_id !== selected_todo.id);
    //after delete the element
    localStorage.setItem("mytodos", JSON.stringify(todos));
  };
  //get localstroage todo
  const localstoragetodo = () => {
    return localStorage.getItem("mytodos")
      ? JSON.parse(localStorage.getItem("mytodos"))
      : [];
  };
  //windon showtodo
  const showtodo = () => {
    const todos = localstoragetodo();
    todos.map((todo) => create_todo(todo.todo_id, todo.todo_value));
  };

  // Your event listener

  todo_form.addEventListener("submit", add_todo);
  window.addEventListener("DOMContentLoaded", showtodo);
});
