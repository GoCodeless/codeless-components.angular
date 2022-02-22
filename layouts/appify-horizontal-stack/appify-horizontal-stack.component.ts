import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { StylePadding, EditBlockElementItem } from "../../models/styles.model";

export class HorizontalStackStyle {
  padding: StylePadding;
  margin: StylePadding;
  background_color: string;
  background_image: string;
  background_size: string;
  background_position: string;
  background_repeat: string;
  gradient_start_color: string;
  gradient_end_color: string;
  gradient_degrees: number;
  corner_radius: number;
  vertical_alignment: string;
}

export enum HorizontalStackWidth {
  full = "full",
  margin = "margin",
}

export enum HorizontalStackDistribution {
  auto = "auto",
  fill = "fill",
  wrap = "wrap",
  scroll = "scroll"
}

@Component({
  selector: 'appify-horizontal-stack',
  templateUrl: './appify-horizontal-stack.component.html',
  styleUrls: ['./appify-horizontal-stack.component.css']
})
export class AppifyHorizontalStackComponent implements OnInit {
    @Input() blocks: Array<any> = []
    @Input() isEditing: boolean = false
    @Input() identifier: string = ''
    @Input() platform: string = 'web'
    @Input() width: HorizontalStackWidth = HorizontalStackWidth.full;
    @Input() distribution: HorizontalStackDistribution = HorizontalStackDistribution.auto;
    @Input() style: HorizontalStackStyle = new HorizontalStackStyle();
    
    @Output() addBlockElement = new EventEmitter<number>();
    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();
  
    get stackWidthValue() {
      return HorizontalStackWidth;
    }

    get stackDistribution() {
      return HorizontalStackDistribution;
    }

    constructor() { }
    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {

    }

    getElementWidth(block) {
        if (block.properties.style?.[this.platform].width) {
          return block.properties.style?.[this.platform].width
        }

        return 100 / this.blocks.length + '%'
    }

    selectedBlockElement: any = null;
    didSelectBlock(event) {
        this.selectedBlockElement = event;
        this.editBlockElement.emit(event);
    }

    didAddBlock(index) {
      this.addBlockElement.emit(index)
    }

    getPlatform() {
      return this.platform
    }

    getBackgroundLinearGradient() {
      let style = this.style
      let gradientStartColor = style.gradient_start_color
      let gradientEndColor = style.gradient_end_color
      let gradientDegrees = style.gradient_degrees ? style.gradient_degrees : 0

      if (gradientStartColor && gradientEndColor) {
          return '-webkit-linear-gradient(' + gradientDegrees + 'deg, ' + gradientStartColor + ', ' + gradientEndColor + ')'
      }

      return ''
  }
}
