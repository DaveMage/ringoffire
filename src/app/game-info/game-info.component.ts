import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule, FormsModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { titel: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player' },
    { titel: 'You', description: 'You decide who drinks' },
    { titel: 'Me', description: 'Congrats! Drink a shot' },
    { titel: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { titel: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one.' },
    { titel: 'Chicks', description: 'All girls drink.' },
    { titel: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { titel: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { titel: 'Thumbmaster', description: '' },
    { titel: 'Men', description: 'All men drink.' },
    { titel: 'Quizmaster', description: '' },
    { titel: 'Never have i ever...', description: 'say something you never did. Everyone who did it has to drink.' },
    { titel: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  titel = '';
  description = '';

  @Input() card: string = ''; // musste undefined hinzufügen, da es sonst einen fehler gibt, weil am anfang kein wert (Karte) vorhanden ist.

  constructor() { }

  ngOnInit(): void {    // void bedeutet etwas ausführt und nix zurück gibt

  }

  ngOnChanges(): void {
    if (this.card) {
      console.log('current card', this.card);
      console.log('current number is', this.card.split('_')[1]); // split() teilt den string in ein array auf. In diesem Fall wird der string bei jedem _ geteilt. Mit [1] wird das zweite Element des Arrays ausgegeben.
      let cardNumber = +this.card.split('_')[1]; // + wandelt den string in eine Zahl um.
      this.titel = this.cardAction[cardNumber - 1].titel; // -1, weil das Array bei 0 anfängt.
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
