import { Component, HostBinding, inject, input, OnInit } from "@angular/core";
import { BLOCK_PAGE_WIDTH } from "../block-pages/block-pages.component";

@Component({
    selector: 'block-page',
    standalone: true,
    template: `
   <ng-content/>
  `,
    styleUrl: 'block-page.component.scss',
    imports: [],
    host: { class: "block-page" }
})
export class BlockPageComponent {
    @HostBinding('style.width') viewWidth = inject(BLOCK_PAGE_WIDTH) + 'px'
}