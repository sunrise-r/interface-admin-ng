import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { mainRoute } from './main/main.route';

const LAYOUT_ROUTES = [mainRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
          <Routes>[
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: false }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
