import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root', //When you provide the service at the root level, Angular creates a single,
  // shared instance of HeroService and injects into any class that asks for it
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = of(HEROES.find((h) => h.id === id)!);
    this.messageService.add('HeroService: Fetched hero with id: ' + id);
    return hero;
  }
}
