//gnb 메뉴 리스트
let gnbMenuList = document.querySelectorAll(".gnb_menu li");

// 날짜
let today = new Date();
let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let day = ("0" + today.getDate()).slice(-2);
let todayDate = year + "-" + month + "-" + day;

// 메일리스트, 메일맵
let key = 0;
let mailList = [];
let mailMap = {};

for (let i = 0; i < 10; i++) {
    addMailData({
        key: key,
        sender: "qjxj1112@naver.com",
        receiver: "oscarmk48@naver.com",
        title: "행운의편지" + i,
        content: "ㅈㄱㄴ",
        date: todayDate,
        mailBox: "inMailBox",
    });
}

for (let i = 0; i < 10; i++) {
    addMailData({
        key: key,
        sender: "qjxj1112@naver.com",
        receiver: "oscarmk48@naver.com",
        title: "내게쓴메일" + i,
        content: "ㅈㄱㄴ",
        date: todayDate,
        mailBox: "toMeMailBox",
    });
}

function changeClass(e, listIdx, clickId) {
    /* 전체 li 요소에 클래스 active삭제, normal 추가, bgimage 검정색으로 변경 */
    let icoBlack = "ico_mailList0";
    let titTxt = e.firstChild.innerText;

    //e.id로 해볼까?

    for (let i = 0; i < gnbMenuList.length; i++) {
        gnbMenuList[i].classList.remove("active");
        gnbMenuList[i].classList.add("normal");
        gnbMenuList[i].style.backgroundImage = "url(../images/" + icoBlack + (i + 1) + "_black.png)";
    }

    /* 클릭한 li 요소에 클래스 active추가 */
    e.classList.remove("normal");
    e.classList.add("active");
    e.style.backgroundImage = "url(../images/" + icoBlack + listIdx + "_whtie.png)";
    document.getElementById("content_tit").innerText = titTxt;

    if (clickId == "allMailBox") {
        addMailListAll();
    } else if (clickId == "inMailBox") {
        addMailListInMailBox();
    } else if (clickId == "toMeMailBox") {
        addMailListToMeBox();
    } else {
        mailListRefresh();
    }
}

function addMailData(mailObject) {
    mailList.push(mailObject);
    mailMap[mailObject.key] = mailList;
    key += 1;
}

//전체 메일함
function addMailListAll() {
    mailListRefresh();
    for (let i = 0; i < mailList.length; i++) {
        let sender = mailList[i].sender;
        let title = mailList[i].title;
        let date = mailList[i].date;
        addMailHtmlText(sender, title, date);
    }
}

//받은 메일함
function addMailListInMailBox() {
    mailListRefresh();
    for (let i = 0; i < mailList.length; i++) {
        let mailBox = mailList[i].mailBox;

        if (mailBox == "inMailBox") {
            let sender = mailList[i].sender;
            let title = mailList[i].title;
            let date = mailList[i].date;
            addMailHtmlText(sender, title, date);
        }
    }
}

//내게쓴 메일함
function addMailListToMeBox() {
    mailListRefresh();
    for (let i = 0; i < mailList.length; i++) {
        let mailBox = mailList[i].mailBox;

        if (mailBox == "toMeMailBox") {
            let sender = mailList[i].sender;
            let title = mailList[i].title;
            let date = mailList[i].date;
            addMailHtmlText(sender, title, date);
        }
    }
}

//메일함 초기화
function mailListRefresh() {
    document.querySelector(".mail_list").innerHTML = "";
}

function addMailHtmlText(sender, title, date) {
    let mail_list = `
    <li>
      <div class='mail_icon_box'>
        <div>
            <input type='checkbox' id='mail_ico1' />
            <label for='mail_ico1'>
              <span class='hide'>선택</span>
            </label>
        </div>
        <div>
            <input type='checkbox' id='mail_ico2' />
            <label for='mail_ico2'>
              <span class='hide'>중요</span>
            </label>
        </div>
        <div id='mail_ico3'>
          <span class='hide'>읽음</span>
        </div>
        <div id='mail_ico4'>
          <span class='hide'>첨부파일</span>
        </div>
      </div>
      <a href=''>
        <div><span class='writer'>${sender}</span>${title}</div>
        <span class='mail_date'>${date}</span>
      </a>  
    </li>
`;
    document.querySelector(".mail_list").innerHTML += mail_list;
}
