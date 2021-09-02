import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Animations } from "../../models/styles.model";
import {
    StyleButton,
    StyleFont,
    StylePadding,
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

    @ViewChild("animate") animateRef: ElementRef<HTMLElement>;

    get carouselWidthValue() {
        return CarouselWidth;
    }
    get carouselAlignmentValue() {
        return CarouselAlignment;
    }

    constructor(private sanitizer: DomSanitizer) {}
    sanitize(val) {
        return this.sanitizer.bypassSecurityTrustStyle(val);
    }
    ngOnInit() {
        const animation = this.animation;

        const callbackFunc = (entries, _) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
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
}
