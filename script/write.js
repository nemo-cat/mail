let index = 0;

//임시 메일함에 데이터 생성
function writeNewMail()
{
    index = key + 1;
    addMailList({
        key: index,
        sender: "qjxj1112@naver.com", //보내는 사람은 고정
        receiver: "",
        title: "",
        content: "",
        date: todayDate,
        mailBox: "tempoaryMailBox", //임시보관함에 저장 후 전송시 보낸메일함
        status: 0,
    });
    //로컬스토리지 갱신
    saveToLocalStorage();
    alert(index);
}

//임시메일 인덱스를 통해서 input값이 바뀔때마다 안의 내용 변경
//받는 사람
function writeReceiver()
{
    let receiver = document.getElementById("sendMailReceiver").value;
    mailList[index].receiver = receiver;
    saveToLocalStorage();
}

//메일 제목
function writeTitle()
{
    let title = document.getElementById("sendMailTitle").value;
    mailList[index].title = title;
    saveToLocalStorage();
}

//메일 내용
function writeContent()
{
    let content = document.getElementById("sendMailContent").value;
    mailList[index].content = content;
    saveToLocalStorage();
}

//전송버튼 클릭시 보낸메일함으로 변경
function statusChange()
{
    mailList[index].mailBox = "sendMailBox";
    saveToLocalStorage();
    location.href="success.html"
}