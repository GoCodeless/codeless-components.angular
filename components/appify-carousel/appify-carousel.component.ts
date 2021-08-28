import { Component, OnInit, Input } from '@angular/core';
import { StyleButton, StyleFont, StylePadding } from '../../models/styles.model'

import { PageService } from '@platform-services/page/page.service'

export class CarouselModel {
    image: string;
    title: string;
    subtitle: string;
    url: string;
}

export enum CarouselWidth {
    full = 'full',
    margin = 'margin'
}

export enum CarouselAlignment {
    left = 'left',
    center = 'center',
    right = 'right'
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
  selector: 'appify-carousel',
  templateUrl: './appify-carousel.component.html',
  styleUrls: ['./appify-carousel.component.css', './appify-carousel.component.tablet.css', './appify-carousel.component.mobile.css']
})
export class AppifyCarouselComponent implements OnInit {
    @Input() headline: String = ''
    @Input() subtitle: String = ''
    @Input() columns: Number = 2
    @Input() items: Array<CarouselModel> = []
    @Input() width: CarouselWidth = CarouselWidth.margin
    @Input() alignment: CarouselAlignment = CarouselAlignment.center
    @Input() style: CarouselStyle = new CarouselStyle()

    get carouselWidthValue() { return CarouselWidth; }
    get carouselAlignmentValue() { return CarouselAlignment; }

    constructor(public pageService: PageService) { }
    ngOnInit() { }
}
