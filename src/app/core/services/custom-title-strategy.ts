import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomTitleStrategy extends TitleStrategy {

  constructor(private readonly titleService: Title) {
    super();
  }

  /**
   * Esta función se ejecuta cada vez que cambias de ruta.
   */
  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.titleService.setTitle(title);
    } else {
      this.titleService.setTitle('ServiPark');
    }
  }
}