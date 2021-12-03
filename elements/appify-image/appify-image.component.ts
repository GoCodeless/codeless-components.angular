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
    background_size: string;
    corner_radius: number;
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
    @Input() width: ImageWidth = ImageWidth.full;

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();
    hoveringElement: string = null;
    hoveringIndex: number = 0;

    isUploadingImage: boolean = false;

    get imageWidthValue() {
        return ImageWidth;
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
}
