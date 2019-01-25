import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Perfil } from './perfil';
import { ConfigService } from './config.service';

@Injectable()
export class PerfilService {

    private baseUrlService: string = '';
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http,
        private configService: ConfigService) {

        /** Definindo url do serviço rest */
        this.baseUrlService = configService.getUrlService() + '/perfil/';

        /** Add json no header */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    /** Consulta todos os perfil */
    getPerfis() {
        return this.http.get(this.baseUrlService).map(res => res.json());
    }

    /** Add novo perfil */
    addPerfil(perfil: Perfil) {
        return this.http.post(this.baseUrlService, JSON.stringify(perfil), this.options)
            .map(res => res.json());
    }
    /** Exclui perfil */
    excluirPerfil(codigo: number) {
        return this.http.delete(this.baseUrlService + codigo).map(res => res.json());
    }

    /** Consulta perfil pelo codigo */
    getPerfil(codigo: number) {
        return this.http.get(this.baseUrlService + codigo).map(res => res.json());
    }

    /** Atualiza informações do perfil */
    atualizarPerfil(perfil: Perfil) {
        return this.http.put(this.baseUrlService, JSON.stringify(perfil), this.options)
            .map(res => res.json());
    }

}