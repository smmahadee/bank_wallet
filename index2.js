const main = document.querySelector('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const millionaireBtn = document.getElementById('millionaire');
const sortBtn = document.getElementById('sort');
const totalBtn = document.getElementById('total');

let data = [];

// show total
const showTotalWealth = () => {
  const total = data.reduce((acc, user) => acc + user.money, 0);


  if (!main.lastElementChild.classList.contains('total')) {
    const wealthEl = document.createElement('div');
    wealthEl.classList.add('total');
    wealthEl.innerHTML = `<h3>Total : <strong>$${formatMoney( total)}</strong></h3>`;
    main.appendChild(wealthEl);

  }
};

// show only millionaires
const showMillionaires = () => {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
};

// sort method
const sort = () => {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
};

// double money func
const doubleMoney = () => {
  data = data.map((user) => ({ ...user, money: user.money * 2 }));
  updateDOM();
};

// format money
const formatMoney = (money) =>
  money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

// update dom by fetching data
const updateDOM = (updatedData = data) => {
  main.innerHTML = `<h2><Strong>Person</Strong>Wealth</h2>`;

  updatedData.forEach((user) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<h3><strong>${user.name}</strong>$${formatMoney(
      user.money
    )}</h3>`;

    main.appendChild(element);
  });
};

// add data to data variable
const addData = (user) => {
  data.push(user);

  updateDOM();
};

// Random user
const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

getRandomUser();
getRandomUser();

// Event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sort);
millionaireBtn.addEventListener('click', showMillionaires);
totalBtn.addEventListener('click', showTotalWealth);
