import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { PerfilService } from '../../services/perfil.service';

import { Perfil } from '../../services/perfil';

import { Response } from '../../services/response';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cadastro-perfil',
  templateUrl: './cadastro-perfil.component.html',
  styleUrls: ["./cadastro-perfil.component.css"]
})
export class CadastroPerfilComponent implements OnInit {

  private titulo: string;
  private perfil: Perfil = new Perfil();

  constructor(private perfilService: PerfilService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  /* inicializacao do componente */
  ngOnInit() {

    this.activatedRoute.params.subscribe(parametro => {
      console.log(parametro["codigo"]);
      if (parametro["codigo"] == undefined) {

        this.titulo = "Incluir de Perfil";
      }
      else {
        this.titulo = "Editar Perfil";
        this.perfilService.getPerfil(Number(parametro["codigo"])).subscribe(res => this.perfil = res);
      }


    });
  }

  /* Salva ou altera um registro existente */
  salvar(): void {

    /* salva um novo registro se não tem id */
    if (this.perfil.codigo == undefined) {

      /* Chama serviço para adicionar um perfil */
      this.perfilService.addPerfil(this.perfil).subscribe(response => {

        // Response de retorno
        let res: Response = <Response>response;

        /* Mostra msg de sucesso e limpa formulario para inserir um novo registro */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.perfil = new Perfil();
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
      this.perfilService.atualizarPerfil(this.perfil).subscribe(response => {

        //Response de retorno
        let res: Response = <Response>response;

        /* Mostra msg de sucesso e volta para a tela de consulta */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.router.navigate(['/consulta-perfil']);
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