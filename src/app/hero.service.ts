import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', //When you provide the service at the root level, Angular creates a single,
  // shared instance of HeroService and injects into any class that asks for it
})
export class HeroService {
  private heroUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroUrl).pipe(
      // tap gets the observable value but not modify the final observable that send to client subscribed
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  // getHero(id: number): Observable<Hero> {
  //   const hero = of(HEROES.find((h) => h.id === id)!);
  //   this.messageService.add('HeroService: Fetched hero with id: ' + id);
  //   return hero;
  // }
  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroUrl}/${id}`).pipe(
      tap((_) => this.log('Fetched hero with id: ' + id)),
      catchError(this.handleError<Hero>('getHero id=' + id))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log('update hero id: ' + hero.id)),
      catchError(this.handleError<any>('update hero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log('added hero w/ id: ' + newHero.id)),
      catchError(this.handleError<Hero>('add hero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    return this.http
      .delete<Hero>(`${this.heroUrl}/${id}`, this.httpOptions)
      .pipe(
        tap((_) => this.log('deleted hero id: ' + id)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
