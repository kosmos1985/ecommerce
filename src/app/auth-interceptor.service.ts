import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest <any>, next: HttpHandler){
        console.log('Reqest is on its way!');
        return next.handle(req)
    }
}