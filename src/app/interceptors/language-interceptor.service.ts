import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';


export class LanguageInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const lang = localStorage.getItem('lang') || 'en';
    req = req.clone({
        setHeaders:{
            'Accept-Language': lang
        }
    })

    return next.handle(req);
  }
}
