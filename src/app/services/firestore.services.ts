import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, addDoc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    firestore: Firestore = inject(Firestore);
    unsubGame: any;
    gameId: string = "";

    constructor() { }

    ngOnDestroy() {
        // this.unsubGame();
    }

    newGame() {
        return new Game();
    }

    async addGame(game: any) {
        const docRef = await addDoc(this.getGamesRef(), game.toJson());
        this.gameId = docRef.id;
        console.log("Game-Firebase-ID", this.gameId);
        /* this.unsubGame = this.readGame(this.gameID, game); */
        return this.gameId;
    }

    readGame(game: any) {
        return onSnapshot(doc(this.getGamesRef(), this.gameId), (doc) => {  //gameId auf gamecomponent
            const data = { ...doc.data() };
            game.players = data['players'];
            game.stack = data['stack'];
            game.playedCards = data['playedCards'];
            game.currentPlayer = data['currentPlayer'];
            game.pickCardAnimation = data['pickCardAnimation']; // nicht vorhanden
            game.currentCard = data['currentCard'];
            /* console.log("readGame() ID: ", doc.id);
            console.log("currentPlayer: ", game.currentPlayer); */
        });
    }

    async saveGame(game: any) {
        await updateDoc(this.getSingleGameRef(this.gameId), game.toJson());
    }

    getGamesRef() {
        return collection(this.firestore, 'games');
    }

    getSingleGameRef(docId: string) {
        return doc(this.getGamesRef(), docId);
    }
}

