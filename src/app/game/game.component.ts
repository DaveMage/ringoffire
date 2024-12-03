import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // test
import { Game } from '../../models/game'; // import game.ts
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";


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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.newGame(); // this.newGame() wird aufgerufen, sobald die Komponente erstellt wird.
  }

  newGame() {
    this.game = new Game();   // mit dieser Variablen erstellen wir ein neues objekt von der Klasse, die wir eben angelegt haben (game.ts). Es wird ein leeres Json onjekt mit all den eigenschafften erstellt.
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      this.currentCard = card !== undefined ? card : ''; // Fallback-Wert
      // this.currentCard = this.game.stack.pop(); // pop() entfernt das letzte Element aus dem Array und gibt es zurück.
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
