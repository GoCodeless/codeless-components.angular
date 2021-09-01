import { Component, OnInit, Input } from "@angular/core";
import {
    StyleButton,
    StyleFont,
    StylePadding,
} from "../../../models/styles.model";

import { GridAlignment, GridStyle, GridModel } from "../appify-grid.component";
import { PageService } from "@platform-services/page/page.service";

@Component({
    selector: "appify-grid-cell-variation-001",
    templateUrl: "./grid-cell-variation-001.component.html",
    styleUrls: ["./grid-cell-variation-001.component.css"],
})
export class AppifyGridCellVariation001Component implements OnInit {
    @Input() alignment: GridAlignment = GridAlignment.left;
    @Input() style: GridStyle = new GridStyle();
    @Input() item: GridModel;
    @Input() zoom: boolean = false;
    buttonPadding: StylePadding = new StylePadding();

    constructor(public pageService: PageService) {}

    ngOnInit() {
        this.buttonPadding.top = 0;
        this.buttonPadding.bottom = 32;
        this.buttonPadding.left = 0;
        this.buttonPadding.right = 0;
    }
}
