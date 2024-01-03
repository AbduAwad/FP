// usersScript.js
document.addEventListener('DOMContentLoaded', function () {
  const userList = document.getElementById('user-list');

  // Fetch user data from your server
  fetch('/getUsers')
      .then(response => response.json())
      .then(users => {
          users.forEach(user => {
              const listItem = document.createElement('li');
              listItem.textContent = user.name;
              userList.appendChild(listItem);
          });
      })
      .catch(error => console.error('Error fetching users:', error));
});
