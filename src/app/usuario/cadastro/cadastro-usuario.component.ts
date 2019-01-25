import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

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

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  /* inicializacao do componente */
  ngOnInit() {

    this.activatedRoute.params.subscribe(parametro => {
      console.log(parametro["codigo"]);
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

}