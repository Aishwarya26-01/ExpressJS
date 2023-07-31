function registerUser(event) {
    event.preventDefault();

    const name = event.target.name.value;;
    const email = event.target.email.value;
    const number = event.target.number.value

    const obj = {
        name,
        email,
        number
    }
    console.log(obj);
    
    axios.post("http://localhost:3000/user/add-user", obj)
        .then((Response) => {
            showUserOnScreen(Response.data.newUserDetail);
            console.log(Response);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + `<h4>Something went wrong</h4>`;
            console.log(err)
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/user/get-users")
        .then((Response) => {
            for(var i=0; i<Response.data.length; i++) {
                showUserOnScreen(Response.data.allUsers[i]);
            }
        })
        .catch(err => console.log(err));
})

function showUserOnScreen(user) {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("number").value = '';

    const parentElem = document.getElementById('listOfUsers');
    const createUserHtml = `<li id='${user.id}'>${user.name} - ${user.email}
            <button onclick=deleteUser('${user.id}')>Delete</button>
            <button onclick=editUser('${user.email}','${user.name}','${user.number}','${user.id}')>Edit</button>
            </li>`

    parentElem.innerHTML += createUserHtml;
}

function deleteUser(userId) {
    axios.delete(`http://localhost:3000/user/delete-user/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId);
        })
        .catch(err => console.log(err));
}

function editUser(email, name, number, userId) {
    document.getElementById("email").value = email;
    document.getElementById("name").value = name;
    document.getElementById("number").value = number;

    deleteUser(userId)
}

function removeUserFromScreen(userId) {
    const parentElem = document.getElementById('listOfUsers');
    const elem = document.getElementById(userId);
    if(elem) {
        parentElem.removeChild(elem);
    }
}