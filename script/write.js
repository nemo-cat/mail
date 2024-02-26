let newKey = 0;//새 메일 key를 담을 변수

//메일쓰기 버튼 클릭시 실행하는 함수
function writeMail(e)
{
    //기존 mailLis의 마지막 key값을 가져와서 1 증가
    let listLength = mailList.length;
    let lastKey = mailList[listLength - 1].key;
    newKey = lastKey + 1

    //gnb_menu li들 normal로 변경
    let liCount = document.querySelector('.gnb_menu').childElementCount;
    let liList =  document.querySelector('.gnb_menu').children;
    for(let i = 0 ; i < liCount; i++)
    {
        liList[i].className = "normal";
    }

    //content_title 변경
    let writeTitle = e.innerText;
    document.getElementById('content_tit').innerText = writeTitle;
    document.getElementById('mail_conunt').style.display = "none";
    document.getElementById('delete_btn').style.display = "none";

    //content 영역 안의 html 변경
    let mailListWrap = document.querySelector('.mailList_wrap');
    let writeHtml = `
    <div class="writeRead_wrap write_wrap">
        <div class="input_box">
            <div class="input_recipient write_input">
                <p>받는사람</p>
                <input onblur="writeReceiver(${newKey})" type="email" id="sendMailReceiver" maxlength="50"/>
            </div>
            <div class="input_subject write_input">
                <p>제목</p>
                <input onblur="writeTitle(${newKey})" type="text" id="sendMailTitle" maxlength="50"/>
            </div>
        </div>
        <textarea onblur="writeContent(${newKey})" id="sendMailContent" maxlength="2000" placeholder="2,000자 작성가능"></textarea>
    </div>`
    mailListWrap.innerHTML = writeHtml;
    mailListWrap.style.overflow = 'hidden';

    //right_btm영역 변경
    document.querySelector('.right_btm').innerHTML = `<button class="send_btn" onclick="sendMail(${newKey})">보내기</button>`
   
    //임시메일 생성
    writeNewMail(newKey);
}


//임시 메일함에 데이터를 생성하는 함수
function writeNewMail(newKey)
{ 
    addMailList({
        key: newKey,
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
}

/* 메일을 작성하면서 input값이 바뀔때마다 스토리지 갱신해줌 */
//받는 사람
function writeReceiver(index)
{
    let receiver = document.getElementById("sendMailReceiver").value;
    mailMap[index].receiver = receiver;
    saveToLocalStorage();
}

//메일 제목
function writeTitle(index)
{
    let title = document.getElementById("sendMailTitle").value;
    mailMap[index].title = title;
    saveToLocalStorage();
}

//메일 내용
function writeContent(index)
{
    let content = document.getElementById("sendMailContent").value;
    mailMap[index].content = content;
    saveToLocalStorage();
}

//전송버튼 클릭시 보낸메일함 or 내게쓴 메일함으로 바꿔줌
function sendMail(index)
{
    //content_tit에 따라 보관함을 다르게 저장
    let contentTitle = document.getElementById('content_tit').innerText;
    if(contentTitle == "메일쓰기")
    {
        mailMap[index].mailBox = "sendMailBox";
    }
    else
    {
        mailMap[index].mailBox = "toMeMailBox";
    }
    saveToLocalStorage();

    //메일전송 성공 화면으로 변경
    let successHtml =`
    <div class="search_box">
        <input type="text" placeholder="검색어를 입력하세요" />
        <button class="search_btn"><span class="hide">검색</span></button>
    </div>
    <div class="content success_content">
        <div class="send_success">
            <img src="images/ico_mailsend.png" alt="" />
        </div>
        <p>메일을 성공적으로 보냈습니다.</p>
        <button><a href="index.html">확인</a></button>
    </div>`
    document.querySelector('.right_section').innerHTML = successHtml;
}