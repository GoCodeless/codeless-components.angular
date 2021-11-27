import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'codeless-add-block-line',
  templateUrl: './codeless-add-block-line.component.html',
  styleUrls: ['./codeless-add-block-line.component.css']
})
export class CodelessAddBlockLineComponent implements OnInit {
    @Input() index: number = 0
    @Output() addBlockElement = new EventEmitter<number>();

    constructor() { }
    ngOnInit() { }
    ngOnChanges() { }

    didAddBlock() {
      this.addBlockElement.emit(this.index)
    }
}
