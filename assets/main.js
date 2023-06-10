$(document).ready(function() {
    const apiUrl = 'https://blog-api-t6u0.onrender.com/posts';

    // Add a new task
    function addTodo() {
      var task = $('#todoInput').val();

      if (task.trim() !== '') {
        $.ajax({
          url: apiUrl,
          type: 'POST',
          dataType: 'json',
          data: { title: task },
          success: function(response) {
            $('#todoInput').val('');
            getTodoList();
          },
          error: function(error) {
            console.error('Error adding task:', error);
          }
        });
      }
    }

    // Get the list of tasks
    function getTodoList() {
      $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          displayTodoList(response);
        },
        error: function(error) {
          console.error('Error getting todo list:', error);
        }
      });
    }

    // Display the list of tasks
    function displayTodoList(todos) {
      var todoList = $('#todoList');
      todoList.empty();

      todos.forEach(function(todo) {
        var listItem = $('<li>');
        listItem.text(todo.title);

        var editButton = $('<button>Edit</button>');
        editButton.click(function() {
          editTodoModal(todo.id, todo.title);
        });
        listItem.append(editButton);

        var deleteButton = $('<button>Delete</button>');
        deleteButton.click(function() {
          deleteTodoItem(todo.id);
        });
        listItem.append(deleteButton);

        todoList.append(listItem);
      });
    }

    // Edit a task
    function editTodoModal(todoId, currentTitle) {
      var newTitle = prompt('Edit task:', currentTitle);

      if (newTitle !== null) {
        newTitle = newTitle.trim();

        if (newTitle !== '') {
          updateTodoTitle(todoId, newTitle);
        }
      }
    }

    // Update the title of a task
    function updateTodoTitle(todoId, newTitle) {
      $.ajax({
        url: apiUrl + '/' + todoId,
        type: 'PUT',
        dataType: 'json',
        data: { title: newTitle },
        success: function(response) {
          getTodoList();
        },
        error: function(error) {
          console.error('Error updating task:', error);
        }
      });
    }

    // Delete a task
    function deleteTodoItem(todoId) {
      if (confirm('Are you sure you want to delete this task?')) {
        $.ajax({
          url: apiUrl + '/' + todoId,
          type: 'DELETE',
          success: function(response) {
            getTodoList();
          },
          error: function(error) {
            console.error('Error deleting task:', error);
          }
        });
      }
    }

    // Initialize the app
    getTodoList();

    // Event listener for add button
    $('#addButton').click(addTodo);
  });
