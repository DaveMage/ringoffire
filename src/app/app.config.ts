import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"rinf-of-fire","appId":"1:508344781221:web:a2821bfc976e2c4a26404c","storageBucket":"rinf-of-fire.firebasestorage.app","apiKey":"AIzaSyDwmWdi-p8RqR1L_Wy2AdYmBUQPzUqVAdo","authDomain":"rinf-of-fire.firebaseapp.com","messagingSenderId":"508344781221"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
