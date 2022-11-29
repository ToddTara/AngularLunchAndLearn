import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnChanges {
  @Input() productCount: number;
  @Output() productCountEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes?.['productCount'].firstChange) {
      this.productCountEmitter.emit(true);
    }
  }
}
