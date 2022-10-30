const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');
const addTicketBtn = document.querySelector('.addTicket-btn');

const cardList = document.querySelector('.ticketCard-area');

const regionSearch = document.querySelector('.regionSearch');
const searchResult = document.querySelector('#searchResult-text');

let filter = "";
let card = "";
let filterData = [];
let id = 3; // 因初始資料的 id 到 2 了，所以新資料的 id 從 3 開始給

let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];


cardList.innerHTML = render(data); // 初始渲染頁面
function render(data) { // 渲染資料
  data.forEach((item) => {
    card += `
      <li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img
              src="${item.imgUrl}"
              alt=""
            />
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${item.price}</span>
            </p>
          </div>
        </div>
      </li>
  `;
  });
  console.log("渲染");
  return card
};
function calcText(obj) { // 計算敘述欄位字數
  let textLength = 0;
  let textArr = obj.description.trim().split(' ');
  textArr.forEach((item) => {
    textLength += item.length
  });
  return textLength
};
function cleanInput() { // 清除 input 欄位
  ticketName.value = "";
  ticketImgUrl.value = "";
  ticketRegion.value = "";
  ticketDescription.value = "";
  ticketNum.value = "";
  ticketPrice.value = "";
  ticketRate.value = "";
};
function newObject(obj) { // 將新的空物件賦予 input 欄位值
  obj.name = ticketName.value;
  obj.imgUrl = ticketImgUrl.value;
  obj.area = ticketRegion.value;
  obj.description = ticketDescription.value;
  obj.group = ticketNum.value;
  obj.price = ticketPrice.value;
  obj.rate = ticketRate.value;
  obj.id = id;

  return obj
};

addTicketBtn.addEventListener('click', () => {
  let obj = {};
  let isNone = false; // 欄位初始狀態

  newObject(obj); // 新的空物件賦予值

  Object.values(obj).forEach((value) => { // 物件迴圈，若發現有空值則將欄位初始狀態轉換為 true
    if (value === "") {
      isNone = true;
    };
  });

  calcText(obj); // 計算字數

  if (isNone === false) { // 判斷表單內容是否都有值
    if (obj.rate <= 10 && obj.rate > 0) { // 判斷星級是不是 1 ~ 10
      if (calcText(obj) <= 100) { // 敘述要小於 100 字
        data.push(obj);
      } else {
        alert(`敘述欄位字數 ${obj.description.length}，超過 100 字，請重新輸入。`);
      }
    } else {
      alert(`目前輸入星級 ${obj.rate}，星級只能 1-10 分，請重新輸入。`)
    };
  } else {
    alert(`欄位不得為空，請重新輸入。`);
  };

  cleanInput() // 清除 input 欄位

  id++;

  card = ""; // 清空初始渲染產生的卡片資料

  cardList.innerHTML = render(data);
  searchResult.textContent = `本次搜尋共 ${data.length} 筆資料`
});

regionSearch.addEventListener('click', (e) => {
  if (e.target.value === "地區搜尋" || e.target.value === "") {
    // 為了讓剛點擊 select 的時候不要又把前面已渲染的 card 又多渲染一次
    // 透過 card = ""; 讓 card 模板初始化
    card = "";

    // 為了在搜尋完之後能夠回到全部地區，所以要重新渲染一次
    cardList.innerHTML = render(data);

    // 將未搜尋的資料數渲染至畫面
    searchResult.textContent = `本次搜尋共 ${data.length} 筆資料`
  } else {
    data.forEach((item) => { // 對 data 陣列逐一取資料
      if (e.target.value === item.area) { // 判斷 select 的值有沒有跟陣列資料相符
        // 相符合就將 filterData 空陣列加上模板，並且此模板套入 data 陣列資料
        filter += `<li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img
                src="${item.imgUrl}"
                alt=""
              />
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`
        filterData.push(item)
      };
    });
    cardList.innerHTML = filter; // 將 cardList 重新渲染成配對過的資料
    searchResult.textContent = `本次搜尋共 ${filterData.length} 筆資料`
    filter = ""; // 將 filter 初始化，如果沒有初始化會重複渲染
    filterData = [];
  }
});