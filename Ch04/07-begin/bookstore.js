'use strict';

let tableData = [];

const collectTableData = function (myTable) {
  const body = myTable.tBodies[0];

  let tableData = [];

  for (const row of body.rows) {
    const cells = row.cells;
    let dataRow = [];

    tableData.push(dataRow);
  }

  return tableData;
};

window.addEventListener('DOMContentLoaded', () => {
  // collect table data into an array
  const myTable = document.querySelector('.content table');

  tableData = collectTableData(myTable);

  console.log('data collected', [].concat(tableData));

  const tableHeader = myTable.querySelector('thead');

  tableHeader.addEventListener('click', (evt) => {
    const targetElement = evt.target;
    const targetId = targetElement.id;

    if (!targetElement.matches('.sortable')) {
      return;
    }

    let sortKey;
    let sortType = 'alpha';
    let sortDirection;

    switch (targetId) {
      case 'header-title':
      case 'header-author':
      case 'header-price':
        break;
    }

    let currentSortDirection = targetElement.getAttribute('aria-sort');
    switch (currentSortDirection) {
      case 'ascending':
        sortDirection = 'descending';
        break;
      case 'descending':
      default:
        sortDirection = 'ascending';
        break;
    }

    tableData.sort((a, b) => {
      if (a === b) {
        return 0;
      }
      return a < b ? -1 : 1;
    });

    // Now replace the table data with the sorted data
    const myTable = document.querySelector('.content table');

    const body = myTable.querySelector('tbody');

    for (let r = 0; r < body.rows.length; r++) {
      body.deleteRow(r);
      let newRow = body.insertRow(r);

      for (let c = 0; c < tableData[r].length; c++) {
        let newCell = newRow.insertCell(c);
        let cellText = document.createTextNode(tableData[r][c]);
        newCell.appendChild(cellText);
      }
    }

    // Update the table header with current sort information and style
    const currentSortElement = myTable.querySelector('thead th[aria-sort]');
    if (currentSortElement) {
      currentSortElement.removeAttribute('aria-sort');
    }
    targetElement.setAttribute('aria-sort', sortDirection);
  });
});
