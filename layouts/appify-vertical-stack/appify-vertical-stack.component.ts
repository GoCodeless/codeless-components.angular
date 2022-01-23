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
}

export enum VerticalStackWidth {
  full = "full",
  margin = "margin",
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
    @Input() width: VerticalStackWidth = VerticalStackWidth.full;
    @Input() style: VerticalStackStyle = new VerticalStackStyle();

    @Output() addBlockElement = new EventEmitter<number>();
    @Output() editBlockElement = new EventEmitter<EditBlockElementItem>();

    get stackWidthValue() {
      return VerticalStackWidth;
    }

    constructor() { }
    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {

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

    renderAddBlockLine(index) {
      if (index > 0 && this.blocks[index - 1]?.type == 'appify-line') {
        return false
      }
      
      let block = this.blocks[index]
      if (!block) { return false }

      return this.isEditing && block?.properties?.style[this.platform]?.display
    }

    getBackgroundLinearGradient() {
      if (this.style?.gradient_start_color) {
          return '-webkit-linear-gradient(' + this.style?.gradient_degrees + 'deg, ' + this.style?.gradient_start_color + ', ' + this.style?.gradient_end_color + ')'
      }

      return ''
  }
}
