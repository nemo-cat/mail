//gnb 메뉴 리스트를 담는 변수
let gnbMenuList = document.querySelectorAll(".gnb_menu li");

// 날짜를 구하는 변수
let today = new Date();
let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let day = ("0" + today.getDate()).slice(-2);
let todayDate = year + "-" + month + "-" + day;

// 메일리스트, 메일맵을 담을 변수
let key = 0;
let mailList = [];
let mailMap = {};

//받은 메일함과, 내게쓴 메일함에 임시 데이터 추가
for (let i = 0; i < 10; i++) {
    addMailData({
        key: key,
        sender: "qjxj1112@naver.com",
        receiver: "oscarmk48@naver.com",
        title: "행운의편지" + i,
        content: "ㅈㄱㄴ",
        date: todayDate,
        mailBox: "inMailBox",
        status: 2,
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
        status: 2,
    });
}

function addMailData(mailObject) {
    mailList.push(mailObject);
    mailMap[mailObject.key] = mailList;
    key += 1;
}

addMailListInMailBox();

/* ========== 
GNB 메뉴 클릭시, class변경(css) 및
메뉴에 맞는 임시 데이터를 추가하는 함수
 ==========  */
function changeClass(e, listIdx, clickId) {
    // background-image 경로를 저장하는 변수
    let icoBlack = "ico_mailList0";
    let titTxt = e.firstChild.innerText;

    //class normal로 바꾸고, background-image를 black으로 변경
    for (let i = 0; i < gnbMenuList.length; i++) {
        gnbMenuList[i].classList.remove("active");
        gnbMenuList[i].classList.add("normal");
        gnbMenuList[i].style.backgroundImage = "url(images/" + icoBlack + (i + 1) + "_black.png)";
    }

    /*  ========== 
    클릭한 gnb메뉴에 class active로 바꾸고,
    bg-image를 white로 변경.
    content-tit도 gnb메뉴 내용과 같게 변경
     ==========  */

    e.classList.remove("normal");
    e.classList.add("active");
    e.style.backgroundImage = "url(images/" + icoBlack + listIdx + "_whtie.png)";
    document.getElementById("content_tit").innerText = titTxt;

    //클릭한 gnb메뉴와 맞는 임시 데이터를 넣는다.
    if (clickId == "allMailBox") {
        addMailListAll();
    } else if (clickId == "inMailBox") {
        addMailListInMailBox();
    } else if (clickId == "toMeMailBox") {
        addMailListToMeBox();
    } else if (clickId == "sendMailBox") {
        addMailListSendMailBox();
    } else if (clickId == "tempoaryMailBox") {
        addMailListTempoaryMailBox();
    } else {
        mailListRefresh();
    }
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

//보낸 메일함
function addMailListSendMailBox() {
    mailListRefresh();
    for (let i = 0; i < mailList.length; i++) {
        let mailBox = mailList[i].mailBox;

        if (mailBox == "sendMailBox") {
            let sender = mailList[i].sender;
            let title = mailList[i].title;
            let date = mailList[i].date;
            addMailHtmlText(sender, title, date);
        }
    }
}

//임시 메일함
function addMailListTempoaryMailBox() {
    mailListRefresh();
    for (let i = 0; i < mailList.length; i++) {
        let mailBox = mailList[i].mailBox;

        if (mailBox == "tempoaryMailBox") {
            let sender = mailList[i].sender;
            let title = mailList[i].title;
            let date = mailList[i].date;
            addMailHtmlText(sender, title, date);
        }
    }
}

//메일함 초기화
function mailListRefresh() {
    document.querySelector(".mail_list").innerHTML = " ";
}

//메일 리스트 li를 추가하는 함수
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
