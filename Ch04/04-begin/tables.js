'use strict';

let tableData = [];

window.addEventListener('DOMContentLoaded', () => {
  const myTable = document.querySelector('.content table');

  const body = myTable.tBodies[0];

  for (const row of body.rows) {
    const cells = row.cells;

    let dataRow = [cells[0].innerText, cells[1].innerText];
    dataRow[2] = parseInt(cells[2].innerText, 10);
    dataRow[3] = parseInt(cells[3].innerText, 10);

    tableData.push(dataRow);
  }

  console.log('data collected', [].concat(tableData));

  tableData.sort((a, b) => {
    // Numeric sort by stock, verbosely
    // if (a[2] < b[2]) {
    //   return -1;
    // } else if (a[2] > b[2]) {
    //   return 1;
    // } else if (a[2] === b[2]) {
    //   return 0;
    // }

    // Numeric sort by stock, compact
    // return a[2] - b[2];

    // Numeric sort by stock, descending
    return b[2] - a[2];
  });

  console.log('data sorted', tableData);
});
