import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Location } from '../../types/location.interface';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'bio-cards-list',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent implements OnInit {
  @Input() unitsList: Location[] = []

  constructor() { }

  ngOnInit(): void {
   console.log(this.unitsList)
  }

}
