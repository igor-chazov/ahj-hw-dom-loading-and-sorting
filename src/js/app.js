/* eslint-disable func-names */
const data = `[
  {
    "id": 26,
    "title": "Побег из Шоушенка",
    "imdb": 9.30,
    "year": 1994
  },
  {
    "id": 25,
    "title": "Крёстный отец",
    "imdb": 9.20,
    "year": 1972
  },
  {
    "id": 27,
    "title": "Крёстный отец 2",
    "imdb": 9.00,
    "year": 1974
  },
  {
    "id": 1047,
    "title": "Тёмный рыцарь",
    "imdb": 9.00,
    "year": 2008
  },
  {
    "id": 223,
    "title": "Криминальное чтиво",
    "imdb": 8.90,
    "year": 1994
  }
]`;

function renderTable(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const {
      id, title, imdb, year,
    } = arr[i];
    const html = `
    <tr data-id="${id}" data-title="${title}" data-year="${year}" data-imdb="${imdb}">
      <td>${id}</td>
      <td>${title}</td>
      <td>(${year})</td>
      <td>imdb: ${((imdb * 100) / 100).toFixed(2)}</td>
    </tr>
    `;
    document.getElementById('table').insertAdjacentHTML('beforeend', html);
  }

  const thText = `
  <tr>
    <th>id</th>
    <th>title</th>
    <th>year</th>
    <th>imdb</th>        
  </tr>
  `;

  document.getElementById('table').insertAdjacentHTML('afterbegin', thText);
}

renderTable(JSON.parse(data));

function getArray() {
  const arrayTable = [];
  const tableColection = document.querySelectorAll('tr');

  for (const item of tableColection) {
    if (item.attributes.length === 0) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const attrTable = {};

    for (const attr of item.attributes) {
      attrTable[attr.name.slice(5)] = attr.value;
    }
    arrayTable.push(attrTable);
  }
  return arrayTable;
}

let selectedTh;

function sortTable(event, thText) {
  const array = getArray();
  let compare;

  if (!selectedTh) {
    if (thText === 'id' || thText === 'year' || thText === 'imdb') {
      compare = function (a, b) {
        return a[thText] - b[thText];
      };
    } else {
      compare = function (a, b) {
        return a[thText] > b[thText] ? 1 : -1;
      };
    }
  } else if (thText === 'id' || thText === 'year' || thText === 'imdb') {
    compare = function (a, b) {
      return b[thText] - a[thText];
    };
  } else {
    compare = function (a, b) {
      return a[thText] < b[thText] ? 1 : -1;
    };
  }

  const tbodyColection = document.querySelectorAll('tbody');
  for (const elem of tbodyColection) {
    elem.remove();
  }
  renderTable(array.sort(compare));

  if (!selectedTh) {
    const thColection = document.querySelectorAll('th');
    for (const elem of thColection) {
      if (elem.textContent === thText) {
        elem.classList.add('sortDown');
      }
    }
  }

  if (selectedTh) {
    selectedTh = null;
    const thColection = document.querySelectorAll('th');
    for (const elem of thColection) {
      if (elem.textContent === thText) {
        elem.classList.add('sortUp');
      }
    }
  } else {
    selectedTh = event.target;
  }
}

document.getElementById('table').addEventListener('mousedown', (event) => {
  event.preventDefault();

  if (!event.target.closest('th')) {
    return;
  }

  const th = event.target;

  sortTable(event, th.textContent);
});
