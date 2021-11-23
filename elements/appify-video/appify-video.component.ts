import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EditBlockElementItem, StylePadding } from '../../models/styles.model'

export enum VideoWidth {
    full = 'full',
    margin = 'margin'
}

export class VideoStyle {
    height: number;
    padding: StylePadding;
}

export enum Alignment {
    left = 'left',
    center = 'center',
    right = 'right'
}

@Component({
  selector: 'appify-video',
  templateUrl: './appify-video.component.html',
  styleUrls: ['./appify-video.component.css']
})
export class AppifyVideoComponent implements OnInit {
    @Input() isEditing: boolean = false;
    @Input() identifier: string = ''
    @Input()
    set url(url: string) {
        if (url && url.length ==  0) { return }
        this.safeURL =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    @Input() alignment: Alignment = Alignment.center
    @Input() style: VideoStyle = new VideoStyle()
    @Input() width: VideoWidth = VideoWidth.margin

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();
    hoveringElement: string = null
    hoveringIndex: number = 0

    safeURL: SafeResourceUrl;
    get videoWidthValue() { return VideoWidth; }
    get alignmentValue() { return Alignment; }

    constructor(private sanitizer: DomSanitizer) { }
    ngOnInit() { }

    emitBlockSelect(index, type) {
        let item: EditBlockElementItem = new EditBlockElementItem()
        item.identifier = this.identifier
        item.index = index
        item.selectedType = type

        this.editBlockElement.emit(item)
    }
}
