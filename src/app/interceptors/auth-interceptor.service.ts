import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";


export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest <any>, next: HttpHandler){
        console.log('Reqest is on its way!');
        return next.handle(req).pipe(
            tap(event=>{
                console.log(event);
                if(event.type === HttpEventType.Response){
                    console.log('Response arrived, body data:');
                    console.log(event.body);
                }
            })
        )
    }
}