// write your code here
let cardInfo;
function cardRender (card){
    cardInfo =card
    cardTitleTag =document.querySelector("#card-title")
    cardImageTag =document.querySelector("#card-image")
    cardLikesTag =document.querySelector("#like-count")
    cardLikeBtnTag =document.querySelector("#like-button")
    cardListTag =document.querySelector("#comments-list")
    cardCommentForaTag =document.querySelector("#comment-form")
    cardCommentInputTag =document.querySelector("#comment")

    cardTitleTag.textContent =card.title
    cardImagetag.src =card.image
    cardLikesTag.textContent =`${card.like}likes`
    
    while(cardListTag.hasChildNodes()){
        cardListTag.removeChild(cardListTag.lastChild)
    }

    card.comments.forEach(comment => {
        let commentTag =document.createElement("li")

        commentTag.textContent =comment.content
        cardListTag.appendChild(commentTag)
    })

    LikescardBtnTag.addEventListener("click",()=>{
        card.likes +=1;
        cardLikesTag.textContent =`${card.likes}likes`

    })

    cardCommentformTag.addEventListener("submit", (e)=>{
        e.preventDefault();
        let commentTag =document.createElement ("li")
        commentTag.textContent =cardCommentInputTag.value;
        cardListTag.appendChild(commentTag)

        const newComment ={
            id: card.comments.length +1,
            imageId: 1,
            content: cardCommentInputTag.value
        }
        card.comments.push(newComment);
        fetch ("http://localhost:3000/images/1", {
            method: "PATCH",
            headers: {"content-Type":"application/json"},
            body: JSON.stringify(card)

        })
        .then(response =>response.json())
        .then(data =>console.log(data))
        .catch(error =>console.log(`Error:${error}`));

        fetch ("http://localhost:3000/comments/", {

        method: "POST",
       headers: {"content-Type":"application/json"},
        body: JSON.stringify(newComment)

        })
        .then(Response =>Response.json())
        .then(data =>console.log(data))
        .catch(eror =>console.log(`Error:${error}`));
         
        cardCommentformTag.reset();
    })
};

document.addEventListener("DOMContentLoaded", ()=>{
    cardRender();
})


function fetchData(path=1){
    fetch (`http://localhost:3000/images/${path}`)
    .then(response =>response.json())
    .then(data =>cardRender(data))
    .catch(error =>console.log(`error:${error}`));
                
};
fetchData ()