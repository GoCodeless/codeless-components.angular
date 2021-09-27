import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Animations } from "../../models/styles.model";
import { PageService } from "@platform-services/page/page.service";
export enum WallAlignment {
    left = "left",
    right = "right",
}

export class WallModel {
    image: string;
    url: string;
}

@Component({
    selector: "appify-wall",
    templateUrl: "./appify-wall.component.html",
    styleUrls: [
        "./appify-wall.component.css",
        "./appify-wall.component.tablet.css",
        "./appify-wall.component.mobile.css",
    ],
})
export class AppifyWallComponent implements OnInit {
    @Input() height: number = 800;
    @Input() maxWidth: number = 800;
    @Input() alignment: WallAlignment = WallAlignment.left;
    @Input() items: Array<WallModel> = [];
    @Input() style: any = {};
    @Input() hoverAnimation: { type: string } = { type: "none" };
    @Input() animation: { type: string } = { type: "none" };
    @ViewChild("animate") animateRef: ElementRef<HTMLElement>;

    /// Return the heroAlignment value computed in the component since enum is not
    /// accessible outside of this scope.
    get alignmentValue() {
        return WallAlignment;
    }

    constructor(private pageService:PageService) {}
    ngOnInit() {
        const animation = this.animation;
        if (animation.type === Animations.none) {
            return;
        }

        const callbackFunc = (entries, _) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let element = entry.target.children[0].children[0].children;
                    for (let i = 0; i < element.length; i++) {
                        element[i].classList.add(Animations[animation.type]);
                    }
                    if (!entry.target.children[0].children[1].children.length) {
                        return;
                    }
                    for (
                        let i = 0;
                        i <
                        entry.target.children[0].children[1].children.length;
                        i++
                    ) {
                        entry.target.children[0].children[1].children[
                            i
                        ].classList.add(Animations[animation.type]);
                    }
                }
            });
        };

        let observer = new IntersectionObserver(callbackFunc);

        observer.observe(this.animateRef.nativeElement);
    }

    selectedItem(url) {
        window.open(url, "_blank");
    }
}
