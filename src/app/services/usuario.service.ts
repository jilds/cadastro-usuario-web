import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Usuario } from './usuario';
import { ConfigService } from './config.service';

@Injectable()
export class UsuarioService {

    private baseUrlService: string = '';
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http,
        private configService: ConfigService) {

        /** Definindo url do serviço rest */
        this.baseUrlService = configService.getUrlService() + '/usuario/';

        /** Add json no header */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    /** Consulta todos os usuario */
    getUsuarios() {
        return this.http.get(this.baseUrlService).map(res => res.json());
    }

    /** Add novo usuario */
    addUsuario(usuario: Usuario) {
        return this.http.post(this.baseUrlService, JSON.stringify(usuario), this.options)
            .map(res => res.json());
    }
    /** Exclui usuario */
    excluirUsuario(codigo: number) {
        return this.http.delete(this.baseUrlService + codigo).map(res => res.json());
    }

    /** Consulta usuario pelo codigo */
    getUsuario(codigo: number) {
        return this.http.get(this.baseUrlService + codigo).map(res => res.json());
    }

    /** Atualiza informações do usuario */
    atualizarUsuario(usuario: Usuario) {
        return this.http.put(this.baseUrlService, JSON.stringify(usuario), this.options)
            .map(res => res.json());
    }

}