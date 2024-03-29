import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Animations } from "../../models/styles.model";
import {
    StyleButton,
    StyleFont,
    StylePadding,
    EditBlockElementItem
} from "../../models/styles.model";

import { PageService } from "@platform-services/page/page.service";

export class CarouselModel {
    image: string;
    title: string;
    subtitle: string;
    url: string;
}

export enum CarouselWidth {
    full = "full",
    margin = "margin",
}

export enum CarouselAlignment {
    left = "left",
    center = "center",
    right = "right",
}

export class CarouselStyle {
    background_color: string;
    title: StyleFont;
    subtitle: StyleFont;
    padding: StylePadding;
    margin: StylePadding;
    background_image: string;
    background_size: string;
    background_position: string;
}

@Component({
    selector: "appify-carousel",
    templateUrl: "./appify-carousel.component.html",
    styleUrls: [
        "./appify-carousel.component.css",
        "./appify-carousel.component.tablet.css",
        "./appify-carousel.component.mobile.css",
    ],
})
export class AppifyCarouselComponent implements OnInit {
    @Input() isEditing: boolean = false;
    isEditingTitleValueIndex: number = -1;
    isEditingSubtitleValueIndex: number = -1;
    @Input() identifier: string = "";

    @Input() headline: String = "";
    @Input() subtitle: String = "";
    @Input() columns: Number = 2;
    @Input() items: Array<CarouselModel> = [];
    @Input() width: CarouselWidth = CarouselWidth.margin;
    @Input() alignment: CarouselAlignment = CarouselAlignment.center;
    @Input() style: CarouselStyle = new CarouselStyle();
    @Input() animation: { type: string } = {
        type: "none",
    };

    @Input() hoverAnimation: { type: string } = {
        type: "none",
    };

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();

    @ViewChild("animate", {static: true, read: ElementRef}) animateRef: ElementRef<HTMLElement>;

    isUploadingImage: boolean = false;
    selectedIndex: number = -1;

    get carouselWidthValue() {
        return CarouselWidth;
    }
    get carouselAlignmentValue() {
        return CarouselAlignment;
    }

    constructor(
        private sanitizer: DomSanitizer,
        private pageService: PageService
    ) {}
    sanitize(val) {
        return this.sanitizer.bypassSecurityTrustStyle(val);
    }

    ngOnInit() {
        const animation = this.animation;

        const callbackFunc = (entries, _) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && animation) {
                    const element =
                        entry.target.children[0].children[0].children;
                    for (let i = 0; i < element.length; i++) {
                        element[i].classList.add(Animations[animation.type]);
                    }
                }
            });
        };

        let observer = new IntersectionObserver(callbackFunc);

        observer.observe(this.animateRef.nativeElement);
    }

    emitBlockSelect(index, type, value) {
        let item: EditBlockElementItem = new EditBlockElementItem();
        item.identifier = this.identifier;
        item.index = index;
        item.selectedType = type;
        item.value = value

        this.editBlockElement.emit(item);
    }

    changeImage(index, event) {
        this.emitBlockSelect(index, 'image', event);
        this.isUploadingImage = false;
        this.selectedIndex = -1;
    }

    getWidth() {
        let left = this.style?.margin?.left ? this.style?.margin?.left : 0
        let right = this.style?.margin?.right ? this.style?.margin?.right : 0
        return 'calc(100% - ' + (left + right) + 'px)' 
    }
}
