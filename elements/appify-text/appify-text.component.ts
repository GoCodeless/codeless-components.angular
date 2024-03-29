import {
    Component,
    OnInit,
    Input,
    Inject,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

import { CodelessComponentsService } from "../../services/codeless-components.service";
import { StyleFont, StylePadding, Animations, EditBlockElementItem } from "../../models/styles.model";

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
    margin: StylePadding;
    text: StyleFont;
    background_color: string;
    gradient_start_color: string;
    gradient_end_color: string;
    gradient_degrees: number;
}

@Component({
    selector: "appify-text",
    templateUrl: "./appify-text.component.html",
    styleUrls: ["./appify-text.component.css"],
})
export class AppifyTextComponent implements OnInit {
    @Input() isEditing: boolean = false;
    isEditingValue: boolean = false;

    @Input() identifier: string = "";
    @Input() text: String = "";
    @Input() url: string = "";
    @Input() textType: TextType = TextType.header;
    @Input() alignment: Alignment = Alignment.left;
    @Input() width: string = ''; //TextWidth = TextWidth.full;
    @Input() style: TextStyle = new TextStyle();

    @Input() animation: { type: string } = { type: Animations.none };

    @ViewChild("animate") animateRef: ElementRef<HTMLElement>;
    @ViewChild("editingTextField") editingTextField: ElementRef;
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

    constructor(
        public componentsService: CodelessComponentsService,
        @Inject(DOCUMENT) private document: Document,
        private router: Router) {}
    ngOnInit() {
        const animation = this.animation;

        if (animation && animation.type == Animations.none) {
            return;
        }

        function callbackFunc(entries, _) {
            entries.forEach((entry) => {
                if (entry.isIntersecting && animation) {
                    entry.target.classList.add(Animations[animation.type]);
                }
            });
        }

        let observer = new IntersectionObserver(callbackFunc);

        observer.observe(this.animateRef.nativeElement);
    }

    didClick() {
        if (this.url.startsWith('www') || this.url.startsWith('http')) {
            // External routing
            this.document.location.href = this.url
        } else {
            // Internal routing
            this.router.navigate([this.url]);
        }
    }

    cleanPixelText(string) {
        return string.replace(/px/g, "");
    }

    getLineHeight() {
        if (!this.style || !this.style.text || !this.style.text.line_height) {
            return;
        }
        let height: string = this.style.text.line_height
            ? this.style.text.line_height + ""
            : "";

        if (!height.includes("px") && height.length > 0) {
            height += "px";
        }

        return height;
    }

    getFontSize() {
        if (!this.style || !this.style.text || !this.style.text.size) {
            return;
        }
        let size: string = this.style.text.size
            ? this.style.text.size + ""
            : "";

        if (!size.includes("px") && size.length > 0) {
            size += "px";
        }

        return size;
    }

    getBackgroundLinearGradient() {
        let style = this.style
        if (style == null) { return 'transparent' }

        let gradientStartColor = style.gradient_start_color ? style.gradient_start_color : null
        let gradientEndColor = style.gradient_end_color ? style.gradient_end_color : null
        let gradientDegrees = style.gradient_degrees ? style.gradient_degrees : 0

        if (gradientStartColor && gradientEndColor) {
            return '-webkit-linear-gradient(' + gradientDegrees + 'deg, ' + gradientStartColor + ', ' + gradientEndColor + ')'
        }

        return 'transparent'
    }

    getLinearGradient() {
        let style = this.style?.text
        if (style == null) { return 'transparent' }
        
        let gradientStartColor = style.gradient_start_color ? style.gradient_start_color : null
        let gradientEndColor = style.gradient_end_color ? style.gradient_end_color : null
        let gradientDegrees = style.gradient_degrees ? style.gradient_degrees : 0

        if (gradientStartColor && gradientEndColor) {
            return '-webkit-linear-gradient(' + gradientDegrees + 'deg, ' + gradientStartColor + ', ' + gradientEndColor + ')'
        }

        return 'transparent'
    }

    emitBlockSelect(index, type, value) {
        console.log('emitBlockSelect 1: ', index)
        console.log('emitBlockSelect 2: ', type)
        console.log('emitBlockSelect 3: ', value)

        if (this.editingTextField.nativeElement == document.activeElement) {
            console.log('Flag 1')
            this.text = this.editingTextField.nativeElement.innerHTML
        }

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

    shouldStopEditingTextField: boolean = false;
    stopEditing() {
        this.shouldStopEditingTextField = true;

        setTimeout(() => {
            if (this.editingTextField.nativeElement == document.activeElement) {
            
            } else {
                this.shouldStopEditingTextField = false;
                this.isEditingValue = false;
            }
        }, 500);
    }

    focusEditingTextField() {
        this.editingTextField.nativeElement.focus();
    }

    // getWidth() {
    //     let left = this.style?.margin?.left ? this.style?.margin?.left : 0
    //     let right = this.style?.margin?.right ? this.style?.margin?.right : 0
    //     return 'calc(100% - ' + (left + right) + 'px)' 
    // }

    getWidth() {
        var defaultWidth = '100%'

        if (this.width == 'auto' || this.width == 'auto') {
            return ''
        } else if (this.width?.includes('px')) {
            return this.width
        } else if (this.width?.includes('%')) {
            defaultWidth = this.width
        }

        let left = this.style?.margin?.left ? this.style?.margin?.left : 0
        let right = this.style?.margin?.right ? this.style?.margin?.right : 0
        return 'calc(' + defaultWidth + ' - ' + (left + right) + 'px)' 
    }
}
