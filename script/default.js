let mailList = [];
let mailMap = {};
let key = 0;

// 날짜를 구하는 변수
let today = new Date();
let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let day = ("0" + today.getDate()).slice(-2);
let todayDate = year + "-" + month + "-" + day;

// 리스트와 맵에 메일을 담는함수
function addMailList(mailObject)
{
    mailList.push(mailObject);
    mailMap[mailObject.key] = mailObject;
}

// 임시 데이터를 추가하는 함수
function addTestData()
{
    for(let i = 0; i < 10; i++)
    {
        addMailList({
            key: key,
            sender: "oscarmk48@naver.com",
            receiver: "qjxj1112@naver.com",
            title: "행운의편지" + key,
            content: "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다. 영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다. 그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권이 당첨되어 20억을 받았습니다. 어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는 암살당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. 그리고 이 편지를 버리거나 낙서를 해서는 절대로 안됩니다. 7통입니다. 이 편지를 받은 사람은 행운이 깃들것입니다. 힘들겠지만 좋은게 좋다고 생각하세요. 7년의 행운을 빌면서...",
            date: todayDate,
            mailBox: "inMailBox",
            status: 0, //안읽음0 읽으면 1
        });
        key++;
    }

    for (let i = 0; i < 10; i++) {
        addMailList({
            key: key,
            sender: "qjxj1112@naver.com",
            receiver: "oscarmk48@naver.com",
            title: "내게쓴메일" + key,
            content: "ㅈㄱㄴ",
            date: todayDate,
            mailBox: "toMeMailBox",
            status: 0,
        });
        key++;
    }
    
}

// 로컬 스토리지에 리스트를 저장하는 함수
function saveToLocalStorage()
{
    let mailListString = JSON.stringify(mailList);
    window.localStorage.setItem("mailList", mailListString);
}

// 로컬 스토리지에 데이터가 있는지 확인 후 데이터를 추가/로드 하는 함수
function checkLocalStorage()
{
    //로컬스토리지의 mailList를 불러옴
    let checking = window.localStorage.getItem("mailList");
    //저장된 데이터가 없으면 새로운 데이터 추가
    if(!checking)
    {
        addTestData();
        saveToLocalStorage();
    }
    //저장된 데이터가 있으면 새롭게 데이터를 가져옴
    else
    {
        //가져온 mailList를 objecet형태로 바꿈
        let changeData = JSON.parse(checking);
        mailList = changeData;
        for(let i = 0; i< mailList.length; i++)
        {
            mailMap[mailList[i].key] = mailList[i];
            key = mailList[i].key;
        }
    }
}