// Mendapatkan elemen display dan buttons
        var display = document.getElementById("calculator-display");
        var buttons = document.getElementById("calculator-buttons");

        // Mendeklarasikan variabel untuk menyimpan angka pertama, operator, dan status desimal
        var firstNumber = null;
        var operator = null;
        var decimal = false;

        function deleteLastCharacter() {
            // Mendapatkan nilai display saat ini
            var displayValue = display.innerHTML;
            // Jika display tidak kosong atau 0, hapus karakter terakhir
            if (displayValue != "" && displayValue != "0") {
                // Menghapus karakter terakhir dengan menggunakan slice
                displayValue = displayValue.slice(0, -1);
                // Jika display menjadi kosong setelah menghapus, ganti dengan 0
                if (displayValue == "") {
                    displayValue = "0";
                }
                // Menampilkan nilai baru di display
                display.innerHTML = displayValue;
            }
        }

        // Menambahkan event listener untuk keyboard input
    document.addEventListener("keydown", function(event) {
    // Mendapatkan tombol yang ditekan
    var key = event.key;
    // Melakukan aksi sesuai tombol yang ditekan
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
            // Jika tombol angka, panggil fungsi inputNumber dengan parameter angka yang ditekan
            inputNumber(parseInt(key));
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            // Jika tombol operator, panggil fungsi inputOperator dengan parameter operator yang ditekan
            inputOperator(key);
            break;
        case ".":
            // Jika tombol titik, panggil fungsi inputDecimal
            inputDecimal();
            break;
        case "=":
        case "Enter":
            // Jika tombol sama dengan atau enter, panggil fungsi calculate
            calculate();
            break;
        case "c":
        case "C":
            clearDisplay();
        case "Backspace":
            // Jika tombol backspace, panggil fungsi deleteLastCharacter
            deleteLastCharacter();
            break;
        case "Delete":
            // Jika tombol c, C, backspace, atau delete, panggil fungsi clearDisplay
            clearDisplay();
            break;
        default:
            // Jika tombol lain, tidak melakukan apa-apa
            break;
    }
});

        // Fungsi untuk memasukkan angka ke display
        function inputNumber(number) {
            // Jika display masih 0, ganti dengan angka yang dimasukkan
            if (display.innerHTML == "0") {
                display.innerHTML = number;
            } else {
                // Jika display sudah ada angka, tambahkan angka yang dimasukkan
                display.innerHTML += number;
            }
            // Mengembalikan warna tombol yang sudah ditekan ke warna normal
            resetButtonColor();
        }

        // Fungsi untuk memasukkan operator ke display
        function inputOperator(op) {
            // Jika angka pertama dan operator masih null, simpan angka pertama dan operator dari display
            if (firstNumber == null && operator == null) {
                firstNumber = parseFloat(display.innerHTML);
                operator = op;
                // Tambahkan spasi di sekitar operator untuk memisahkan angka
                display.innerHTML += " " + op + " ";
                // Setel status desimal menjadi false
                decimal = false;
            } else {
                // Jika angka pertama dan operator sudah ada, hitung hasil dan simpan sebagai angka pertama
                calculate();
                // Simpan operator baru dari input
                operator = op;
                // Tambahkan spasi di sekitar operator untuk memisahkan angka
                display.innerHTML += " " + op + " ";
                // Setel status desimal menjadi false
                decimal = false;
            }
            // Mengembalikan warna tombol yang sudah ditekan ke warna normal
            resetButtonColor();
        }

        // Fungsi untuk memasukkan desimal ke display
        function inputDecimal() {
            // Jika status desimal masih false, tambahkan titik desimal ke display
            if (!decimal) {
                display.innerHTML += ".";
                // Setel status desimal menjadi true
                decimal = true;
            }
            // Mengembalikan warna tombol yang sudah ditekan ke warna normal
            resetButtonColor();
        }

        // Fungsi untuk menghitung hasil dari display
        function calculate() {
            // Jika angka pertama dan operator sudah ada, ambil angka kedua dari display
            if (firstNumber != null && operator != null) {
                var secondNumber = parseFloat(display.innerHTML.split(" ").pop());
                // Mendeklarasikan variabel untuk hasil
                var hasil;

                // Melakukan perhitungan sesuai operator
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

                // Menampilkan hasil di display
                display.innerHTML = hasil;
                // Menyimpan hasil sebagai angka pertama
                firstNumber = hasil;
                // Mengosongkan operator
                operator = null;
                // Setel status desimal menjadi false
                decimal = false;
            }
            // Mengembalikan warna tombol yang sudah ditekan ke warna normal
            resetButtonColor();
        }

        // Fungsi untuk mengosongkan display
        function clearDisplay() {
            resetButtonColor();
            // Mengosongkan display
            display.innerHTML = "0";
            // Mengosongkan angka pertama dan operator
            firstNumber = null;
            operator = null;
            // Setel status desimal menjadi false
            decimal = false;
            // Mengembalikan warna tombol yang sudah ditekan ke warna normal
            
        }

        // Fungsi untuk mengembalikan warna tombol yang sudah ditekan ke warna normal
        function resetButtonColor() {
            // Mendapatkan semua elemen tombol
            var buttonElements = buttons.getElementsByTagName("button");
            // Melakukan iterasi untuk setiap tombol
            for (var i = 0; i < buttonElements.length; i++) {
                // Menghapus kelas active yang membuat warna tombol menjadi gelap
                buttonElements[i].classList.remove("active");
            }
        }