
        var display = document.getElementById("calculator-display");
        var buttons = document.getElementById("calculator-buttons");

        var firstNumber = null;
        var operator = null;
        var decimal = false;

        function inputNumber(number) {
            if (display.innerHTML == "0") {
                display.innerHTML = number;
            } else {
                display.innerHTML += number;
            }
            resetButtonColor();
        }

        function inputOperator(op) {
            if (firstNumber == null && operator == null) {
                firstNumber = parseFloat(display.innerHTML);
                operator = op;
                display.innerHTML += " " + op + " ";
                decimal = false;
            } else {
                calculate();
                operator = op;
                display.innerHTML += " " + op + " ";
                decimal = false;
            }
            resetButtonColor();
        }

        function inputDecimal() {
            if (!decimal) {
                display.innerHTML += ".";
                decimal = true;
            }
            resetButtonColor();
        }

        function calculate() {
            if (firstNumber != null && operator != null) {
                var secondNumber = parseFloat(display.innerHTML.split(" ").pop());
                var hasil;

                switch (operator) {
                    case "+":
                        hasil = firstNumber + secondNumber;
                        break;
                    case "-":
                        hasil = firstNumber - secondNumber;
                        break;
                    case "*":
                        hasil = firstNumber * secondNumber;
                        break;
                    case "/":
                        hasil = firstNumber / secondNumber;
                        break;
                    default:
                        hasil = "Operator tidak valid";
                }

                display.innerHTML = hasil;
                firstNumber = hasil;
                operator = null;
                decimal = false;
            }
            resetButtonColor();
        }

        function clearDisplay() {
            display.innerHTML = "0";
            firstNumber = null;
            operator = null;
            decimal = false;
            resetButtonColor();
        }

        function deleteLastCharacter() {
            var displayValue = display.innerHTML;
            if (displayValue != "" && displayValue != "0") {
                displayValue = displayValue.slice(0, -1);
                if (displayValue == "") {
                    displayValue = "0";
                }
                display.innerHTML = displayValue;
            }
            resetButtonColor();
        }

        function resetButtonColor() {
            var buttonElements = buttons.getElementsByTagName("button");
            for (var i = 0; i < buttonElements.length; i++) {
                    buttonElements[i].classList.remove("active");
                }
            }

            document.addEventListener("keydown", function (event) {
                var key = event.key;
                switch (key) {
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        inputNumber(parseInt(key));
                        break;
                    case "+":
                    case "-":
                    case "*":
                    case "/":
                        inputOperator(key);
                        break;
                    case ".":
                        inputDecimal();
                        break;
                    case "=":
                    case "Enter":
                        calculate();
                        break;
                    case "c":
                    case "C":
                        clearDisplay();
                    case "Backspace":
                        deleteLastCharacter();
                        break;
                    case "Delete":
                        clearDisplay();
                        break;
                    default:
                        break;
                }
            });