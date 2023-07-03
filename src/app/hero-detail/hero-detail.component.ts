import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(
    private heroService: HeroService,
    // holds information about the route to this instance of the component
    private route: ActivatedRoute,
    // angular service for interacting with the browser, kind navigate de back page...
    private location: Location
  ) {}

  ngOnInit() {
    // The route.snapshot is a static image of the route information shortly after the component was created.
    // paramsMap is a dictionary of all router parameters extracted from the URL. Thats value is always strings
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  save() {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.location.back();
  }
}
