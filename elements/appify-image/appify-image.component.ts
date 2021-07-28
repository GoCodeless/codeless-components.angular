import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StyleFont, StylePadding } from "../../models/styles.model";

import { PageService } from "@platform-services/page/page.service";

export class EditBlockElementItem {
    identifier: string; // block identifier for `grid`
    index: number; // which grid item index is selected
    selectedType: string; // 'title', 'subtitle'
}

export enum ImageWidth {
    full = "full",
    margin = "margin",
}

export class ImageStyle {
    height: number;
    padding: StylePadding;
    background_size: string;
    corner_radius: string;
}

@Component({
    selector: "appify-image",
    templateUrl: "./appify-image.component.html",
    styleUrls: ["./appify-image.component.css"],
})
export class AppifyImageComponent implements OnInit {
    @Input() identifier: string = "";
    @Input() url: string = "";
    @Input() style: ImageStyle = new ImageStyle();
    @Input() width: ImageWidth = ImageWidth.full;

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();
    hoveringElement: string = null;
    hoveringIndex: number = 0;

    get imageWidthValue() {
        return ImageWidth;
    }

    constructor(public pageService: PageService) {}
    ngOnInit() {}

    emitBlockSelect(index, type) {
        let item: EditBlockElementItem = new EditBlockElementItem();
        item.identifier = this.identifier;
        item.index = index;
        item.selectedType = type;

        this.editBlockElement.emit(item);
    }
}
