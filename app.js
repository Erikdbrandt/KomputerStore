const bankBalanceElement = document.getElementById("bankBalance");
const loanBtnElement = document.getElementById("loanBtn");
const payAmountElement = document.getElementById("payAmount");
const bankBtnElement = document.getElementById("bankBtn");
const payBtnElement = document.getElementById("payBtn");
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
    console.log(computers);
    
    
    //choose the second to be the first because i liked the look more 🤠  
    updateComputerInfo(computers[1]);



}

const addComputerToSelect = (computer) => {

    console.log(computer.description);


    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    selectElement.appendChild(computerElement);



}


const handleComputerSelectChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];

    updateComputerInfo(selectedComputer);


}

const updateComputerInfo = selectedComputer => {

    computerPriceElement.innerText = `${selectedComputer.price} Kr`;
    computerTextElement.innerText = selectedComputer.description;
    computerSelectedNameElement.innerText = selectedComputer.title;
    computerImageElement.src = `${imageUrlPrefix}${selectedComputer.image}`;

    computerFeatureTextElement.innerText = selectedComputer.specs.join(" ")
}


selectElement.addEventListener("change", handleComputerSelectChange);



