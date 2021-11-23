import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { EditBlockElementItem } from '../../models/styles.model'

@Component({
  selector: 'appify-vertical-stack',
  templateUrl: './appify-vertical-stack.component.html',
  styleUrls: ['./appify-vertical-stack.component.css']
})
export class AppifyVerticalStackComponent implements OnInit {
    @Input() blocks: Array<any> = []
    @Input() isEditing: boolean = false
    @Input() identifier: string = ''

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();

    constructor() { }
    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {

    }

    selectedBlockElement: any = null;
    didSelectBlock(event) {
        this.selectedBlockElement = event;
        this.editBlockElement.emit(event);
    }
}
