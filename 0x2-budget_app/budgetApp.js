// ---- BUDGET APPLICATION ------

var budgetController = (function() {
    // the x and sum are private whereas the publicTest is public for being an object
   // this works because of closures where an inner function have access to its  outer function's variables and parameters
    
       //creating function constructors for the expenses and the incomes
       var Expense = function(id, description, value) {
           this.id = id;
           this.description = description;
           this.value = value;
           this.percentage = -1;
       };
       
       Expense.prototype.calcPercentage = function(totalIncome) {
           if (totalIncome > 0) {
               this.percentage = Math.round((this.value / totalIncome) * 100);
           } else {
               this.percentage = -1;
           }
       };
   
       // to return the percentage 
       Expense.prototype.getPercentage = function() {
           return this.percentage;
       }
        
       var Income = function(id, description, value) {
           this.id = id;
           this.description = description;
           this.value = value;
       };
       
       // a private method to compute the totals of the overall inputs
       var calculateTotals = function(type) {
           var sum = 0;
           data.allItems[type].forEach(function(cur){
               sum += cur.value;
           });
   
           data.totals[type] = sum;
       };
       // create an object that will hold the data for this whole project to compute bothte the    EXPENSE AND THE INCOMES
       let data = {
           allItems: {
               exp: [],
               inc: []
           },
           totals: {
               exp: 0,
               inc: 0
           },
           budget:0,
           percentage: -1
       }
   
        return {
           addItem: function(type, des, val) {
               var newItem, ID;
   
               // creating an ID
               // [1 2 3 4 5], next ID = 6
               // 1 2 4 7 9], nxt ID = 10
               // ID = last ID + 1
               
               if(data.allItems[type].length > 0) {
                   ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
               } else{
                   ID = 0;
               }
   
               // create an item based onn inc or exp
               if(type === 'exp') {
                   newItem = new Expense(ID, des, val);
               } else if(type === 'inc'){
                   newItem = new Income(ID, des, val);
               }
               //push an item to our data structure
               data.allItems[type].push(newItem);
               
               //return the new item added
               return newItem;
           },
   
           // deleting items using the map and splice methods
           deleteItem: function(type, id) {
               var ids, index;
   
               ids = data.allItems[type].map(function(current) {
                   return current.id;
               });
   
               index = ids.indexOf(id);
   
               // to select the correct ID
               if (index !== -1) {
                   data.allItems[type].splice(index, 1);
               }
           },
   
           calculateBudget: function() {
               // 1. Calcuate total income and expenses
               calculateTotals('inc');
               calculateTotals('exp');
               // 2. Calculate the budget: income - expenses
               data.budget = data.totals.inc - data.totals.exp;
               // 3. Calculate the percentage of income tha we spent
               // since you cannot divide a number by zero. we restrict the infinity result here
               if (data.totals.inc > 0) {
                   data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
               } else {
                   data.percentage = -1;
               }
           },
   
           // calculating the percentage
           calculatePercentage: function() {
               /*
               a = 20
               b = 10
               income = 100
               a = 20/100 = 20%
               b = 10/100 = 10
               */
               data.allItems.exp.forEach(function(cur) {
                   cur.calcPercentage(data.totals.inc);
               });
           },
   
           getPercentages: function() {
               var allPerc = data.allItems.exp.map(function(cur){
                   return cur.getPercentage();
               });
               return allPerc;
           },
           getBudget: function() {
               return {
                   budget: data.budget,
                   totalInc: data.totals.inc,
                   totalExp: data.totals.exp,
                   percentage: data.percentage
               };
           },
   
           testing: function() {
               console.log(data);
           }
       }
   
   })();
   
   
   /// iife - separation of concerns.
   // USER INTERFACE CONRTROLLER
   var UIController = (function() {
   
       // creating a private variable to store the strings privately
   
       var DOMstrings = {
           inputType: '.add__type',
           inputDescription: '.add__description',
           inputValue: '.add__value',
           inputBtn: '.add__btn',
           incomeContainer: '.income__list',
           expensesContainer: '.expenses__list',
           budgetLabel: '.budget__value',
           incomeLabel: '.budget__income--value',
           expensesLabel: '.budget__expenses--value',
           percentageLabel: '.budget__expenses--percentage',
           container: '.container',
           expensesPercLabel: '.item__percentage',
           dateLabel: '.budget__title--month'
       }
       
       var formatNumbers = function(num, type) {
        var numSplit, int, dec, type;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 0) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
       };
       return {
           getInput: function() {
               // to return the three values as one -- as a property
               return {
                   // collecting the inputs frm the controller
                   type: document.querySelector(DOMstrings.inputType).value, // the value will be either inc or exp
                   description: document.querySelector(DOMstrings.inputDescription).value,
                   value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
               };
           },
   
           addListItems: function(obj, type) {
               var html, newHTML, element;  
               // create HTML strings woth placeholder text
   
               if (type === 'inc') {
                   element = DOMstrings.incomeContainer;
   
                   html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
               } else if(type === 'exp') {
                   element = DOMstrings.expensesContainer;
   
                   html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage"> 21% </div> <div class="item__delete"><button class="item__delete--btn"> <i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
   
               }
                
               // Replace the placeholder text with actual data
               newHTML = html.replace('%id%', obj.id);
               newHTML = newHTML.replace('%description%', obj.description);
               newHTML = newHTML.replace('%value%', formatNumbers(obj.value, type));
               // Insert the HTML into the DOM
   
               document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
           },
   
           deleteListItems: function(selectorID) {
               // so as to delete a child, you firt have to move up the radar to the parent then access the child
   
               var el = document.getElementById(selectorID);
               el.parentNode.removeChild(el);
           },
   
           //clearing the input fields
           clearFields:function() {
               var fields, fieldArr;
       
               //using the query selector to loop through all the inputs inserted.The quesrry selector however returns a list rather than an array. thus the list have to be converted back into an array for traversal
               fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
   
               // toconvert the array, use the slice method to and the call method in a prototype.
               fieldArr = Array.prototype.slice.call(fields);
   
               fieldArr.forEach(function(current, index, array){
                   current.value = "";
               });
   
               // set the focus on the first item
               fieldArr[0].focus()
   
           },
   
           displayBudget: function(obj) {

            var type;
               // displaying the budget on the application
               obj.budget > 0 ? type = 'inc' : type = 'exp';
               document.querySelector(DOMstrings.budgetLabel).textContent = formatNumbers(obj.budget, type);
               document.querySelector(DOMstrings.incomeLabel).textContent = formatNumbers(obj.totalInc, 'inc');
               document.querySelector(DOMstrings.expensesLabel).textContent = formatNumbers(obj.totalExp, 'exp');
   
               if (obj.percentage > 0) {
                   document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
               } else {
               document.querySelector(DOMstrings.percentageLabel).textContent = '----'
               }
           },

           displayPercentages: function(percentages) {
            // methods returns a node list instead of an array
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
        
            nodeListForEach(fields, function(current, index) {
                if (percentages[i] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '----';
                }
            });
           },

           displayMonth: function() {
            var now , months, month, year;

            now = new Date();
            // var christimas = new Date(2016, 11,25);

            months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
           },

           changedType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
           },

           getDOMstrings: function() {
               return DOMstrings;
           }
       };
   
   })();
   // modules can aswell receive arguments
   
   var controller = (function(budgetCtrl, UICtrl) {
   
       // craate a startUp function 
   
       var startupEvent = function() {
   
           var DOM = UICtrl.getDOMstrings();
       
           document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItems);
           // add key event listeners
           document.addEventListener('keypress', function(event) {
   
           if (event.keyCode === 13 || event.which === 13) {
               ctrlAddItems();
           }
       });
   
   
       document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
       document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
   };
   
       var updateBudget = function() {
           // 1. Calculate the budget
           budgetCtrl.calculateBudget();
   
           // 2. Return the budget
           var budget = budgetCtrl.getBudget();
   
           // 3. Display the budget on the UI
           UICtrl.displayBudget(budget)
       };
   
       var updatePercentages = function() {
           // 1 calculate percentages
           budgetCtrl.calculatePercentage();
   
           // 2. Read percentages from the budget controller
           var percentages = budgetCtrl.getPercentages()
           // 3. Update the UI wth the new percentage
           UICtrl.displayPercentages(percentages);
       };
       //return the private DOM strings into the public
       var ctrlAddItems = function() {
           //------------ PROCEDURE----------------------
           var input, newItem;
           
           // 1. Get the field input data
           input = UICtrl.getInput();
   
           // to limit entry of a NaN as the input.
           if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
           // 2. Add the items to the budget controller
           newItem = budgetCtrl.addItem(input.type, input.description, input.value);
   
           // 3. add the items to the UI
   
           UICtrl.addListItems(newItem, input.type);
   
           // 4. clear the input fields
           UICtrl.clearFields();
   
           // 5. Calculate the budget
           updateBudget();
           } 
           // 6. calculate ad update percentages
           updatePercentages()
   };
   
       // EVENT DELEGATION - EVENT BUBBLING AND TARGET EVENT
       var ctrlDeleteItem = function(event) {
   
           var itemID, splitID, type, ID;
   
           //event bubbling
           itemID = event.target.parentNode.parentNode.parentNode.id;
   
           // if user makes a click and there is no ID
           if (itemID) {
               // split the elements - between the value of the income and the value of the itemNumer using the split method
               splitID = itemID.split('-');
               // store the first element of the split in type and the second in the ID variable
               type = splitID[0];
               ID = parseInt(splitID[1]);
   
               // 1. Delete the item from the data struture
               budgetCtrl.deleteItem(type, ID);
               
               // 2. Delete the item from the UI
               UICtrl.deleteListItems(itemID);
   
               // 3. Update and show the new budget
               updateBudget();
   
               // 4. update the percentages
               updatePercentages();
           }        
       };
   
       return {
           init: function() {
               console.log('Application has started');
               UICtrl.displayMonth();
               UICtrl.displayBudget({
                   budget: 0,
                   totalInc: 0,
                   totalExp: 0,
                   percentage: 0
               });
               startupEvent();
           }
       };
   
   })(budgetController, UIController); 
   
   controller.init();   