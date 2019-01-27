import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AparelhoService } from '../../services/aparelho.service';
import { PerfilService } from '../../services/perfil.service';
import { UsuarioService } from '../../services/usuario.service';

import { Aparelho } from '../../services/aparelho';
import { Perfil } from '../../services/perfil';
import { Usuario } from '../../services/usuario';

import { Response } from '../../services/response';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ["./cadastro-usuario.component.css"]
})
export class CadastroUsuarioComponent implements OnInit {

  private titulo: string;
  private usuario: Usuario = new Usuario();
  private perfis: Perfil[] = new Array();
  private perfilTeste: Perfil = new Perfil();
  perfilId: Number;
  private aparelhos: Aparelho[] = new Array();

  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private aparelhoService: AparelhoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  /* inicializacao do componente */
  ngOnInit() {

    this.perfilId = 2;

    /** Chama serviço de consulta para todos os perfis */
    this.perfilService.getPerfis().subscribe(res => this.perfis = res);

    /** Chama serviço de consulta para todos os aparelhos */
    this.aparelhoService.getAparelhos().subscribe(res => this.aparelhos = res);

    this.activatedRoute.params.subscribe(parametro => {
      if (parametro["codigo"] == undefined) {
        this.titulo = "Incluir Usuário";
      }
      else {
        this.titulo = "Editar Usuário";
        this.usuarioService.getUsuario(Number(parametro["codigo"])).subscribe(res => this.usuario = res);
      }
    });
  }

  /* Salva ou altera um registro existente */
  salvar(): void {
    console.log(this.usuario);
    /* salva um novo registro se não tem id */
    if (this.usuario.codigo == undefined) {

      /* Chama serviço para adicionar um usuario */
      this.usuarioService.addUsuario(this.usuario).subscribe(response => {

        // Response de retorno
        let res: Response = <Response>response;

        /* Mostra msg de sucesso e limpa formulario para inserir um novo registro */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.usuario = new Usuario();
        }
        else {
          /* MSG caso ocorra alguma exception no servidor (id = 0) */
          alert(res.mensagem);
        }
      },
        (erro) => {
          /** Erros não tratados
            Ex: Quando não consegue fazer um request*/
          alert(erro);
        });

    }
    else {

      /** Atualiza informações de registro existente */
      this.usuarioService.atualizarUsuario(this.usuario).subscribe(response => {

        //Response de retorno
        let res: Response = <Response>response;

        /* Mostra msg de sucesso e volta para a tela de consulta */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.router.navigate(['/consulta-usuario']);
        }
        else {
          /* MSG caso ocorra alguma exception no servidor (id = 0) */
          alert(res.mensagem);
        }
      },
        (erro) => {
          /** Erros não tratados
            Ex: Quando não consegue fazer um request*/
          alert(erro);
        });
    }
  }

  onPerfilSelected(val: any) {
    this.perfilTeste = val as Perfil;
    //this.perfilService.getPerfil(val).subscribe(res => this.usuario.perfis.a res);
    console.log(this.perfilTeste); //option value will be sent as event
  }

  onAparelhoSelected(event){
    console.log(event);
  }

}