// 이벤트 전파 : 이벤트를 클릭하면 다른 요소에도 전파됨
// 버블링 : (부모쪽)위쪽으로 전파
// 캡쳐링 : 아래쪽으로 전파
// 이벤트리스너가 걸려있는 요소에 설정 -> currentTarget
// for in : 인덱스[] , for of : 객체{}

const main = document.querySelector("main");


let firstCard = null;
let SecondCard = null;
let canClick = false; //논리값으로 다음단계로 못 넘어가게 하기, 클릭이 안되는거로 보임


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
    const cardAreaArr = document.querySelectorAll(".card-area");

    canClick = false;

    setTimeout(() => {

        for (const card of cardAreaArr) {
            card.classList.add("flip");
        }
    }, 1000);

    setTimeout(() => {

        for (const card of cardAreaArr) {
            card.classList.remove("flip");
        }

        canClick = true;
    }, 5000);


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

            // card-area의 상태가 flip 으로 바뀐 첫번째 카드와 두번째 카드의
            // card-back 숫자가 같으면 없애기

            if (!canClick) return;

            if (cardArea.classList.contains("flip")) return;

            cardArea.classList.add("flip");

            if (firstCard == null) {
                firstCard = cardArea;
                return;
            }

            SecondCard = cardArea;
            canClick = false;
        });
    }
}



function handleClick() {

    generateCardList();
    setListenerToCard();

}


