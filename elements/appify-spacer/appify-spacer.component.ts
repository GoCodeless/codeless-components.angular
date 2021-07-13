import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EditBlockElementItem } from '../appify-image/appify-image.component'

@Component({
  selector: 'appify-spacer',
  templateUrl: './appify-spacer.component.html',
  styleUrls: ['./appify-spacer.component.css']
})
export class AppifySpacerComponent implements OnInit {
    @Input() identifier: string = ''
    @Input() space: number = 0

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();
    hoveringElement: string = null
    hoveringIndex: number = 0

    constructor() { }
    ngOnInit() { }

    emitBlockSelect(index, type) {
        let item: EditBlockElementItem = new EditBlockElementItem()
        item.identifier = this.identifier
        item.index = index
        item.selectedType = type

        this.editBlockElement.emit(item)
    }
}
