let deckId
const drawCardsEl = document.getElementById("draw-cards")

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
      .then(res => res.json())
      .then(data => {
        deckId = data.deck_id
        drawCardsEl.disabled = false;
        drawCardsEl.classList.add('draw-cards-enabled')
        drawCardsEl.classList.remove('draw-cards-disabled')
        document.getElementById("deck-remaining").textContent = 'Cards remaining: 52'
      })
}

function getRealValue(card) {
  if(isNaN(card)) {
    if(card === "JACK") {
      return 11
    }
    else if(card === "QUEEN") {
      return 12
    }
    else if( card === "KING") {
      return 13
    }
    else if( card === "ACE") {
      return 14
    }
    return 0
  } else {
    return Number(card)
  }
}

function compareCards(card1, card2) {
  cardNumberValue1 = getRealValue(card1)
  cardNumberValue2 = getRealValue(card2)

  if(cardNumberValue1 > cardNumberValue2){
    return 'Computer wins!'
  }
  else if(cardNumberValue2 > cardNumberValue1) {
    return 'Player wins!'
  }
  else {
    return 'War!'
  }
}

function handleDrawTwoCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      console.log('data', data)
      const { cards, remaining } = data
      const [ card1, card2 ] = cards
      document.getElementById("first-card").src = card1.image
      document.getElementById("second-card").src = card2.image
      const winnerText = compareCards(card1.value, card2.value)
      document.getElementById("winner-text").textContent = winnerText
      document.getElementById("deck-remaining").textContent = `Cards remaining: ${remaining}`
      if(remaining === 0) {
        drawCardsEl.classList.add('draw-cards-disabled')
        drawCardsEl.classList.remove('draw-cards-enabled')
        drawCardsEl.disabled = true;
      }
    })
}

document.getElementById("new-deck").addEventListener("click", handleClick)
document.getElementById("draw-cards").addEventListener("click", handleDrawTwoCards)
