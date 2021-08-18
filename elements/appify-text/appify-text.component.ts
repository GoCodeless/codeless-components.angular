import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
} from "@angular/core";

import { CodelessComponentsService } from "../../services/codeless-components.service";
import { StyleFont, StylePadding, Animations } from "../../models/styles.model";

import { EditBlockElementItem } from "../appify-image/appify-image.component";

export enum TextType {
    header = "header",
    body = "body",
}

export enum TextWidth {
    full = "full",
    margin = "margin",
}

export enum Alignment {
    left = "left",
    center = "center",
    right = "right",
}

export class TextStyle {
    padding: StylePadding;
    text: StyleFont;
    background_color: string;
}

@Component({
    selector: "appify-text",
    templateUrl: "./appify-text.component.html",
    styleUrls: ["./appify-text.component.css"],
})
export class AppifyTextComponent implements OnInit {
    @Input() identifier: string = "";
    @Input() text: String = "";
    @Input() textType: TextType = TextType.header;
    @Input() alignment: Alignment = Alignment.left;
    @Input() width: TextWidth = TextWidth.full;
    @Input() style: TextStyle = new TextStyle();
    @Input() animation: Animations = Animations.none;
    @ViewChild("animate") animateRef: ElementRef<HTMLElement>;
    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();
    hoveringElement: string = null;
    hoveringIndex: number = 0;

    /// Return the enum value computed in the component since enum is not
    /// accessible outside of this scope.
    get textTypeValue() {
        return TextType;
    }
    get textWidthValue() {
        return TextWidth;
    }
    get alignmentValue() {
        return Alignment;
    }

    constructor(public componentsService: CodelessComponentsService) {}
    ngOnInit() {
        const animation = this.animation;
        if (animation == Animations.none) {
            return;
        }

        function callbackFunc(entries, _) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animation);
                }
            });
        }

        let observer = new IntersectionObserver(callbackFunc);

        observer.observe(this.animateRef.nativeElement);
    }

    cleanPixelText(string) {
        return string.replace(/px/g, "");
    }

    emitBlockSelect(index, type) {
        let item: EditBlockElementItem = new EditBlockElementItem();
        item.identifier = this.identifier;
        item.index = index;
        item.selectedType = type;

        this.editBlockElement.emit(item);
    }
}
