import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { GameComponent } from '../game/game.component';
import { GameData } from '../../models/game';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(private firestore: Firestore) { }

    getGames(): Observable<any[]> {
        const gamesCollection = collection(this.firestore, 'games');
        return collectionData(gamesCollection);
    }

    getGameById(gameId: string): Observable<any> {
        const gameDocRef = doc(this.firestore, `game/${gameId}`);
        return docData(gameDocRef);
    }

    async addGame(newGame: GameData) {
        const gamesCollection = collection(this.firestore, 'games');
        await addDoc(gamesCollection, newGame);
    }
}