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
let mailMap = new Map();

//메일 데이터를 리스트와 맵에 담는 함수
function addMailData(mailObject) {
    mailList.push(mailObject);
    mailMap[mailObject.key] = mailList;
    key += 1;
    mailListToLocalStorage();
}

/* ========== 
GNB 메뉴 클릭시, class변경(css) 및
메뉴에 맞는 임시 데이터를 추가하는 함수
 ==========  */
function changeClass(e, listIdx, clickId) {
    // background-image 경로를 저장하는 변수
    let icoBlack = "ico_mailList0";
    let titTxt = e.innerText;

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

/* 로컬스토리지 */
function mailListToLocalStorage() {
    let mailListString = JSON.stringify(mailList);
    let mailMapString = JSON.stringify(mailMap);

    window.localStorage.setItem("mailList", mailListString);
    window.localStorage.setItem("mailMap", mailMapString);
}
