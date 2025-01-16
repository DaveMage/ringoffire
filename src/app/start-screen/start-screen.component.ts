import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameComponent } from '../game/game.component';
import { FirestoreService } from '../services/firestore.services';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  gamecomponent: any;

  constructor(private router: Router, private firestoreservice: FirestoreService) { }


  async newGame() {
    const createNewGame = this.firestoreservice.newGame();

    try {
      const id = await this.firestoreservice.addGame(createNewGame);
      this.router.navigateByUrl('/game/' + id);
      // this.router.navigateByUrl('/game');
      console.log("start-screen-component", id);
      

    } catch (error) {
      console.error('Error creating new game', error);
    }

    // this.router.navigate(['/game']);
    // game start
  }
}


