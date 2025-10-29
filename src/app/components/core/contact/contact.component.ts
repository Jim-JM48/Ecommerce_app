import { ViewportScroller } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

@Component({
    selector: 'app-contact',
    imports: [],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css'
})
export class ContactComponent {
    private scroller = inject(ViewportScroller);

    show = signal(false);

    toggle() {    this.show.update((show) => !show)  }

    scrollAnimation() {
        if(this.scroller.getScrollPosition()[1] >= 1058) {
            this.show.set(true);
        }
    }

}
