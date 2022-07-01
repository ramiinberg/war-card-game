let deckId

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
      .then(res => res.json())
      .then(data => {
        deckId = data.deck_id
        document.getElementById("draw-cards").disabled = false;
      })
}

function handleDrawTwoCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      console.log('data', data)
      const { cards } = data
      document.getElementById("first-card").src = cards[0].image
      document.getElementById("second-card").src = cards[1].image
    })
}

document.getElementById("new-deck").addEventListener("click", handleClick)
document.getElementById("draw-cards").addEventListener("click", handleDrawTwoCards)
