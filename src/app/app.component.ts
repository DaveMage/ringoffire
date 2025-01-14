import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // test
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { FirestoreService } from '../app/services/firestore.services';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatButtonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'ringoffire';
  games$!: Observable<any[]>;
  firestoreService: FirestoreService = inject(FirestoreService);

  constructor() { }

  ngOnInit(): void {
    this.games$ = this.firestoreService.getGames();
  }
}
