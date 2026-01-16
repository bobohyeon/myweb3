// 이벤트 전파 : 이벤트를 클릭하면 다른 요소에도 전파됨
// 버블링 : (부모쪽)위쪽으로 전파
// 캡쳐링 : 아래쪽으로 전파
// 이벤트리스너가 걸려있는 요소에 설정 -> currentTarget
// for in : 인덱스[] , for of : 객체{}

const main = document.querySelector("main");

function generateCardList() {
    const inputCardCnt = document.querySelector("#cardCnt").value;
    if (inputCardCnt > 28) {
        alert("28개 이하로 설정해주세요.")
        return;
    }
    main.innerHTML = "";

    const cardContentArr = [];
    for (let i = 1; i <= inputCardCnt; i++) {
        cardContentArr.push(i);
    }
    cardContentArr.push();
    const arr = cardContentArr.concat(cardContentArr);

    const result = shuffleArr(arr);

    for (const temp of result) {
        main.innerHTML += `
                        <div class="card-area">
                            <div class="card">
                                <div class="card-back">${temp}</div>
                                <div class="card-front">★</div>
                            </div>
                        </div>
                        `;
    }
}


function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function setListenerToCard() {
    const cardAreaArr = document.querySelectorAll(".card-area");

    for (const cardArea of cardAreaArr) {
        cardArea.addEventListener("click", function (evt) {

            const temp = evt.currentTarget;
            temp.classList.toggle("flip");

            setTimeout(() => {
                temp.classList.toggle("flip");
            }, 2000)
        });
    }

}

function handleClick() {

    generateCardList();
    setListenerToCard();

}