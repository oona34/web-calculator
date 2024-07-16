import * as toolkit from './functions.js';

const calculator = {
	_firstNum: null,
	_secondNum: null,
	_secondOperator: null,
	_summonedOperator: null,
	_inputVault: "",
	_inputDisplayText: document.querySelector(".inline-operations"),
	_buttonsArr: [],
	_result: document.querySelector(".result-data"),

	get result() {
		return this._result.textContent;
	},
	set result(value) {
		this._result.textContent = value;
	},
	
	get firstNum() {
		return this._firstNum;
	},
	set firstNum(value) {
		this._firstNum = value;
	},
	get secondNum() {
		return this._secondNum;
	},
	set secondNum(value) {
		this._secondNum = value;
	},
	get secondOperator() {
		return this._secondOperator;
	},
	set secondOperator(value) {
		this._secondOperator = value;
	},
	get inputVault() {
		return this._inputVault;
	},
	set inputVault(value) {
		this._inputVault = value;
	},
	get summonedOperator() {
		return this._summonedOperator;
	},
	set summonedOperator(value) {
		this._summonedOperator = value;
	},
	get inputDisplayText() {
		return this._inputDisplayText.textContent;
	},
	set inputDisplayText(value) {
		this._inputDisplayText.textContent = value;
	},
	get buttonsArr() {
		return this._buttonsArr;
	},
	set buttonsArr(value) {
		this._buttonsArr = value;
	},
}

const storeValue = function(oldInput, value) {
	console.log("storing value in inputvault")
	calculator.inputVault = oldInput.concat(value)
}

const updateNum = function() {
	if(calculator.firstNum !== null) {
		calculator.secondNum = calculator.inputVault;
	} else {
		calculator.firstNum = calculator.inputVault;
	}
	calculator.inputVault = "";
}

const setDeleteDisableState = function() {
	if(calculator.inputDisplayText === calculator.result || calculator.inputDisplayText === "") {
		toggleDisableState(".delete", true);
	} else {
		toggleDisableState(".delete", false);
	}
}

const toggleDisableState = function(element, targetDisableToggle) {
	console.log(`Toggling ${element} disable to ${targetDisableToggle}`);
	let elements = document.querySelectorAll(element);
	if (targetDisableToggle) {
		elements.forEach((element) => {element.setAttribute("disabled", true);});
	} else {
		elements.forEach((element) => {element.removeAttribute("disabled");});
	}
	console.log(`disable is now set to ${targetDisableToggle}`);
}

const container = document.querySelector(".calculator-container");

const Buttons = function(name, value, type) {
    this.name = name;
	this.value = value;
	this.type = type;

    this.btn = document.createElement("button", `.${name}`);
	this.btn.classList.add("btn", `${name}`, `${type}`);
	this.btn.textContent = value;
	this.btn.style.setProperty("grid-area", `${name}`),
	container.append(this.btn);

	this.btn.addEventListener("click", () => {
		switch (this.type) {
			case "num":
				console.log("typing a num");
				storeValue(calculator.inputVault, this.value);
				calculator.inputDisplayText += this.value;
				toggleDisableState(".operator", false);
				break;
			case "operator":
				// it's an operator
				if(this.name === "equal") {
					// if equal key is pressed: 
					// - call the relevant operation with the recorded operator and available nums
					// - set firstNum as the result and reset secondNum and summonedOperator
					// - finally display the result aka firstNum
					updateNum();
					console.log(`nb1 is "${calculator.firstNum}", operator is "${calculator.summonedOperator}", and nb2 is "${calculator.secondNum}"`);
					calculator.result = Number.parseFloat(toolkit.callOperation(calculator.summonedOperator, calculator.firstNum, calculator.secondNum).toFixed(2));
					calculator.firstNum = calculator.result;
					calculator.secondNum = null;
					calculator.summonedOperator = null;
					calculator.inputDisplayText = calculator.firstNum;
				} else if (calculator.summonedOperator !== null) {
					// handle a second operation
					calculator.secondOperator = this.name;
					document.querySelector(`.equal`).click();
					calculator.summonedOperator = calculator.secondOperator;
					calculator.inputDisplayText += this.value;
					calculator.secondOperator = null;
			
				} else {
					// handle normal operator (not equal) press after num press
					console.log("handling regular operator press")
					updateNum();
					calculator.summonedOperator = this.name;
					calculator.inputDisplayText += this.value;
					if(!calculator.isOperatorDisabled) {toggleDisableState(".operator", true);}
				}
				
				break;	
			case "action":
				if(this.name === "clear") {
					calculator.firstNum= null;
					calculator.secondNum= null;
					calculator.secondOperator= null;
					calculator.summonedOperator= null;
					calculator.inputVault= "";
					calculator.result= 0;
					calculator.inputDisplayText= "";
				} else if (this.name === "delete") {
					console.log(calculator.inputDisplayText.slice(-1))
					if(calculator.inputDisplayText.slice(-1).match(/[\/\+\-\%\÷]/)) {
						calculator.inputDisplayText = calculator.inputDisplayText.slice(0,-1);
						calculator.inputVault = calculator.inputDisplayText;
						calculator.firstNum = calculator.inputVault;
						calculator.summonedOperator = null;
						toggleDisableState(".operator", false);
					} else {
						calculator.inputDisplayText = calculator.inputDisplayText.slice(0,-1);
						calculator.inputVault = calculator.inputVault.slice(0,-1);
					}
				}
				break;
			default:
				break;
		}
		setDeleteDisableState();
	})
}

const createButtons = (...args) => {
	for (let i = 0; i < args.length; i++) {
		let currBtn = new Buttons(args[i][0], args[i][1], args[i][2]);
		calculator.buttonsArr.push(currBtn);
	}

	toggleDisableState(".operator", true);
	toggleDisableState(".display>p", false);
	setDeleteDisableState();
	calculator.result = 0;
}

createButtons(
	["clear", "AC", "action"],
	["delete", "Del", "action"],
	["percentage", "%", "action"],
	["add", "+", "operator"],
	["subtract", "-", "operator"],
	["multiply", "x", "operator"],
	["divide", "÷", "operator"],
	["equal", "=", "operator"],
	["double-zero", "00", "num"],
	["single-zero", "0", "num"],
	["decimal", ".", "num"],
	["one", "1", "num"],
	["two", "2", "num"],
	["three", "3", "num"],
	["four", "4", "num"],
	["five", "5", "num"],
	["six", "6", "num"],
	["seven", "7", "num"],
	["eight", "8", "num"],
	["nine", "9", "num"]
);


