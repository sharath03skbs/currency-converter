const apiVersion = "1";  // Adjust the version as needed
const date = "2024.2.1  "; // Adjust the date as needed
    
const BASE_URL = `https://v6.exchangerate-api.com/v6/3cbc4387774168a0637d82f2/latest`;

//The api key expires in 2 months

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){       //This runs over both the select in dropdowns
    for (currCode in countryList){      //This  loops through all keys(currency codes) of countrylist of codes.js
        //console.log(currCode,countryList[currCode]);
        let newOption = document.createElement("option");   //Creates an option dynamically
        newOption.innerText = currCode;                        //Updates the current option to current currency code
        newOption.value=currCode;   
        if(select.name === "from" && currCode === "USD"){       //Initially usd has to be selected  in the drop down
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){  //Initially inr has to be selected in the drop down
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    //console.log(currCode,countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/32.png`;
    let img = element.parentElement.querySelector("img");      //selects parent is div , inside that we need to select img
                                                                //i.e img is sibling of select
    img.src = newSrc;
}

const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    //console.log(response);
    let data = await response.json();
    //console.log(data);
    const conversion_rates = data.conversion_rates ;   
    let rate = conversion_rates[toCurr.value];
    //console.log(rate);
    let finalAmount = amtVal * rate;
    let parsedAmt = parseFloat(finalAmount).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${parsedAmt} ${toCurr.value}`;
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

