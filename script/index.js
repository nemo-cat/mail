//메일 리스트 li를 만드는 함수
function addListToHTML(sender, title, date, key)
{
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
      <a href='#none' onclick="statusChange(this)">
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

    console.log(key);
    let mailStatus = mailMap[key].status;
    if (mailStatus == 0)
    {
        document.getElementById(ico3).style.background = 'url("../images/ico_mail_normal.png") no-repeat center';
    }
    else
    {
        document.getElementById("mailList" + key).style.color = "#8D8D8D";
        document.getElementById(ico3).style.background = 'url("../images/ico_mail_active.png") no-repeat center';
    }
}

//GNB를 클릭하면 content가 바뀌는 함수
function changeContent(mailBoxName)
{
    mailListRefresh();//메일함 초기화
    //클릭한 gnb메뉴의 id를 저장하는 변수
    let gnbMenuName = document.getElementById(mailBoxName).innerText;

    //1. title 내용 변경
    document.getElementById('content_tit').innerText = gnbMenuName;

    //1-1. gnb 색상 변경을위해 클래스명 주기
    let liCount = document.querySelector('.gnb_menu').childElementCount;
    let liList =  document.querySelector('.gnb_menu').children;
    for(let i = 0 ; i < liCount; i++)
    {
        liList[i].className = "normal";
    }
    document.getElementById(mailBoxName).className = "active";

    showMailList(mailBoxName);
    countMail(mailBoxName);    
}

//받은메일함을 기본적으로 보여주는 함수
function showInMailBox()
{
    showMailList("inMailBox");
    countMail("inMailBox");  
}

//2. 메일 리스트를 불러오는 함수
function showMailList(mailBoxName)
{
     //2. title에 맞는 메일 리스트를 불러옴
     for(let i = 0; i < mailList.length; i++)
     {
         let mailBox = mailList[i].mailBox;
         //클릭한 gnb의 id가 전체메일함일 경우
         if(mailBoxName == "allMailBox")
         {
             let sender = mailList[i].sender;
             let title = mailList[i].title;
             let date = mailList[i].date;
             let key = mailList[i].key;
             addListToHTML(sender, title, date, key);
         }
         //그 외의 경우, 해당하는 메일함 리스트만 보여줌
         else if(mailBoxName == mailBox)
         {
             let sender = mailList[i].sender;
             let title = mailList[i].title;
             let date = mailList[i].date;
             let key = mailList[i].key;
             addListToHTML(sender, title, date, key);
         }
     }
}

//3. 메일 갯수를 카운팅하는 함수
function countMail(mailBoxName)
{
    //3. 메일 갯수 카운팅
    let noReadMailCount = 0;
    let allMailCount = 0;
    let mailSatus;
    if(mailBoxName == "allMailBox")//현재 보고있는 제목이 전체메일이면
    {
        for(let i = 0; i < mailList.length; i++)
        {
            allMailCount = mailList.length;
            mailSatus = mailList[i].status;
            if(mailSatus == 0)
            {
                noReadMailCount++
            }
        }
    }
    else
    {
        //그 외의 경우, 해당하는 메일함 리스트만 보여줌
        for(let i = 0; i < mailList.length; i++)
        {
            //i번째의 메일함을 담는 변수
            let mailBox = mailList[i].mailBox;
            if(mailBoxName == mailBox)
            {
                allMailCount++;
                mailSatus = mailList[i].status;
                if(mailSatus == 0)
                {
                    noReadMailCount++
                }
            }
        }
    }
    //3-1. title옆에 메일 갯수 표시하기!

    document.getElementById("mail_conunt").innerHTML = `<span class="color">${noReadMailCount}</span>/${allMailCount}`
}




//메일함을 초기화하는 함수
function mailListRefresh()
{
    checkedLi = []; //체크된 메일 리스트를 초기화함
    let mail_list = document.querySelector(".mail_list");
    if (mail_list)
    {
        document.querySelector(".mail_list").innerHTML = " ";
    }
    let mailListWrap = document.querySelector('.mailList_wrap');
    mailListWrap.innerHTML = `<ul class="mail_list"></ul>`;
    mailListWrap.style["overflow-y"] = 'scroll';
    document.getElementById('delete_btn').style.display = "block";
}

//메일을 읽음상태로 변경하는 함수
function statusChange(e)
{
    //a의 부모(li)를 담는 변수
    let liElement = e.parentElement;
    // li 요소의 id 값을 추출하여 key 값을 가져옴
    let getLiId = liElement.getAttribute('id');
    let getLiIndex = getLiId.replace('mailList', '');
    checkedLi = getLiIndex//메일 삭제를 위해 key값 넘겨줌
    mailMap[getLiIndex].status = 1; //읽음상태로 변경
    saveToLocalStorage();  //로컬스토리지 갱신

    //메일함 카운팅 변경
    let gnbLiActive = document.querySelector(".gnb_menu .active");//gnb menu중 현재 active인 요소 선택
    let gnbLiId = gnbLiActive.id;//active요소의 아이디값을 가져옴
    countMail(gnbLiId);//해당 아이디로 메일갯수 카운팅을 다시함

    // 메일 읽는 화면으로 변경
    let mailSender = mailMap[getLiIndex].sender;
    let mailTitle = mailMap[getLiIndex].title;
    let mailContent = mailMap[getLiIndex].content;
    let readHtml = `
    <div class="writeRead_wrap read_wrap">
        <div class="input_box">
            <div class="input_recipient write_input">
                <p>보낸사람</p>
                <span>${mailSender}</span>
            </div>
            <div class="input_subject write_input">
                <p>제목</p>
                <span>${mailTitle}</span>
            </div>
        </div>
        <div class="receive_textarea">${mailContent}</div>
    </div>
    `
    let mailListWrap = document.querySelector('.mailList_wrap');
    mailListWrap.innerHTML = readHtml;
    mailListWrap.style.overflow = 'hidden';
    document.getElementById('delete_btn').style.display = "none";
}

//checkbox누르면 key값을 배열에 담는 함수
let checkedLi = [];
function addCheckedLi(e)
{
    let liElement = e.closest('li');
    let getLiId = liElement.getAttribute('id');
    let getLiIndex = getLiId.replace('mailList', '');
    
    //checkedLi 배열에서 getLiIndex가 있는지 확인, 없으면 -1반환
    let arrIndex = checkedLi.indexOf(getLiIndex);
    let checkBox = document.getElementById("mailIco1_" + getLiIndex);

    if (arrIndex == -1)
    {
        //배열에 없는 경우 새로 추가함
        checkedLi.push(getLiIndex);
        checkBox.nextElementSibling.style.backgroundImage = 'url("../images/ico_checkbox_active.png")';
    }
    else
    {
        //배열에 있는 경우 해당 값 제거
        checkedLi.splice(arrIndex, 1);
        checkBox.nextElementSibling.style.backgroundImage = 'url("../images/ico_checkbox_normal.png")';
    }
}

function deleteMail()
{
    let mailKey;
    for(let i = 0; i < checkedLi.length; i++)
    {
        mailKey = checkedLi[i];
        for(let j = 0; j < mailList.length; j++)
        {
            let deleteMailLi = mailList[j].key;
            if(deleteMailLi == mailKey)
            {
                mailList.splice(j,1);
                delete mailMap[deleteMailLi];

                // HTML 요소 삭제
                let deleteHtmlElement = document.getElementById("mailList" + deleteMailLi);
                deleteHtmlElement.remove();
            }
        }
    }

    //메일함 카운팅 변경
    let gnbLiActive = document.querySelector(".gnb_menu .active");//gnb menu중 현재 active인 요소 선택
    let gnbLiId = gnbLiActive.id;//active요소의 아이디값을 가져옴
    countMail(gnbLiId);//해당 아이디로 메일갯수 카운팅을 다시함
  
     //로컬스토리지 갱신
     saveToLocalStorage();
     checkedLi = [];
}
