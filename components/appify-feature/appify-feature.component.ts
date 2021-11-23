import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    ViewChild,
    ElementRef,
} from "@angular/core";
import {
    StyleButton,
    StyleFont,
    StylePadding,
    Animations,
    EditBlockElementItem
} from "../../models/styles.model";
import { DomSanitizer } from "@angular/platform-browser";

import { PageService } from "@platform-services/page/page.service";

export enum FeatureAlignment {
    left = "left",
    center = "center",
    right = "right",
}

export enum FeatureVerticalAlignment {
    top = "top",
    middle = "middle",
    bottom = "bottom",
}

export enum FeatureWidth {
    full = "full",
    margin = "margin",
}

export class FeatureStyle {
    background_color: string;
    heading: StyleFont;
    subtitle: StyleFont;
    paragraph: StyleFont;
    button: StyleButton;
    padding: StylePadding;
    background_image: string;
    background_size: string;
    background_position: string;
    background_repeat: string;
}

@Component({
    selector: "appify-feature",
    templateUrl: "./appify-feature.component.html",
    styleUrls: [
        "./appify-feature.component.css",
        "./appify-feature.component.tablet.css",
        "./appify-feature.component.mobile.css",
    ],
})
export class AppifyFeatureComponent implements OnInit {
    @Input() isEditing: boolean = false;
    isEditingHeadingValue: boolean = false;
    isEditingSubtitleValue: boolean = false;
    isEditingBodyValue: boolean = false;
    @Input() identifier: string = "";

    @Input() featureAlignment: FeatureAlignment = FeatureAlignment.right;
    @Input() verticalAlignment: FeatureVerticalAlignment =
        FeatureVerticalAlignment.middle;
    @Input() imageURL: string = "https://via.placeholder.com/400x400";
    @Input() title: string = "Title";
    @Input() subtitle: string = "Subtitle";
    @Input() body: string = "Body";
    @Input() buttonText: string = "Learn More";
    @Input() buttonURL: string = "";
    @Input() minimumHeight: number = 400;
    @Input() width: FeatureWidth = FeatureWidth.full;
    @Input() style: FeatureStyle = new FeatureStyle();
    @Input() animation: { type: string } = {
        type: "none",
    };

    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();

    @ViewChild("animate") animateRef: ElementRef<HTMLElement>;

    buttonPadding: StylePadding = new StylePadding();
    isUploadingImage: boolean = false;

    /// Return the heroAlignment value computed in the component since enum is not
    /// accessible outside of this scope.
    get featureAlignmentValue() {
        return FeatureAlignment;
    }
    get featureVerticalAlignmentValue() {
        return FeatureVerticalAlignment;
    }
    get featureWidthValue() {
        return FeatureWidth;
    }
    constructor(
        private sanitizer: DomSanitizer,
        public pageService: PageService
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

        const callbackFunc = (entries, _) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && animation) {
                    entry.target.classList.add(Animations[animation.type]);
                }
            });
        };

        let observer = new IntersectionObserver(callbackFunc);

        observer.observe(this.animateRef.nativeElement);
    }

    clickButton() {
        window.open(this.buttonURL, "_blank");
    }

    emitBlockSelect(index, type, value) {
        let item: EditBlockElementItem = new EditBlockElementItem();
        item.identifier = this.identifier;
        item.index = index;
        item.selectedType = type;
        item.value = value

        this.editBlockElement.emit(item);
    }

    getHTMLFrom(value) {
        return value.replace(new RegExp('\n', 'g'), "<br />")
    }

    changeImage(index, event) {
        this.emitBlockSelect(index, 'image', event);
        this.isUploadingImage = false;
    }
}
