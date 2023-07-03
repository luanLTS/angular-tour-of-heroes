import { Component } from '@angular/core';
import { Hero } from '../hero';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heros: Hero[] = [];

  newHeroName: string = '';
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heros = heroes));
  }

  add() {
    this.newHeroName = this.newHeroName.trim();
    if (!this.newHeroName) return;
    this.heroService
      .addHero({ name: this.newHeroName } as Hero)
      .subscribe((hero) => this.heros.push(hero));
    this.newHeroName = '';
  }

  delete(hero: Hero): void {
    this.heros = this.heros.filter((h) => h !== hero);
    // as a rule, an Observable does nothing until something subscribes.
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
