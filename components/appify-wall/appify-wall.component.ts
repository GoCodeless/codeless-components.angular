import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { Animations, EditBlockElementItem } from "../../models/styles.model";
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
    @Input() isEditing: boolean = false;
    @Input() identifier: string = "";
    @Input() height: number = 800;
    @Input() maxWidth: number = 800;
    @Input() alignment: WallAlignment = WallAlignment.left;
    @Input() items: Array<WallModel> = [];
    @Input() style: any = {};
    @Input() hoverAnimation: { type: string } = { type: "none" };
    @Input() animation: { type: string } = { type: "none" };

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();

    @ViewChild("animate") animateRef: ElementRef<HTMLElement>;

    isUploadingImage: boolean = false;
    selectedIndex: number = -1;

    /// Return the heroAlignment value computed in the component since enum is not
    /// accessible outside of this scope.
    get alignmentValue() {
        return WallAlignment;
    }

    constructor(private pageService:PageService) {}
    ngOnInit() {
        const animation = this.animation;
        if (animation && animation.type === Animations.none) {
            return;
        }

        const callbackFunc = (entries, _) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && animation) {
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
        if (this.isEditing) { return }
        window.open(url, "_blank");
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
}
