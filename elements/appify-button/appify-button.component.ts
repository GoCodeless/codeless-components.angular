import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
} from "@angular/core";
import { EditBlockElementItem, StyleButton, StylePadding } from "../../models/styles.model";

export enum ButtonType {
    square = "square",
    rounded = "rounded",
}

export enum ButtonFillType {
    none = "none",
    filled = "filled",
    border = "border",
}

export enum ButtonContainerWidth {
    full = "full",
    margin = "margin",
}

export enum Alignment {
    left = "left",
    center = "center",
    right = "right",
}

@Component({
    selector: "appify-button",
    templateUrl: "./appify-button.component.html",
    styleUrls: ["./appify-button.component.css"],
})
export class AppifyButtonComponent implements OnInit {
    @Input() isEditing: boolean = false;
    isEditingValue: boolean = false;
    @Input() identifier: string = "";

    @Input() title: String = "";
    @Input() url: string = "";
    @Input() alignment: Alignment = Alignment.center;
    @Input() width: ButtonContainerWidth = ButtonContainerWidth.full;
    @Input() padding: StylePadding = new StylePadding();
    @Input() style: StyleButton = new StyleButton();

    @Output() didClick = new EventEmitter<any>();
    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();

    hoveringElement: string = null;
    hoveringIndex: number = 0;

    isHovering: boolean = false;
    objectKeys = Object.keys;

    /// Return the enum value computed in the component since enum is not
    /// accessible outside of this scope.
    get buttonTypeValue() {
        return ButtonType;
    }
    get buttonFillTypeValue() {
        return ButtonFillType;
    }
    get containerWidthValue() {
        return ButtonContainerWidth;
    }
    get alignmentValue() {
        return Alignment;
    }

    constructor() {}
    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.style && changes.style.currentValue) {
            let current = changes.style.currentValue;

            // if (current.type) { this.style.type = current.type }
            if (current.fill_type) {
                this.style.fill_type = current.fill_type;
            }
            if (current.normal_state) {
                this.style.normal_state.color = current.normal_state.color;
            }
            if (current.normal_state) {
                this.style.normal_state.text_color =
                    current.normal_state.text_color;
            }
            if (current.hover_state) {
                this.style.hover_state.color = current.hover_state.color;
            }
            if (current.hover_state) {
                this.style.hover_state.text_color =
                    current.hover_state.text_color;
            }
        }
    }

    backgroundColor() {
        if (this.style == null) {
            return "";
        }
        if (this.style.normal_state == null) {
            return "";
        }
        if (this.style.hover_state == null) {
            return "";
        }

        if (this.isHovering) {
            return this.style.hover_state.color;
        } else {
            if (
                this.style.fill_type == this.buttonFillTypeValue.border ||
                this.style.fill_type == this.buttonFillTypeValue.none
            ) {
                return "transparent";
            }
            if (this.style.normal_state && this.style.normal_state.color) {
                return this.style.normal_state.color;
            }
        }

        return "";
    }

    borderColor() {
        if (this.style == null) {
            return "";
        }
        if (this.style.normal_state == null) {
            return "";
        }

        if (this.style.fill_type == this.buttonFillTypeValue.border) {
            return this.style.normal_state.color;
        }
        return "transparent";
    }

    color() {
        if (this.style == null) {
            return "";
        }
        if (this.style.normal_state == null) {
            return "";
        }
        if (this.style.hover_state == null) {
            return "";
        }

        if (this.isHovering) {
            return this.style.hover_state.text_color;
        }
        return this.style.normal_state.text_color;
    }

    click() {
        if (this.url.length > 0) {
            this.url.includes("tel") || this.url.includes("mailto")
                ? window.open(this.url, "_blank")
                : (window.location.href = this.url);
            return;
        }

        this.didClick.emit();
    }

    emitBlockSelect(index, type, value) {
        let item: EditBlockElementItem = new EditBlockElementItem();
        item.identifier = this.identifier;
        item.index = index;
        item.selectedType = type;
        item.value = value

        this.editBlockElement.emit(item);
    }
}
