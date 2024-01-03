function getUsers() {
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

    }