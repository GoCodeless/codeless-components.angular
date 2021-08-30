import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { StyleButton, StyleFont, StylePadding } from '../../models/styles.model'

import { PageService } from '@platform-services/page/page.service'

export enum FeatureAlignment {
    left = 'left',
    center = 'center',
    right = 'right'
}

export enum FeatureVerticalAlignment {
    top = 'top',
    middle = 'middle',
    bottom = 'bottom'
}

export enum FeatureWidth {
    full = 'full',
    margin = 'margin'
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
  selector: 'appify-feature',
  templateUrl: './appify-feature.component.html',
  styleUrls: ['./appify-feature.component.css', './appify-feature.component.tablet.css', './appify-feature.component.mobile.css']
})
export class AppifyFeatureComponent implements OnInit {
    @Input() featureAlignment: FeatureAlignment = FeatureAlignment.right
    @Input() verticalAlignment: FeatureVerticalAlignment = FeatureVerticalAlignment.middle
    @Input() imageURL: string = 'https://via.placeholder.com/400x400'
    @Input() title: string = 'Title'
    @Input() subtitle: string = 'Subtitle'
    @Input() body: string = 'Body'
    @Input() buttonText: string = 'Learn More'
    @Input() buttonURL: string = ''
    @Input() minimumHeight: number = 400
    @Input() width: FeatureWidth = FeatureWidth.full
    @Input() style: FeatureStyle = new FeatureStyle()

    buttonPadding: StylePadding = new StylePadding()

    /// Return the heroAlignment value computed in the component since enum is not
    /// accessible outside of this scope.
    get featureAlignmentValue() { return FeatureAlignment; }
    get featureVerticalAlignmentValue() { return FeatureVerticalAlignment; }
    get featureWidthValue() { return FeatureWidth; }

    constructor(public pageService: PageService) { }

    ngOnInit() {
        this.buttonPadding.top = 0
        this.buttonPadding.bottom = 32
        this.buttonPadding.left = 0
        this.buttonPadding.right = 0
    }

    clickButton() {
        window.open(this.buttonURL, '_blank');
    }
}
