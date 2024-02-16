//임시메일 인덱스를 담아두는 변수
let index = -1;

/* ========== 
임시메일 인덱스를 통해서 input값이 바뀔떄마다
안의 내용 변경
 ========== */
//받는 사람
function writeReceiver() {
    let receiver = document.getElementById("sendMailReceiver").value;
    mailList[index].receiver = receiver;
    // 메일함 스토리지 갱신
    mailListToLocalStorage();
}

//메일 제목
function writeTitle() {
    let title = document.getElementById("sendMailTitle").value;
    mailList[index].title = title;
    // 메일함 스토리지 갱신
    mailListToLocalStorage();
}

//메일 내용
function writeContent() {
    let content = document.getElementById("sendMailContent").value;
    mailList[index].content = content;
    // 메일함 스토리지 갱신
    mailListToLocalStorage();
}

//전송버튼 클릭시 보낸메일함으로 변경
function statusChange() {
    mailList[index].mailBox = "sendMailBox";

    mailListToLocalStorage();

    location.href="success.html"

}

/* 메일작성하는 함수 */
function writeMail() {

    index = key;
    
    addMailData({
        key: key,
        sender: "qjxj1112@naver.com", //보내는 사람은 고정
        receiver: "",
        title: "",
        content: "",
        date: todayDate,
        mailBox: "tempoaryMailBox", //임시보관함에 저장 후 전송시 보낸메일함
        status: 0,
    });



    mailListToLocalStorage();
}


