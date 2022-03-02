import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";


export class LogginInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest <any>, next: HttpHandler){
        console.log('Outcoming request');
        return next.handle(req).pipe(
            tap(event=>{
                console.log(event);
                if(event.type === HttpEventType.Response){
                    console.log('Incoming response, body data:');
                    console.log(event.body);
                }
            })
        )
    }
}