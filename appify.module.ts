import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

// Services
import { CodelessComponentsService } from "./services/codeless-components.service";

// Directives
import { TextareaAutoresizeDirective } from "./directives/textarea-autoresize.directive";

// Internal Components
import { CodelessReplaceImageButton } from "./components/codeless-replace-image-button/codeless-replace-image-button.component";
import { CodelessLoadingView } from "./components/codeless-loading-view/codeless-loading-view.component";
import { CodelessAddBlockLineComponent } from "./components/codeless-add-block-line/codeless-add-block-line.component";

// Elements
import { AppifyButtonComponent } from "./elements/appify-button/appify-button.component";
import { AppifyImageComponent } from "./elements/appify-image/appify-image.component";
import { AppifyLineComponent } from "./elements/appify-line/appify-line.component";
import { AppifySpacerComponent } from "./elements/appify-spacer/appify-spacer.component";
import { AppifyTextComponent } from "./elements/appify-text/appify-text.component";
import { AppifyVideoComponent } from "./elements/appify-video/appify-video.component";
import { AppifyIndicatorsComponent } from "./elements/appify-indicators/appify-indicators.component";

// Navigation
import { AppifyNavigationHeaderComponent } from "./navigation/appify-navigation-header/appify-navigation-header.component";
import { AppifyNavigationFooterComponent } from "./navigation/appify-navigation-footer/appify-navigation-footer.component";

// Components
import { AppifyCarouselComponent } from "./components/appify-carousel/appify-carousel.component";
import { AppifyCtaComponent } from "./components/appify-cta/appify-cta.component";
import { AppifyFeatureComponent } from "./components/appify-feature/appify-feature.component";
import { AppifyFormComponent } from "./components/appify-form/appify-form.component";
import { AppifyGridComponent } from "./components/appify-grid/appify-grid.component";
import { AppifyGridCellVariation000Component } from "./components/appify-grid/cell-variation-000/grid-cell-variation-000.component";
import { AppifyGridCellVariation001Component } from "./components/appify-grid/cell-variation-001/grid-cell-variation-001.component";
import { AppifyGridCellVariation002Component } from "./components/appify-grid/cell-variation-002/grid-cell-variation-002.component";
import { AppifyListComponent } from "./components/appify-list/appify-list.component";
import { AppifyNewsletterComponent } from "./components/appify-newsletter/appify-newsletter.component";
import { AppifySliderComponent } from "./components/appify-slider/appify-slider.component";
import { AppifyTestimonialComponent } from "./components/appify-testimonial/appify-testimonial.component";
import { AppifyWallComponent } from "./components/appify-wall/appify-wall.component";
import { AppifyDropdownComponent } from "./components/appify-dropdown/appify-dropdown.component";

// Layouts
import { AppifyHorizontalStackComponent } from "./layouts/appify-horizontal-stack/appify-horizontal-stack.component";
import { AppifyVerticalStackComponent } from "./layouts/appify-vertical-stack/appify-vertical-stack.component";

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [
        AppifyButtonComponent,
        AppifyImageComponent,
        AppifyLineComponent,
        AppifySpacerComponent,
        AppifyTextComponent,
        AppifyVideoComponent,
        AppifyNavigationHeaderComponent,
        AppifyNavigationFooterComponent,
        AppifyCtaComponent,
        AppifyFeatureComponent,
        AppifyGridComponent,
        AppifyDropdownComponent,
        AppifyGridCellVariation000Component,
        AppifyGridCellVariation001Component,
        AppifyGridCellVariation002Component,
        AppifyNavigationHeaderComponent,
        AppifyNavigationFooterComponent,
        AppifyImageComponent,
        AppifyVideoComponent,
        AppifyTextComponent,
        AppifySpacerComponent,
        AppifyListComponent,
        AppifyNewsletterComponent,
        AppifyCarouselComponent,
        AppifyFormComponent,
        AppifySliderComponent,
        AppifyTestimonialComponent,
        AppifyWallComponent,
        AppifyIndicatorsComponent,
        AppifyHorizontalStackComponent,
        AppifyVerticalStackComponent,

        TextareaAutoresizeDirective,
        
        CodelessReplaceImageButton,
        CodelessLoadingView,
        CodelessAddBlockLineComponent
    ],
    providers: [CodelessComponentsService],

    exports: [
        AppifyButtonComponent,
        AppifyImageComponent,
        AppifyLineComponent,
        AppifySpacerComponent,
        AppifyTextComponent,
        AppifyVideoComponent,
        AppifyNavigationHeaderComponent,
        AppifyNavigationFooterComponent,
        AppifyCarouselComponent,
        AppifyCtaComponent,
        AppifyFeatureComponent,
        AppifyFormComponent,
        AppifyGridComponent,
        AppifyDropdownComponent,
        AppifyIndicatorsComponent,
        AppifyListComponent,
        AppifyNewsletterComponent,
        AppifySliderComponent,
        AppifyTestimonialComponent,
        AppifyWallComponent,
        AppifyHorizontalStackComponent,
        AppifyVerticalStackComponent,

        TextareaAutoresizeDirective,

        CodelessReplaceImageButton,
        CodelessLoadingView,
        CodelessAddBlockLineComponent
    ],
    entryComponents: [],
})
export class AppifyModule {}
