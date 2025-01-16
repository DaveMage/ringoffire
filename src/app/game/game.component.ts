import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // test
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from '../services/firestore.services'; // import firestore.services.ts
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {

  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);
  firestoreService: FirestoreService = inject(FirestoreService);
  

  game: any;

  constructor(private route: ActivatedRoute) {  //, private firestoreService: FirestoreService
    this.newGame();
    this.route.params.subscribe((params) => {
      this.firestoreService.gameId = params['gameId'];
      this.firestoreService.unsubGame = this.firestoreService.readGame(this.game);

      console.log("Game.Component:", this.game);
      console.log("URL-ID", this.firestoreService.gameId);
    });
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.firestoreService.saveGame(this.game);
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);
        this.firestoreService.saveGame(this.game);
      }, 1500);
    }
  }

  newGame() {
    this.game = this.firestoreService.newGame();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent); // component erstellt und eingebunden

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {    // erst überprüfen ob die variable existiert und dann ob sie länger als 0 ist.
        this.game.players.push(name);
        this.firestoreService.saveGame(this.game);
      }
    });
  }

}