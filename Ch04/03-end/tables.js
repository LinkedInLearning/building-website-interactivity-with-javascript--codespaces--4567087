"use strict";


let tableData = [];

window.addEventListener('DOMContentLoaded', () => {
    // collect table data into an array
    const myTable = document.querySelector('.content table');

    const body = myTable.tBodies[0];

    for (const row of body.rows) {
        const cells = row.cells;
        let dataRow = [cells[0].innerText, cells[1].innerText];
        dataRow[2] = parseInt(cells[2].innerText, 10);
        dataRow[3] = parseInt(cells[3].innerText, 10);

        tableData.push(dataRow);
    }

    const collectedData = [].concat(tableData);
    console.log('data collected', collectedData);

    // tableData.sort();

    tableData.sort((a, b) => {
        // Numeric sort by stock, verbose mode
        // if (a[2] < b[2]) {
        //     return -1;
        // } else if (a[2] > b[2]) {
        //     return 1;
        // } else if (a[2] === b[2]) {
        //     return 0;
        // }

        // numeric sort by stock, compact mode
        // return a[2] - b[2];

        // descending numeric sort by price
        return b[3] - a[3];
    });

    console.log('data sorted', tableData);
});
