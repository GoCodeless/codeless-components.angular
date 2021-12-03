
import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";
import {
    StyleFont,
    StylePadding,
    StyleMargin,
} from "../../models/styles.model";

export class DropdownModel {
    value: string;
}

export class DropdownStyle {
    background_color: string = "#fff";
    border_color: string = "#000";
    border_width: string = "1px";
    border_radius: string = "0px";
    padding: StylePadding = new StylePadding();
    margin: StyleMargin = new StyleMargin();
}

@Component({
    selector: "appify-dropdown",
    templateUrl: "./appify-dropdown.component.html",
    styleUrls: ["./appify-dropdown.component.css"],
})
export class AppifyDropdownComponent implements OnInit {
    @Input() textStyle: StyleFont = new StyleFont();
    @Input() style: DropdownStyle = new DropdownStyle();
    @Input() options: Array<string> = [];
    @Output() didSelectOption: EventEmitter<any> = new EventEmitter<any>();
    @Input() title: string = "Option";
    @Input() alignment:string = "center";
    @Input() spacing:number = 0;
    showOptions: boolean = false;

    selectedOption: string = "Select a Option";

    constructor() {}
    ngOnInit() {
        this.selectedOption = this.title;
    }
    selectOption(option) {
        this.selectedOption = option;
        this.showOptions = false;
        this.didSelectOption.emit(this.selectedOption);
    }
    toggleOptions() {
        this.showOptions = !this.showOptions;
    }
}
