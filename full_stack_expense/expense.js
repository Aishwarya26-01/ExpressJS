const registerExpense = async(event) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const details = event.target.details.value;
    const category = event.target.category.value;
    const obj = {
        amount,
        details,
        category
    };
    try {
        let response = await axios.post("http://localhost:3000/expense/add-expense", obj)
        showNewExpenseOnScreen(response.data.newExpenseDetail)
        console.log(response)
    }
    catch(err) {
        document.body.innerHTML += "<h4> Something went wrong </h4>"
        console.log(err)
    }
}                    
const display = async(event) => {
    try {
        let response = await axios.get("http://localhost:3000/expense/get-expense")
        // console.log(response);
        for(var i=0; i<response.data.allExpense.length; i++) {
            await showNewExpenseOnScreen(response.data.allExpense[i])
        }
    }
    catch(err) {
        console.log(err);
    }
}

const showNewExpenseOnScreen = (expense) => {
    document.getElementById("amount").value='';
    document.getElementById("details").value='';
    document.getElementById("category").value='';

    const parentNode = document.getElementById('listOfitems');
    const createNewUserHtml = `<li id='${expense.id}'>${expense.amount} - ${expense.details} - ${expense.category}
        <button onclick=deleteExpense('${expense.id}')>Delete</button>
        <button onclick=editExpense('${expense.category}','${expense.amount}','${expense.details}','${expense.id}')>Edit</button>
        </li>`
        console.log(createNewUserHtml)
        parentNode.innerHTML += createNewUserHtml;
        console.log(parentNode.innerHTML)
}

const deleteExpense = async (expenseId) => {
    
    try {
        let response = await axios.delete(`http://localhost:3000/expense/delete-expense/${expenseId}`)
        await removeExpenseFromScreen(expenseId);
    }
    catch(err) {
        console.log(err);
    }
}

const editExpense = async (category, amount, details, expenseId) => {
    document.getElementById("category").value=category;
    document.getElementById("amount").value=amount;
    document.getElementById("details").value=details;

    await deleteExpense(expenseId);
}

const removeExpenseFromScreen = async (expenseId) => {
    const parentNode = document.getElementById('listOfitems');
    const elem = document.getElementById(expenseId)
    parentNode.removeChild(elem);
}
window.addEventListener("DOMContentLoaded", display);