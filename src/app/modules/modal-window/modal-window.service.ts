import { inject, Injectable, InjectionToken, Type } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
export const MODAL_WINDOW_SERVICE = new InjectionToken<IModelWindowService>('MODAL_WINDOW_SERVICE');

export interface IModelWindowService {
    openDialog(dialogClass: Type<any>, data: Record<string, any>): Promise<any>
}

@Injectable()
export class ModalWindowService implements IModelWindowService {
    readonly dialog = inject(MatDialog);
    openDialog(dialogClass: Type<any>, data: Record<string, any>): Promise<any> {
        const dialogRef = this.dialog.open(dialogClass, { data });

        return new Promise((resolve, reject) => {

            dialogRef.afterClosed().subscribe(result => {
                console.log('++ModalWindowService', result);
                resolve(result);
            });
        })

    }
}