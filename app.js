const bankBalanceElement = document.getElementById("bankBalance");
const loanBtnElement = document.getElementById("loanBtn");
const payAmountBalanceElement = document.getElementById("payAmountBalance");
const bankBtnElement = document.getElementById("bankBtn");
const workBtnElement = document.getElementById("workBtn");
const selectElement = document.getElementById("select");
const computerFeatureTextElement = document.getElementById("featureText");
const computerImageElement = document.getElementById("image");
const computerSelectedNameElement = document.getElementById("selectedComputerName");
const computerTextElement = document.getElementById("computerText");
const computerPriceElement = document.getElementById("computerPrice");
const buyComputerBtnElement = document.getElementById("buyBtn");
const hiddenLoanDivElement = document.getElementById("loanDiv");
const outstandingLoanAmountElement = document.getElementById("outstandingLoanAmount");
const repayBtnElement = document.getElementById("repayBtn");


const imageUrlPrefix = "https://hickory-quilled-actress.glitch.me/"
let hasLoan = false;

let computers = [];


/* 
Fetching data from the api and puting it into the computer array
calling the addComputersToSelect function including the computers

*/
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(Response => Response.json())
    .then(data => computers = data)
    .then(computers => addComputersToSelect(computers));



/* 
running a foreach-loop on the computers and populationg the select dropdown
also adding the computer with index 0 as the first computer to be displayed 
*/
const addComputersToSelect = (computers) => {
    computers.forEach(x => addComputerToSelect(x));

    updateComputerInfo(computers[0]);
}


/* 
creating option-elements and adding the title as textnode on the computerelement
in the end adding the option element to the select element
*/

const addComputerToSelect = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    selectElement.appendChild(computerElement);
}

/* 
a function to update the ui with the info from the computer array. The selectedcomputer is the computer at the selected index

*/

const updateComputerInfo = selectedComputer => {

    computerPriceElement.innerText = `${selectedComputer.price} Kr`;
    computerTextElement.innerText = selectedComputer.description;
    computerSelectedNameElement.innerText = selectedComputer.title;
    computerImageElement.src = `${imageUrlPrefix}${selectedComputer.image}`;

    computerFeatureTextElement.innerText = selectedComputer.specs.join("\n")
}

/* 

a function that fires when a new computer is selected in the select element
takes the index of that computer and calls the updateComputerInfo function
*/

const handleComputerSelectChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];

    updateComputerInfo(selectedComputer);

}

selectElement.addEventListener("change", handleComputerSelectChange);


/* 
A function that fires when the work btn is clicked. adds 100 to the pay amount element
*/

const handleWorkBtn = () => {
    let currentValue = parseInt(payAmountBalanceElement.innerText);

    payAmountBalanceElement.innerText = currentValue + 100;
}


/* 

this function fires when the loan btn is clicked. 
*/

const handleLoanBtn = () => {

    let currentBankAmount = parseInt(bankBalanceElement.innerText);

    let maximumLoanAmount = currentBankAmount * 2;

    let requestedLoanAmount = parseInt(prompt(`How much you want to get a loan for? \n Maximum amount is: ${maximumLoanAmount}`));

    //checks if the requested amount is not 0 and if it's a number
    if (requestedLoanAmount != 0 && !isNaN(requestedLoanAmount)) {

        //checks if user already has a loan
        if (!hasLoan) {
            //checks if the requested amount is OK
            if (requestedLoanAmount <= maximumLoanAmount) {
                outstandingLoanAmountElement.innerText = requestedLoanAmount;

                bankBalanceElement.innerText = requestedLoanAmount + currentBankAmount;


            } else {
                alert(`The maximum loan amount is ${maximumLoanAmount}`)
            }
        } else {
            alert(`You already have a loan`)
        }
    }
}


/* handles changes in the outstanding loan value
if it's changed, check if the value is greater then 0 then set to be visable, if it's below 0 it will go invisible */
const handleOutStandingLoanChange = () => {

    if (parseInt(outstandingLoanAmountElement.innerText) > 0) {

        hiddenLoanDivElement.style.display = "inline"
        hasLoan = true;

    } else {
        hiddenLoanDivElement.style.display = "none"
        hasLoan = false;

    }


}



// Fires when the repay btn is clicked - calls the repayLoanHandler function

const handleRepayBtn = () => {


    let repayAmount = parseInt(payAmountBalanceElement.innerHTML);


    repayLoanHandler(repayAmount);


}


/* 

Function that fires when bank btn is clicked

*/
const handleBankBtn = () => {
    payAmountBalance = parseInt(payAmountBalanceElement.innerText);
    bankBalance = parseInt(bankBalanceElement.innerText);
    //checks if paybalance is not 0
    if (payAmountBalanceElement != 0) {
        // checks if there is a loan
        if (!hasLoan) {

            //adds the new founds to the bank

            bankBalanceElement.innerText = payAmountBalance + bankBalance;

            payAmountBalanceElement.innerText = 0;

        } else {

            // shaves 10 % the paybalance and uses it to pay the loan 

            let payAmountBalanceToLoan = (payAmountBalance * 0.1)

            repayLoanHandler(payAmountBalanceToLoan);

            // takes the 10 % of the paybalance and puts what remains in a variable that goes to the bank

            let payAmountBalanceToBank = payAmountBalance - payAmountBalanceToLoan;

            bankBalanceElement.innerText = bankBalance + payAmountBalanceToBank;

        }

    }



}

//is used to pay back the loan
function repayLoanHandler(repayAmount) {

    let outstandingLoanAmount = parseInt(outstandingLoanAmountElement.innerHTML);

    //checks if the amount is 0
    if (repayAmount !== 0) {

        // if the repayamount is greater then the loan you get some left that can go to the bank
        if (repayAmount >= outstandingLoanAmount) {

            let restAmount = repayAmount - outstandingLoanAmount;

            outstandingLoanAmountElement.innerText = 0;

            bankBalanceElement.innerText = (parseInt(bankBalanceElement.innerText) + restAmount);

            payAmountBalanceElement.innerText = 0;

        } else {

            //takes the repay amount and pay for some of the loan amount

            outstandingLoanAmountElement.innerText = outstandingLoanAmount - repayAmount;

            payAmountBalanceElement.innerText = 0;
        }

    }
}


//Checks if you can buy a computer and if so displays a alert that says that it's yours :)

const handleBuyComputer = () => {


    let bankBalance = parseInt(bankBalanceElement.innerText);
    let computerPrice = parseInt(computerPriceElement.innerText);


    if (bankBalance >= computerPrice) {

        bankBalanceElement.innerText = bankBalance - computerPrice;

        alert(`You are now the owner of ${computerSelectedNameElement.innerText}`)


    } else {
        alert(`Like we say in sweden: Pengar kan bygga ett hus, men det krävs kärlek för att göra det till ett hem. \n English: You are broke `)
    }


}


buyComputerBtnElement.addEventListener("click", handleBuyComputer)

bankBtnElement.addEventListener("click", handleBankBtn);

repayBtnElement.addEventListener("click", handleRepayBtn);

outstandingLoanAmountElement.addEventListener("DOMSubtreeModified", handleOutStandingLoanChange);



workBtnElement.addEventListener("click", handleWorkBtn);

loanBtnElement.addEventListener("click", handleLoanBtn);



