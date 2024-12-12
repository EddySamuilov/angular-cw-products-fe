import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

const { apiUrl } = environment
const API = '/api'

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const user = localStorage.getItem('user');
  const token = user ? JSON.parse(user).token : null;
  
  if(req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true
    })
  }
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
