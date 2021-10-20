import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EditBlockElementItem } from '../appify-image/appify-image.component'

export enum LineAlignment {
    left = 'left',
    center = 'center',
    right = 'right'
}

@Component({
  selector: 'appify-line',
  templateUrl: './appify-line.component.html',
  styleUrls: ['./appify-line.component.css']
})
export class AppifyLineComponent implements OnInit {
    @Input() isEditing: boolean = false;
    @Input() identifier: string = ''
    @Input() height: number = 1
    @Input() widthPercent: number = 100
    @Input() color: string = 'black'

    // FIXME: Currently unsupported, needs to be added.
    @Input() alignment: LineAlignment = LineAlignment.center

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();
    hoveringElement: string = null
    hoveringIndex: number = 0

    /// Return the enum value computed in the component since enum is not
    /// accessible outside of this scope.
    get alignmentValue() { return LineAlignment; }

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
