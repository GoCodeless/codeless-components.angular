import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
    StylePadding,
    EditBlockElementItem
} from "../../../models/styles.model";

import { GridAlignment, GridStyle, GridModel } from "../appify-grid.component";
import { PageService } from "@platform-services/page/page.service";

@Component({
    selector: "appify-grid-cell-variation-000",
    templateUrl: "./grid-cell-variation-000.component.html",
    styleUrls: ["./grid-cell-variation-000.component.css"],
})
export class AppifyGridCellVariation000Component implements OnInit {
    @Input() isEditing: boolean = false;
    isEditingTitleValue: boolean = false;
    isEditingSubtitleValue: boolean = false;

    @Input() index: number = 0;
    @Input() alignment: GridAlignment = GridAlignment.left;
    @Input() style: GridStyle = new GridStyle();
    @Input() item: GridModel;
    @Input() zoom: boolean = false;

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();

    buttonPadding: StylePadding = new StylePadding();
    isUploadingImage: boolean = false;
    selectedIndex: number = -1;

    get gridAlignmentValue() {
        return GridAlignment;
    }

    constructor(public pageService: PageService) {}

    ngOnInit() {
        this.buttonPadding.top = 0;
        this.buttonPadding.bottom = 32;
        this.buttonPadding.left = 0;
        this.buttonPadding.right = 0;
    }

    select() {
        // [href]="item.button_url"
        if (this.isEditing) { return }
        window.open(this.item.button_url);
    }

    emitBlockSelect(index, type, value) {
        let item: EditBlockElementItem = new EditBlockElementItem();
        item.index = this.index;
        item.selectedType = type;
        item.value = value

        this.editBlockElement.emit(item);
    }

    editButtonText(event) {
        this.emitBlockSelect(this.index, 'button_text', event.value)
    }

    getHTMLFrom(value) {
        return value.replace(new RegExp('\n', 'g'), "<br />")
    }

    changeImage(index, event) {
        this.emitBlockSelect(index, 'image', event);
        this.isUploadingImage = false;
        this.selectedIndex = -1;
    }
}
