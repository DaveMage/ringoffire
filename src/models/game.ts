export class Game {
    public players: string[] = [];      // mit public sind sie außerhalb der Klasse sichtbar. ansonsten nur innerhalb der Klasse.
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {         // consturctor ist eine Methode/Funktion, die aufgerufen wird, sobald ein Objekt von der Klasse erstellt wird.
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i); // fügt die Karten dem Stack hinzu
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        }
    }
}

function shuffle(array: string[]) {       // Wichtig ist, Sie muss außerhalb von unserem Objekt sein.
    let currentIndex = array.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}