import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([], { useHash: true, enableTracing: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
