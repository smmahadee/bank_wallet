const main = document.querySelector('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const millionaireBtn = document.getElementById('millionaire');
const sortBtn = document.getElementById('sort');
const totalBtn = document.getElementById('total');

let data = [];

// show Entire wealth
const showTotalWealth = () => {
  const total = data.reduce((acc, user) => {
    return acc + user.money;
  }, 0);
  const wealthEl = document.createElement('div');
  wealthEl.classList.add('total')
  wealthEl.innerHTML = `<h3>Total :<Strong>$${formatMoney(total)}</Strong></h3>`;
  main.appendChild(wealthEl);

};

// Show millionaires
const showMillionaires = () => {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
};

// Sort by who has much money
const sort = () => {
  data.sort((user1, user2) => user2.money - user1.money);
  console.log(data);
  updateDOM();
};

// Double the money of all users
const doubleMoney = () => {
  data = data.map((user) => ({ ...user, money: user.money * 2 }));

  updateDOM();
};

// Format Money
const formatMoney = (money) =>
  money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

// Update DOM with data
const updateDOM = () => {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  data.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<h3><Strong>${item.name}</Strong>$${formatMoney(
      item.money
    )}</h3>`;

    main.appendChild(element);
  });
};

// Add data to data Array
const addData = (userData) => {
  data.push(userData);
  updateDOM();
};

// Fetching data from Api

const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  console.log(newUser);
  addData(newUser);
};

getRandomUser();
getRandomUser();
getRandomUser();

// Event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sort);
millionaireBtn.addEventListener('click', showMillionaires);
totalBtn.addEventListener('click', showTotalWealth);
