import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // test
import { Game } from '../../models/game'; // import game.ts
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
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

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game(); // Definitive Zuweisung, da wir das Objekt in ngOnInit() initialisieren
  gameId: string | undefined;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(params => {
      console.log(params['id']); // gibt die Parameter in der Konsole aus.
      this.gameId = params['id'];

      this.firestoreService.getGames().subscribe(games => {
        console.log("Aktuelle Spiele: ", games);
      });
    });

  }

  newGame() {
    this.game = new Game();
    // this.firestoreService.addGame(this.game.toJson()); // this.game
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      this.currentCard = card !== undefined ? card : ''; // Fallback-Wert

      console.log(this.currentCard); // gibt die Karte in der Konsole aus.
      this.pickCardAnimation = true;
      console.log(this.game);   // gibt das leere Json objekt in der Konsole aus.

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => { // setzt die animation auf false, nachdem die Karte gezogen wurde.
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent); // component erstellt und eingebunden

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {    // erst überprüfen ob die variable existiert und dann ob sie länger als 0 ist.
        this.game.players.push(name);
      }
    });

  }

}