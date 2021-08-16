import {
    Component,
    OnInit,
    Input,
    SimpleChanges,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { CodelessComponentsService } from "../../services/codeless-components.service";
import {
    StyleButton,
    StyleFont,
    StylePadding,
} from "../../models/styles.model";

export enum SliderWidth {
    full = "full",
    margin = "margin",
}

export enum SliderAlignment {
    left = "left",
    center = "center",
    right = "right",
}

export enum SliderVerticalAlignment {
    top = "top",
    middle = "middle",
    bottom = "bottom",
}
export enum Animations {
    scrollUp = "scrollUp",
}
export class SliderModel {
    image: string;
    header: string;
    subtitle: string;
    button_text: string;
    button_url: string;
}

export class SliderStyle {
    headline: StyleFont;
    subtitle: StyleFont;
    button: StyleButton;
    padding: StylePadding;
    corner_radius: string;
}

@Component({
    selector: "appify-slider",
    templateUrl: "./appify-slider.component.html",
    styleUrls: [
        "./appify-slider.component.css",
        "./appify-slider.component.mobile.css",
    ],
})
export class AppifySliderComponent implements OnInit {
    @Input() alignment: SliderAlignment = SliderAlignment.left;
    @Input() verticalAlignment: SliderVerticalAlignment =
        SliderVerticalAlignment.middle;
    @Input() width: SliderWidth = SliderWidth.full;
    @Input() animation: Animations = Animations.scrollUp;
    @Input() items: Array<SliderModel> = [];
    @Input() style: SliderStyle = new SliderStyle();
    @ViewChild("animate") animateRef: ElementRef<HTMLElement>;

    headline: string = "";
    subtitle: string = "";
    buttonText: string = "";
    buttonURL: string = "";

    selectedImage: string = "";
    selectedIndex: number = 0;
    interval: any = null;
    intervalDuration: number = 6000;
    buttonPadding: StylePadding = new StylePadding();

    /// Return the heroAlignment value computed in the component since enum is not
    /// accessible outside of this scope.
    get sliderAlignmentValue() {
        return SliderAlignment;
    }
    get sliderVerticalAlignmentValue() {
        return SliderVerticalAlignment;
    }
    get sliderWidthValue() {
        return SliderWidth;
    }

    constructor(private codelessService: CodelessComponentsService) {
        this.setupView();
    }

    ngOnInit() {
        this.buttonPadding.top = 0;
        this.buttonPadding.bottom = 0;
        this.buttonPadding.left = 0;
        this.buttonPadding.right = 0;
        function callbackFunc(entries, _) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute("id", "isInViewport");
                }
            });
        }

        let observer = new IntersectionObserver(callbackFunc);

        observer.observe(this.animateRef.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.items && changes.items.currentValue) {
            this.updateView();
        }
    }

    clickButton() {
        this.codelessService.route(this.buttonURL);
    }

    setupView() {
        this.interval = setInterval(() => {
            this.naturalIncrement();
        }, this.intervalDuration);
        this.updateView();
    }

    updateView() {
        if (this.items.length > this.selectedIndex) {
            this.selectedImage = this.items[this.selectedIndex].image;
            this.headline = this.items[this.selectedIndex].header;
            this.subtitle = this.items[this.selectedIndex].subtitle;
            this.buttonText = this.items[this.selectedIndex].button_text;
            this.buttonURL = this.items[this.selectedIndex].button_url;
        }
    }

    selectIndex(index) {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.selectedIndex = index;
        this.setupView();
    }

    naturalIncrement() {
        this.selectedIndex++;

        if (this.selectedIndex > this.items.length - 1) {
            this.selectedIndex = 0;
        }

        this.updateView();
    }
}
