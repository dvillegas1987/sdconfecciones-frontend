import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@NgModule({
    imports:[
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MatMenuModule,
        MatTableModule,
        MatGridListModule,
        MatCardModule,
        MatSortModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatBadgeModule,
        MatTabsModule,
        MatDividerModule,
        MatListModule

    ],
    exports:[
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MatMenuModule,
        MatTableModule,
        MatGridListModule,
        MatCardModule,
        MatSortModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatBadgeModule,
        MatTabsModule,
        MatDividerModule,
        MatListModule

    ]
})
export class MaterialModule{

}