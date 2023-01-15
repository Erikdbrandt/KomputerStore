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

const imageUrlPrefix = "https://hickory-quilled-actress.glitch.me/"

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

    computerFeatureTextElement.innerText = selectedComputer.specs.join(" ")
}

const handleComputerSelectChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];

    updateComputerInfo(selectedComputer);

}

const handleWorkBtn = e =>{
let currentValue = parseInt(payAmountBalanceElement.innerHTML);

   payAmountBalanceElement.innerText = currentValue + 100;
}



selectElement.addEventListener("change", handleComputerSelectChange);


workBtnElement.addEventListener("click", handleWorkBtn);
