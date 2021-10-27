var counter = 0;
fetch('https://api2.binance.com/api/v3/ticker/24hr').then((rawData) => rawData.json()).then((data) => {
    let count = 0;
    let tableID = document.getElementById("tableData");
    let index = 0;
    while (index < 100) {
        if (data[index].volume != 0.00000000) {
            let serial = document.createTextNode(++count);
            let symbol = document.createTextNode(data[index].symbol);
            let lowprice = document.createTextNode(data[index].lowPrice);
            let highprice = document.createTextNode(data[index].highPrice);
            let lastprice = document.createTextNode(data[index].lastPrice);
            let volume = document.createTextNode(data[index].volume);
            let newRow = tableID.insertRow(-1);
            newRow.insertCell(0).appendChild(serial);
            newRow.insertCell(1).appendChild(symbol);
            newRow.insertCell(2).appendChild(highprice);
            newRow.insertCell(3).appendChild(lowprice);
            newRow.insertCell(4).appendChild(volume);
            newRow.insertCell(5).appendChild(lastprice);
        }
        index++;
    }
});
setInterval(() => {
    fetch('https://api2.binance.com/api/v3/ticker/24hr').then((rawData) => rawData.json()).then((data) => {
        counter = counter + 1;
        document.getElementById("counter").innerHTML = counter;
        let tableID = document.getElementById("tableData");
        let index = 0;
        while (index < 100) {
            if (data[index].volume != 0.00000000) {
                tableID.rows[index + 1].cells[1].innerHTML = data[index].symbol;
                tableID.rows[index + 1].cells[2].innerHTML = data[index].highPrice;
                tableID.rows[index + 1].cells[3].innerHTML = data[index].lowPrice;
                
                if (tableID.rows[index + 1].cells[4].innerHTML < data[index].volume) {
                    tableID.rows[index + 1].cells[4].innerHTML = data[index].volume;
                    tableID.rows[index + 1].cells[4].style.color = "green";
                }
                else {
                    tableID.rows[index + 1].cells[4].innerHTML = data[index].volume;
                    tableID.rows[index + 1].cells[4].style.color = "red";
                }

                if (tableID.rows[index + 1].cells[5].innerHTML < data[index].lastPrice) {
                    tableID.rows[index + 1].cells[5].innerHTML = data[index].lastPrice;
                    tableID.rows[index + 1].cells[5].style.color = "green";
                }
                else {
                    tableID.rows[index + 1].cells[5].innerHTML = data[index].lastPrice;
                    tableID.rows[index + 1].cells[5].style.color = "red";
                }
            }
            index++;
        }
    }).catch((err) => {
        console.log("Error: ", err);
    });
}, 3000);
