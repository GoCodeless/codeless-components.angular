import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";

import { DomSanitizer } from "@angular/platform-browser";
import { PageService } from "@platform-services/page/page.service";
import {
    StyleButton,
    StyleFont,
    StylePadding,
    Animations,
    EditBlockElementItem
} from "../../models/styles.model";

export class GridModel {
    image: string;
    title: string;
    subtitle: string;
    button_title: string;
    button_url: string;
}

export enum GridWidth {
    full = "full",
    margin = "margin",
}

export enum GridAlignment {
    left = "left",
    center = "center",
    right = "right",
}

export class GridStyle {
    display: boolean;
    columns: number;
    alignment: string;
    vertical_alignment: string;
    width: string;
    title: StyleFont;
    subtitle: StyleFont;
    button: StyleButton;
    padding: StylePadding;
    margin: StylePadding;
    background_color: string;
    background_image: string;
    background_size: string;
    background_position: string;
    background_repeat: string;
    row_spacing: number;
    item_spacing: number;
    corner_radius: number;
}

@Component({
    selector: "appify-grid",
    templateUrl: "./appify-grid.component.html",
    styleUrls: [
        "./appify-grid.component.css",
        "./appify-grid.component.tablet.css",
        "./appify-grid.component.mobile.css",
    ],
})
export class AppifyGridComponent implements OnInit {
    @Input() isEditing: boolean = false;
    @Input() identifier: string = "";
    
    @Input() headline: String = "";
    @Input() subtitle: String = "";
    @Input() columns: number = 2;
    @Input() width: GridWidth = GridWidth.full;
    @Input() alignment: GridAlignment = GridAlignment.left;
    @Input() style: GridStyle = new GridStyle();
    @Input() items: Array<GridModel> = [];

    @Input() hoverAnimation: { type: string } = { type: Animations.none };
    @Input() animation: { type: string } = { type: Animations.none };

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();

    @ViewChild("animate") animateRef: ElementRef<HTMLElement>;

    buttonPadding: StylePadding = new StylePadding();

    temp = Array;
    math = Math;
    get gridWidthValue() {
        return GridWidth;
    }
    get gridAlignmentValue() {
        return GridAlignment;
    }

    constructor(
        public pageService: PageService,
        private sanitizer: DomSanitizer
    ) {}

    sanitize(val) {
        return this.sanitizer.bypassSecurityTrustStyle(val);
    }

    ngOnInit() {
        this.buttonPadding.top = 0;
        this.buttonPadding.bottom = 32;
        this.buttonPadding.left = 0;
        this.buttonPadding.right = 0;
        const animation = this.animation;
        if (animation && animation.type === Animations.none) {
            return;
        }

        const callbackFunc = (entries, _) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && animation) {
                    const element = entry.target.children[0].children;
                    for (let i = 0; i < element.length; i++) {
                        for (let j = 0; j < element[i].children.length; j++) {
                            element[i].children[j].children[0].classList.add(
                                Animations[animation.type]
                            );
                        }
                    }
                }
            });
        };

        let observer = new IntersectionObserver(callbackFunc);

        observer.observe(this.animateRef.nativeElement);
    }

    getColumns() {
        if (!this.columns || this.columns == 0) {
            return 1
        }

        return this.columns
    }

    getIndex(row, column) {
        if (row == 0) { return column }
        return row * this.columns + column
    }

    didSelectBlock(event) {
        event.identifier = this.identifier
        this.editBlockElement.emit(event);
    }
}
