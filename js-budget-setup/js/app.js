/* class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
} */

class UI {
  constructor(){
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.budgetExpenese = document.getElementById("expense-amount");
    this.balanceAmount = document.getElementById("balance-amount");
    this.balance = document.getElementById("balance");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.expenseAmount = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.tableBody= document.getElementById("table-body");
    this.table = document.getElementById("table");
    this.itemList = [];
    this.itemID = 0;
  }

  //method to update the balance
  updateBalance(){
    const totalExpense = this.totalExpense()
    this.balanceAmount.textContent = (this.budgetAmount.textContent) - (totalExpense) 
    
  }

  //method to update the total expenses 
  totalExpense(){
    var total = 0;
    if(this.itemList.length>0){
      total = this.itemList.reduce((total,item)=> total+parseInt(item.amount),0)
      this.budgetExpenese.textContent = total
    }
    return total
  }

  //method ot display the balance
  displayBalance(){   
    this.updateBalance();
    const totalBalance = this.balanceAmount.textContent
    if (totalBalance<0){
      this.balance.classList.remove("showGreen","showBlack");
      this.balance.classList.add("showRed");
    }else if(totalBalance>0){
      this.balance.classList.remove("showRed","showBlack");
      this.balance.classList.add("showGreen")
    }else if(totalBalance==0){
      this.balance.classList.remove("showGreen","showRed");
      this.balance.classList.add("showBlack")
    }
  }
  //submit budget method
  submitBudgetForm(){
    const value = this.budgetInput.value;
    if(value==="" || value<=0){
      this.budgetFeedback.innerHTML =`<p> budget amount cannot be empty or negative</p>`
      this.budgetFeedback.classList.add("showItem")      
      setTimeout(()=>{        
        this.budgetFeedback.classList.remove("showItem")
      },4000)
    }else{      
      this.budgetAmount.textContent = +value;     
      this.budgetInput.value = "";
      this.displayBalance();
    }
  }

  submitExpenseForm(){
    const expenseInput = this.expenseInput.value;
    const expenseAmount = this.expenseAmount.value;
     if(expenseInput == "" || expenseAmount == "" || expenseAmount <0){
       this.expenseFeedback.innerHTML = `<p>Value cannot be empty or negative</p>`
       this.expenseFeedback.classList.add("showItem");
       setTimeout(()=>{
         this.expenseFeedback.classList.remove("showItem");
       },4000)
     } else{
       let amoount = parseInt(expenseAmount);
       this.itemID++;
       let expense = {
         id:this.itemID,
         title:expenseInput,
         amount:expenseAmount
       }
       console.log(this.table.classList)
       this.table.classList.remove("hide-table");
       this.table.classList.add("show-table");
       
       this.itemList.push(expense);
       this.expenseInput.value = "";
       this.expenseAmount.value = "";
       //this.addExpense(expense);
      this.displayBalance();
      //this.addExpenseTable(expense)
     }
  } 

    displayExpenseTable(){
      const tableRow = document.createElement("tr");
      const expenseList = this.itemList
      debugger
      this.tableBody.innerHTML = "";
      expenseList.forEach(expense=>{
        const tableRow = document.createElement("tr");
        tableRow.id = expense.id
        console.log(tableRow);
        tableRow.innerHTML=`
        <th scope="row">${expense.id}</th>
        <td>${expense.title}</td>
        <td>${expense.amount}</td>
        <td>
          <button type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
          <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
        </td>`
        this.tableBody.appendChild(tableRow);
      })
      
  }

  addExpense_old(expense){
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

        <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
        <h5 class="expense-amount mb-0 list-item">${+expense.amount}</h5>

        <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
          <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
          <i class="fas fa-trash"></i>
          </a>
        </div>
    </div>`
    this.expenseList.appendChild(div);
  }
  
  removeExpense_old(element){
    let id = parseInt(element.dataset.id)
    let parentElement = element.parentElement.parentElement.parentElement;    
    //removing the div containing expense
    this.expenseList.removeChild(parentElement);
    //removing from the dom
    let newItemList = this.itemList.filter((item)=>{
      return item.id!==id
    })
    let removedItem = this.itemList.filter((item)=>{     
      return item.id ===id
    })[0];
    this.itemList = newItemList
    this.displayBalance();
    return removedItem
  }

  removeExpense(element){
    console.log(element.parentElement.parentElement);
    let parentElement = element.parentElement.parentElement
    console.log(parentElement);
    let id = parentElement.id
    debugger
    let newItemList = this.itemList.filter((item)=>{
      return item.id!=id
    })
    let removedItem = this.itemList.filter((item)=>{     
      return item.id ==id
    })[0];
    this.itemID--
    this.itemList = newItemList
    return removedItem
  }

  editExpense(element){
    //removing element from dom 
    let removedExpense = this.removeExpense(element);
    //populating expense form with information from removed expense
    this.expenseInput.value = removedExpense.title;
    this.expenseAmount.value = removedExpense.amount;
  }
}



function eventListeners(){

  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseTable = document.getElementById("expense-table");
  
  const theUI = new UI();

  budgetForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    theUI.submitBudgetForm();  
  })

  expenseForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    theUI.submitExpenseForm();
    theUI.displayExpenseTable();
  })

  expenseTable.addEventListener("click",(event)=>{
    if(event.target.classList.contains("fa-edit")){
      theUI.editExpense(event.target.parentElement)
      theUI.displayBalance();
      theUI.displayExpenseTable();
    }else if(event.target.classList.contains("fa-trash-alt")){
      theUI.removeExpense(event.target.parentElement);
      theUI.displayBalance();
      theUI.displayExpenseTable();
    }
  })
}

document.addEventListener("DOMContentLoaded", ()=> eventListeners());