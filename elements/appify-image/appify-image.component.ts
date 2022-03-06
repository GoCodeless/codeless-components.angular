import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { EditBlockElementItem, StylePadding } from "../../models/styles.model";

import { PageService } from "@platform-services/page/page.service";

export enum ImageWidth {
    full = "full",
    margin = "margin",
}

export class ImageStyle {
    height: number;
    padding: StylePadding;
    margin: StylePadding;
    background_size: string;
    corner_radius: number;
    alignment: string;
}

export enum Alignment {
    left = "left",
    center = "center",
    right = "right",
}

@Component({
    selector: "appify-image",
    templateUrl: "./appify-image.component.html",
    styleUrls: ["./appify-image.component.css"],
})
export class AppifyImageComponent implements OnInit {
    @Input() isEditing: boolean = false;
    @Input() identifier: string = "";
    @Input() url: string = "";
    @Input() style: ImageStyle = new ImageStyle();
    @Input() width: string = ''; //ImageWidth = ImageWidth.full;
    @Input() alignment: Alignment = Alignment.center;

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();
    hoveringElement: string = null;
    hoveringIndex: number = 0;

    isUploadingImage: boolean = false;

    get imageWidthValue() {
        return ImageWidth;
    }

    get alignmentValue() {
        return Alignment;
    }

    constructor(public pageService: PageService) {}
    ngOnInit() {}

    emitBlockSelect(index, type, value) {
        let item: EditBlockElementItem = new EditBlockElementItem();
        item.identifier = this.identifier;
        item.index = index;
        item.selectedType = type;
        item.value = value

        this.editBlockElement.emit(item);
    }

    changeImage(event) {
        this.emitBlockSelect(0, 'image', event);
        this.isUploadingImage = false
    }

    // getWidth() {
    //     let left = this.style?.margin?.left ? this.style?.margin?.left : 0
    //     let right = this.style?.margin?.right ? this.style?.margin?.right : 0
    //     return 'calc(100% - ' + (left + right) + 'px)' 
    // }

    getWidth() {
        var defaultWidth = '100%'

        if (this.width == 'auto' || this.width == 'auto') {
            return ''
        } else if (this.width?.includes('px')) {
            return this.width
        } else if (this.width?.includes('%')) {
            defaultWidth = this.width
        }

        let left = this.style?.margin?.left ? this.style?.margin?.left : 0
        let right = this.style?.margin?.right ? this.style?.margin?.right : 0
        return 'calc(' + defaultWidth + ' - ' + (left + right) + 'px)' 
    }

    getMarginLeft() {
        let left = this.style?.margin?.left ? this.style?.margin?.left : 0
        
        if (this.alignment == this.alignmentValue.right || this.alignment == this.alignmentValue.center) {
            return 'auto'
        }

        return left + 'px'
        // alignment == alignmentValue.right || alignment == alignmentValue.center ? 'auto' : 'unset'
    }

    getMarginRight() {
        let right = this.style?.margin?.right ? this.style?.margin?.right : 0
        
        if (this.alignment == this.alignmentValue.left || this.alignment == this.alignmentValue.center) {
            return 'auto'
        }

        return right + 'px'
        // alignment == alignmentValue.left || alignment == alignmentValue.center ? 'auto' : 'unset'
    }
}
