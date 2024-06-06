export class Card {
    constructor(card, suit) {
        this.card = card;
        const cardValues = {
            "HEARTSACE": 1,
            "HEARTS2": 2,
            "HEARTS3": 3,
            "HEARTS4": 4,
            "HEARTS5": 5,
            "HEARTS6": 6,
            "HEARTS7": 7,
            "HEARTS8": 8,
            "HEARTS9": 9,
            "HEARTS10": 10,
            "HEARTSJACK": 11,
            "HEARTSQUEEN": 12,
            "HEARTSKING": 13,
            "DIAMONDSACE": 1,
            "DIAMONDS2": 2,
            "DIAMONDS3": 3,
            "DIAMONDS4": 4,
            "DIAMONDS5": 5,
            "DIAMONDS6": 6,
            "DIAMONDS7": 7,
            "DIAMONDS8": 8,
            "DIAMONDS9": 9,
            "DIAMONDS10": 10,
            "DIAMONDSJACK": 11,
            "DIAMONDSQUEEN": 12,
            "DIAMONDSKING": 13,
            "CLUBSACE": 1,
            "CLUBS2": 2,
            "CLUBS3": 3,
            "CLUBS4": 4,
            "CLUBS5": 5,
            "CLUBS6": 6,
            "CLUBS7": 7,
            "CLUBS8": 8,
            "CLUBS9": 9,
            "CLUBS10": 10,
            "CLUBSJACK": 11,
            "CLUBSQUEEN": 12,
            "CLUBSKING": 13,
            "SPADESACE": 1,
            "SPADES2": 2,
            "SPADES3": 3,
            "SPADES4": 4,
            "SPADES5": 5,
            "SPADES6": 6,
            "SPADES7": 7,
            "SPADES8": 8,
            "SPADES9": 9,
            "SPADES10": 10,
            "SPADESJACK": 11,
            "SPADESQUEEN": 12,
            "SPADESKING": 13,
        };
        this.value = cardValues[card];
        this.suit = suit
        this.placeHolder = null;
        this.flipped = false;
        var suits = {HEARTS: 0, DIAMONDS: 13, CLUBS: 26, SPADES: 39};
        this.position = suits[this.suit] + this.value; //Position in a sorted deck
        this.backgroundPosition = -100 * this.position + "px";
    }
}
export class Card2 {
    constructor(card, suit) {
        this.card = card;
        this.value = "";
        this.suit = suit
        this.placeHolder = null;
        this.flipped = false;
        var suits = {HEARTS: 0, DIAMONDS: 13, CLUBS: 26, SPADES: 39};
        this.position = suits[this.suit] + this.value; //Position in a sorted deck
        this.backgroundPosition = -100 * this.position + "px";
    }
}
export class Card3 {
    constructor(rank, suit) {

        const cardValues = {
            "ACE": 1,
            "TWO": 2,
            "THREE": 3,
            "FOUR": 4,
            "FIVE": 5,
            "SIX": 6,
            "SEVEN": 7,
            "EIGHT": 8,
            "NINE": 9,
            "TEN": 10,
            "JACK": 11,
            "QUEEN": 12,
            "KING": 13
        };
        this.value = cardValues[rank];
        this.suit = suit
        this.placeHolder = null;
        this.flipped = false;
        var suits = {HEARTS: 0, DIAMONDS: 13, CLUBS: 26, SPADES: 39};
        this.position = suits[this.suit] + this.value;
        this.backgroundPosition = -100 * this.position + "px";
        console.log(this.backgroundPosition)
    }
}