import { Component, OnInit, Input } from "@angular/core";
import {
    StyleButton,
    StyleFont,
    StylePadding,
} from "../../../models/styles.model";

import { GridAlignment, GridStyle, GridModel } from "../appify-grid.component";

@Component({
    selector: "appify-grid-cell-variation-000",
    templateUrl: "./grid-cell-variation-000.component.html",
    styleUrls: ["./grid-cell-variation-000.component.css"],
})
export class AppifyGridCellVariation000Component implements OnInit {
    @Input() alignment: GridAlignment = GridAlignment.left;
    @Input() style: GridStyle = new GridStyle();
    @Input() item: GridModel;

    buttonPadding: StylePadding = new StylePadding();

    constructor() {}

    ngOnInit() {
        this.buttonPadding.top = 0;
        this.buttonPadding.bottom = 32;
        this.buttonPadding.left = 0;
        this.buttonPadding.right = 0;
    }
}
