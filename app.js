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
const buyBtnElement = document.getElementById("buyBtn");
const hiddenLoanDivElement = document.getElementById("loanDiv");
const outstandingLoanAmountElement = document.getElementById("outstandingLoanAmount");
const repayBtnElement = document.getElementById("repayBtn");


const imageUrlPrefix = "https://hickory-quilled-actress.glitch.me/"
let hasLoan = false;

let computers = [];

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(Response => Response.json())
    .then(data => computers = data)
    .then(computers => addComputersToSelect(computers));


const addComputersToSelect = (computers) => {
    computers.forEach(x => addComputerToSelect(x));

    //choose the second to be the first because i liked the look more 🤠  
    updateComputerInfo(computers[1]);
}

const addComputerToSelect = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    selectElement.appendChild(computerElement);
}

const updateComputerInfo = selectedComputer => {

    computerPriceElement.innerText = `${selectedComputer.price} Kr`;
    computerTextElement.innerText = selectedComputer.description;
    computerSelectedNameElement.innerText = selectedComputer.title;
    computerImageElement.src = `${imageUrlPrefix}${selectedComputer.image}`;

    computerFeatureTextElement.innerText = selectedComputer.specs.join("\n")
}

const handleComputerSelectChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];

    updateComputerInfo(selectedComputer);

}

const handleWorkBtn = () => {
    let currentValue = parseInt(payAmountBalanceElement.innerText);

    payAmountBalanceElement.innerText = currentValue + 100;
}



const handleLoanBtn = () => {

    let currentPayAmount = parseInt(payAmountBalanceElement.innerText);

    let maximumLoanAmount = (currentPayAmount * 2) - parseInt(outstandingLoanAmountElement.innerText);

    let requestedLoanAmount = parseInt(prompt(`How much you want to get a loan for? \n Maximum amount is: ${maximumLoanAmount}`));

    if (typeof requestedLoanAmount === "number" && requestedLoanAmount != 0) {

        if (!hasLoan) {
            if (requestedLoanAmount <= maximumLoanAmount) {
                outstandingLoanAmountElement.innerText = parseInt(outstandingLoanAmountElement.innerHTML) + parseInt(requestedLoanAmount);

                bankBalanceElement.innerText = (parseInt(requestedLoanAmount) + parseInt(bankBalanceElement.innerText))


            } else {
                alert(`The maximum loan amount is ${maximumLoanAmount}`)
            }
        } else {
            alert(`You already have a loan`)
        }
    }
}



const handleOutStandingLoanChange = () => {

    if (parseInt(outstandingLoanAmountElement.innerText) > 0) {

        hiddenLoanDivElement.style.display = "inline"
        hasLoan = true;

    } else {
        hiddenLoanDivElement.style.display = "none"
        hasLoan = false;

    }


}


const handleRepayBtn = () => {


    let repayAmount = parseInt(payAmountBalanceElement.innerHTML);


    repayLoanHandler(repayAmount);


}



const handleBankBtn = () => {
    payAmountBalance = parseInt(payAmountBalanceElement.innerText);
    bankBalance = parseInt(bankBalanceElement.innerText);
    if (payAmountBalanceElement != 0) {


        if (!hasLoan) {

            bankBalanceElement.innerText = payAmountBalance + bankBalance;

            payAmountBalanceElement.innerText = 0;
          

        } else {

            let payAmountBalanceToLoan = (payAmountBalance * 0.1)

            repayLoanHandler(payAmountBalanceToLoan);

            let payAmountBalanceToBank = payAmountBalance - payAmountBalanceToLoan;

            bankBalanceElement.innerText = bankBalance + payAmountBalanceToBank;

        }

    }



}

function repayLoanHandler(repayAmount) {

    let outstandingLoanAmount = parseInt(outstandingLoanAmountElement.innerHTML);


    if (repayAmount !== 0) {


        if (repayAmount >= outstandingLoanAmount) {

            let restAmount = repayAmount - outstandingLoanAmount;

            outstandingLoanAmountElement.innerText = 0;

            bankBalanceElement.innerText = (parseInt(bankBalanceElement.innerText) + restAmount);

            payAmountBalanceElement.innerText = 0;

        } else {

            outstandingLoanAmountElement.innerText = outstandingLoanAmount - repayAmount;

            payAmountBalanceElement.innerText = 0;
        }

    }
}

bankBtnElement.addEventListener("click", handleBankBtn);

repayBtnElement.addEventListener("click", handleRepayBtn);

outstandingLoanAmountElement.addEventListener("DOMSubtreeModified", handleOutStandingLoanChange);

selectElement.addEventListener("change", handleComputerSelectChange);


workBtnElement.addEventListener("click", handleWorkBtn);

loanBtnElement.addEventListener("click", handleLoanBtn);



