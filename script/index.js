//메일리스트 li를 만드는 함수
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
    </li>`;
    document.querySelector(".mail_list").innerHTML += mail_list;

    // 메일 아이콘 기본 배경이미지
    let ico1 = "mailIco1_" + key;
    let ico2 = "mailIco2_" + key;
    let ico3 = "mailIco3_" + key;

    document.getElementById(ico1).nextElementSibling.style.backgroundImage = 'url("../images/ico_checkbox_normal.png")';
    document.getElementById(ico2).nextElementSibling.style.backgroundImage = 'url("../images/ico_favorite_normal.png")';

    //메일 읽음 상태를 확인하여 아이콘변경
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

//gnb_menu를 클릭하면, 메일함에 맞는 content가 보여지는 함수
function changeContent(mailBoxName)
{
    mailListRefresh();//메일함 초기화
    //클릭한 gnb메뉴의 id를 저장하는 변수
    let gnbMenuName = document.getElementById(mailBoxName).innerText;

    //1. title 변경
    document.getElementById('content_tit').innerText = gnbMenuName;

    //1-1. gnb_menu li 클래스 변경
    let liCount = document.querySelector('.gnb_menu').childElementCount;
    let liList =  document.querySelector('.gnb_menu').children;
    for(let i = 0 ; i < liCount; i++)
    {
        liList[i].className = "normal";
    }
    document.getElementById(mailBoxName).className = "active"; //active된 li만 따로 스타일 지정해놨음

    showMailList(mailBoxName);
    countMail(mailBoxName);    
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
    if(mailBoxName == "allMailBox")
    {
        //현재 보고있는 제목이 전체메일이면, 메일함 확인 없이 갯수 카운팅
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

//받은메일함을 기본적으로 보여주는 함수
function showInMailBox()
{
    showMailList("inMailBox");
    countMail("inMailBox");  
}

//메일함을 초기화하는 함수
function mailListRefresh()
{
    checkedLi = []; //선택한 메일을 초기화 함

    //html을 기본틀로 다시 변경함
    let mailListWrap = document.querySelector('.mailList_wrap');
    mailListWrap.innerHTML = "<ul class='mail_list'></ul>";
    mailListWrap.style["overflow-y"] = 'scroll';
    document.getElementById('delete_btn').style.display = 'block';
    document.getElementById('mail_conunt').style.display = 'block';
    
    let mail_list = document.querySelector(".mail_list");
    if (mail_list)
    {
        document.querySelector(".mail_list").innerHTML = " ";
    }

    let numberList = `
        <ol>
            <li><button class="active">1</button></li>
            <li><button class="normal">2</button></li>
            <li><button class="normal">3</button></li>
            <li><button class="normal">4</button></li>
            <li><button class="normal">5</button></li>
        </ol>`
    document.querySelector('.right_btm').innerHTML = numberList;
}

let nowIndex = 0; //현재 메일리스트의 key값을 담아두는 변수.
//메일을 읽기위해 클릭하면 실행되는 함수
function statusChange(e)
{
    //메일을 클릭하면 부모요소인 li를 변수에 저장함
    let liElement = e.parentElement; 

    // li 요소의 id 값을 추출하여 key 값을 가져옴
    let getLiId = liElement.getAttribute('id');
    let getLiIndex = getLiId.replace('mailList', '');

    //html 내용 변경
    document.getElementById('delete_btn').style.display = "none";
    document.querySelector('.right_btm').innerHTML = `
    <div class='mailBtnBox'>
        <button onclick='prevMail()'>이전 메일</button>
        <button onclick='nextMail()'>다음 메일</button>
    </div>`

    nowIndex = getLiIndex;
    readMail(nowIndex);
}

//메일을 읽음상태로 변경하는 함수
function readMail(key)
{
    mailMap[key].status = 1; //읽음상태로 변경
    saveToLocalStorage();  //로컬스토리지 갱신

    //메일갯수 카운팅 숨김
    document.getElementById('mail_conunt').style.display = "none";

     // 메일 읽는 화면으로 html 변경
     let mailSender = mailMap[key].sender;
     let mailTitle = mailMap[key].title;
     let mailContent = mailMap[key].content;
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
}

// 이전메일을 불러오는 함수
function prevMail()
{
    let gnbLiActive = document.querySelector(".gnb_menu .active");
    let gnbLiId = gnbLiActive.id; //현재 어느 메일함인지 저장함

    while (nowIndex >= 0)
    {
        nowIndex -= 1; // 현재 보고있는 메일의 인덱스(키값)에서 1을 뺌(이전메일)
        let nowMailBox = mailMap[nowIndex].mailBox; //이전 메일이 어느 메일함인지 저장함

        //현재 보고있는 메일함과 이전 메일의 메일함이 일치하거나, 전체메일함일때 실행
        if (gnbLiId === nowMailBox || gnbLiId === "allMailBox")
        {
            readMail(nowIndex); //이전메일을 표시함
            mailMap[nowIndex].status = 1; //이전 메일을 읽음 상태로 변경
            saveToLocalStorage(); // 로컬스토리지 갱신
            return; // 이전 메일을 표시했으므로 함수 종료
        }
    }
    alert("첫번째 메일입니다.");
}

//다음 메일을 불러오는 함수
function nextMail()
{
    let gnbLiActive = document.querySelector(".gnb_menu .active"); // gnb menu 중 현재 active인 요소 선택
    let gnbLiId = gnbLiActive.id; // active 요소의 아이디값을 가져옴

    while (nowIndex < mailList.length)
    {
        let intIndex = parseInt(nowIndex);//문자열로 계산되서 정수로 변경했음
        intIndex += 1;
        nowIndex = intIndex; //nowIndex에 증가값 저장

        let nowMailBox = mailMap[intIndex].mailBox;
        if (gnbLiId === nowMailBox || gnbLiId === "allMailBox")
        {
            readMail(intIndex);
            mailMap[intIndex].status = 1;
            saveToLocalStorage();
            return;
        }
    }
    alert("마지막 메일입니다.");
}

//메일 삭제를 위해 key값을 배열에 담는 함수
let checkedLi = [];//삭제할 key값을 담을 변수

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

//메일을 삭제하는 함수
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

    //배열 초기화, 로컬스토리지 갱신
     saveToLocalStorage();
     checkedLi = [];
}
