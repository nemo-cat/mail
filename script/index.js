/* 변수 모음 */
let checkedLi = []; //선택한 메일 리스트의 key값을 저장하는 배열
let allMailCount; // 전체 메일 카운트
let notReadMailCount; //안읽은 메일 카운트

/* 받은 메일함과, 내게쓴 메일함에 임시 데이터 추가 */
for (let i = 0; i < 10; i++) {
    addMailData({
        key: key,
        sender: "qjxj1112@naver.com",
        receiver: "oscarmk48@naver.com",
        title: "행운의편지" + i,
        content: "ㅈㄱㄴ",
        date: todayDate,
        mailBox: "inMailBox",
        status: 0, //안읽음0 읽으면 1
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
        status: 0,
    });
}

/* 기본값으로 받은메일함을 보여줌 */
addMailListInMailBox();

/* 메일의 갯수를 카운트하는 함수 */
function countMail(mailBoxName) {
    //카운트 초기화
    allMailCount = 0;
    notReadMailCount = 0;

    //메일 리스트 길이만큼 돌면서 카운트 증가
    for (let i = 0; i < mailList.length; i++) {
        let mailBox = mailList[i].mailBox;
        // 주어진 메일함에 속하는 메일인 경우 또는 전체 메일함인 경우
        if (mailBox == mailBoxName || mailBoxName == "allMailBox") {
            allMailCount++; // 전체 메일 수 증가
            // 해당 메일이 안읽은 상태인 경우
            if (mailList[i].status == 0) {
                notReadMailCount++; // 안읽은 메일 수 증가
            }
        }
    }

    document.getElementById("mail_conunt").innerHTML = `<span class="color">${notReadMailCount}</span>/${allMailCount}`;
}

/* 각 메일함에 메일 리스트를 불러오는 함수 */
function addMailBox(mailBoxName) {
    mailListRefresh();
    for (let i = 0; i < mailList.length; i++) {
        if (mailList[i] == undefined) {
            continue; //삭제된 메일은 표시하지 않음
        } else {
            let mailBox = mailList[i].mailBox;
            if (mailBox == mailBoxName) {
                let sender = mailList[i].sender;
                let title = mailList[i].title;
                let date = mailList[i].date;
                let key = mailList[i].key;
                addMailHtmlText(sender, title, date, key);
            }
        }
    }
}

/* 받은 메일함 */
function addMailListInMailBox() {
    addMailBox("inMailBox");
    countMail("inMailBox");
}

/* 보낸 메일함 */
function addMailListSendMailBox() {
    addMailBox("sendMailBox");
    countMail("sendMailBox");
}

/* 내게 쓴 메일함 */
function addMailListToMeBox() {
    addMailBox("toMeMailBox");
    countMail("toMeMailBox");
}

/* 임시 메일함 */
function addMailListTempoaryMailBox() {
    addMailBox("tempoaryMailBox");
    countMail("tempoaryMailBox");
}

/* 전체 메일함 */
function addMailListAll() {
    mailListRefresh();
    for (let i = 0; i < mailList.length; i++) {
        if (mailList[i] === undefined) {
            continue;
        } else {
            let sender = mailList[i].sender;
            let title = mailList[i].title;
            let date = mailList[i].date;
            let key = mailList[i].key;
            addMailHtmlText(sender, title, date, key);
        }
    }
    countMail("allMailBox");
}

/* 메일함 초기화 */
function mailListRefresh() {
    checkedLi = []; //체크된 메일 리스트를 초기화함
    let mail_list = document.querySelector(".mail_list");
    if (mail_list) {
        document.querySelector(".mail_list").innerHTML = " ";
    }
}

/* 문서에 메일 리스트(li)를 추가하는 함수 */
function addMailHtmlText(sender, title, date, key) {
    let mail_list = `
    <li class='${key}' id="mailList${key}">
      <div class='mail_icon_box'>
        <div>
            <input type='checkbox' id='mailIco1_${key}'/>
            <label for='mailIco1_${key}' onclick='addCheckedLi(this)'>
              <span class='hide'>선택</span>
            </label>
        </div>
        <div>
            <input type='checkbox' id='mailIco2_${key}' />
            <label for='mailIco2_${key}'>
              <span class='hide'>중요</span>
            </label>
        </div>
        <div id='mailIco3_${key}'>
          <span class='hide'>읽음</span>
        </div>
      </div>
      <a href='#none' onclick="readMail(this)">
        <div><span class='writer'>${sender}</span>${title}</div>
        <span class='mail_date'>${date}</span>
      </a>  
    </li>
`;
    document.querySelector(".mail_list").innerHTML += mail_list;

    // 메일 아이콘 기본 배경이미지
    let ico1 = "mailIco1_" + key;
    let ico2 = "mailIco2_" + key;
    let ico3 = "mailIco3_" + key;

    document.getElementById(ico1).nextElementSibling.style.backgroundImage = 'url("../images/ico_checkbox_normal.png")';
    document.getElementById(ico2).nextElementSibling.style.backgroundImage = 'url("../images/ico_favorite_normal.png")';

    let mailStatus = mailList[key].status;
    if (mailStatus == 0) {
        document.getElementById(ico3).style.background = 'url("../images/ico_mail_normal.png") no-repeat center';
    } else {
        document.getElementById(ico3).style.background = 'url("../images/ico_mail_active.png") no-repeat center';
    }
}

/* 메일 리스트(li) 클릭시 읽음상태(1)로 변경하는 함수 */
function readMail(e) {
    // a를 누르면 부모인 li에 접근하여 class에 넣어둔 key값 가져오기
    let liKey = e.parentElement.classList.value;
    //key값으로 배경이미지와 상태 변경
    document.getElementById("mailIco3_" + liKey).style.background = 'url("../images/ico_mail_active.png") no-repeat center';
    mailList[liKey].status = 1;

    //메일 갯수 카운팅
    let allMailBox = document.getElementById("content_tit").innerText;
    //현재 보고있는 제목이 전체메일이면
    if (allMailBox == "전체메일") {
        //전체메일로 카운트
        countMail("allMailBox");
    } else {
        let thisMailBox = mailList[liKey].mailBox; //클릭한 메일이 어떤 메일함에 있는지 저장
        countMail(thisMailBox);
    }
}

/* 선택한 li를 배열에 담는함수 */
function addCheckedLi(e) {
    //li의 key값을 저장하기 위한 변수
    let liElement = e.parentElement.parentElement.parentElement;
    let liKey = liElement.classList.value;

    //checked상태 확인하여 변수에 저장
    let checkBox = document.getElementById("mailIco1_" + liKey);
    let isChecked = checkBox.checked;

    /* label을 누르면 체크상태가 된다.
    근데, 체크드 상태로 바뀌기 전에 isChecked에는 false가 먼저 저장되고나서 true로 바뀌기 떄문에
    false일때를 true로 생각해야함. (반대로 생각해야함)
     */
    if (isChecked == false) {
        checkBox.nextElementSibling.style.backgroundImage = 'url("../images/ico_checkbox_active.png")';
        //checkedLi에 liKey값을 추가
        checkedLi.push(liKey);
    } else {
        checkBox.nextElementSibling.style.backgroundImage = 'url("../images/ico_checkbox_normal.png")';
        //checkedLi에 저장되있던 liKey값을 삭제
        for (let i = 0; i < checkedLi.length; i++) {
            if (checkedLi[i] == liKey) {
                checkedLi.splice(i, 1);
            }
        }
    }
}

/* 체크된 메일을 삭제하는 함수 */
function deleteMailList() {
    //mail List의 key값을 담을 변수
    let deleteKey;
    let deleteHtmlElement;
    for (let i = 0; i < checkedLi.length; i++) {
        //checkedLi 배열에서 키 값을 추출하여 liKey에 저장
        deleteKey = checkedLi[i];
        delete mailList[deleteKey];
        deleteHtmlElement = document.getElementById("mailList" + deleteKey);
        deleteHtmlElement.remove();
    }
    checkedLi = []; //체크된 메일 리스트를 초기화함

    // 메일함 스토리지 갱신
    mailListToLocalStorage();
}
