import {
    Directive,
    ElementRef,
    OnInit,
    Renderer2
 } from "@angular/core";
import { setSyntheticLeadingComments } from "typescript";
 
 @Directive({
    selector: "[iframeAutoHeight]"
 })
 export class IframeAutoHeightDirective implements OnInit {
    private el: any;
    private renderer: Renderer2;
    private prevHeight: number;
    private sameCount: number;
 
    constructor(_elementRef: ElementRef, _renderer: Renderer2) {
       this.el = _elementRef.nativeElement;
       this.renderer = _renderer;
    }
 
    ngOnInit() {
       const self = this;
       if (this.el.tagName === "IFRAME") {
          this.renderer.listen(this.el, "load", () => {
             self.prevHeight = 0;
             self.sameCount = 0;
             setTimeout(() => {
                self.setHeight();
             }, 50);
          });
       }
    }
 
    setHeight() {
       console.log('autoheight iframe setHeight')
       const self = this;

       console.log('Flag 0A = ' + this.prevHeight)
       console.log('Flag 0B = ' + this.el.contentWindow.document.body.scrollHeight)

       if (this.el.contentWindow.document.body.scrollHeight !== this.prevHeight) {
          console.log('Flag 1')
          this.sameCount = 0;
          this.prevHeight = this.el.contentWindow.document.body.scrollHeight;
          this.el.contentWindow.document.body.scrollHeight == null ? this.renderer.removeStyle(self.el, "height") : this.renderer.setStyle(self.el, "height", this.el.contentWindow.document.body.scrollHeight + "px")
          console.log('Flag 2 = ' + this.prevHeight)
          console.log('Flag 3 = ' + this.el.contentWindow.document.body.scrollHeight)

          setTimeout(() => {
             self.setHeight();
          }, 50);
 
       } else {
          this.sameCount++;
          if (this.sameCount < 2) {
             setTimeout(() => {
                self.setHeight();
             }, 50);
          }
       }
    }
 }