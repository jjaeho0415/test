const instagram = document.querySelector(".instagram");

const myForm = document.getElementById("myForm");
myForm.addEventListener("submit", handleSubmit);

function getContactList(){
    const contactList = localStorage.getItem("contactList");
    if(contactList){
        return JSON.parse(contactList);
    }
    else{
        return [];
    }
}

function saveContactList(contactList){
    const contactList = JSON.stringify(contactList);
    localStorage.setItem("contactList", contactList);
}

function handleSubmit(e){
    e.preventDefault(); // 페이지 로딩 막아줌
    // form의 제목 부분
    const nameInput = document.getElementById("ct_name");
    // form의 메세지 부분
    const messageInput = document.getElementById("ct_description");

    const nameValue = nameInput.value;
    const messageValue = messageInput.value;

    const sendAt = new Date().toISOString();

    // 1. contactList <- 메세지들을 담는다.
    const contactList = getContactList();
    // 2. 새로운 메세지에 대해서 contactList에다가 추가한다.
    const newContact = {
        name : nameValue,
        message : messageValue,
        sendAt : sendAt
    }
    contactList.push(newContact);
    // 3. 변경된 contactList를 storage에 저장한다.
    saveContactList(contactList);
    // 4. 화면에 새로운 (갱신된) 데이터를 출력한다.
    const contactListElement = document.querySelector(".contactList");
    const newContactElement = document.createElement("li");
    newContactElement.innerText = `${nameValue} - ${messageValue} (${sendAt})`;
    contactListElement.appendChild(newContactElement);

    myForm.reset();
}

function setLocation(){
    instagram.addEventListener("click", ()=>{
        window.open("https://www.instagram.com/purify_0kcal/")
    })
}

function init(){

    // 1. storage에 저장된 것을 가져옴
    const contactList = getContactList();
    // 2. 각각에 대해서 출력함
    const contactListElement = document.querySelector(".contactList");
    contactList.foreach((value) => {
        const newContactElement = document.createElement("li");
        newContactElement.innerText = `${value.name} - ${value.message} (${value.sendAt})`;
        contactListElement.appendChild(newContactElement);
    });


    setLocation();
}

window.onload = init();