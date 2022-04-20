import { StylesService } from "@platform-services/styles/styles.service";

import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { StylePadding, EditBlockElementItem } from "../../models/styles.model";

export class VerticalStackStyle {
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
  shadow_x: number;
  shadow_y: number;
  shadow_blur: number;
  shadow_color: string;
}

export enum VerticalStackWidth {
  full = "full",
  margin = "margin",
}

export enum Alignment {
  left = "left",
  center = "center",
  right = "right",
}

@Component({
  selector: 'appify-vertical-stack',
  templateUrl: './appify-vertical-stack.component.html',
  styleUrls: ['./appify-vertical-stack.component.css']
})
export class AppifyVerticalStackComponent implements OnInit {
    @Input() blocks: Array<any> = []
    @Input() isEditing: boolean = false
    @Input() identifier: string = ''
    @Input() platform: string = 'web'
    @Input() width: string = ''; //VerticalStackWidth = VerticalStackWidth.full;
    @Input() style: VerticalStackStyle = new VerticalStackStyle();
    @Input() screen_size: string = 'medium';
    @Input() alignment: Alignment = Alignment.center;

    @Output() addBlockElement = new EventEmitter<number>();
    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();

    
    get stackWidthValue() {
      return VerticalStackWidth;
    }

    constructor(private stylesService: StylesService) { }
    ngOnInit() { }
    ngOnChanges(changes: SimpleChanges) { }
    ngAfterContentChecked() { }

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

    renderAddBlockLine(index) {
      let previousBlock = this.blocks[index - 1]
      if (!previousBlock) { return false }
      
      if (index > 0 && previousBlock.type == 'appify-line') {
        return false
      }
      
      let block = this.blocks[index]
      if (!block || !block.properties || !block.properties.style) { return false }

      return this.isEditing && block.properties.style[this.screen_size]?.display
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

    getShadow() {
      let x = this.style?.shadow_x ? this.style?.shadow_x : 0
      let y = this.style?.shadow_y ? this.style?.shadow_y : 0
      let blur = this.style?.shadow_blur ? this.style?.shadow_blur : 0
      let color = this.style?.shadow_color ? this.style?.shadow_color : ''

      if (!color.length) { return '' }

      return x + 'px ' + y + 'px ' + blur + 'px ' + color
    }

    getStyle(block) {
        return this.stylesService.mergeDeep(block.properties.style['medium'], block.properties.style[this.screen_size])
    }
}
