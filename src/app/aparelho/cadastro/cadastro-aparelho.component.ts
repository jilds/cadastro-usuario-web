import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AparelhoService } from '../../services/aparelho.service';

import { Aparelho } from '../../services/aparelho';

import { Response } from '../../services/response';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cadastro-aparelho',
  templateUrl: './cadastro-aparelho.component.html',
  styleUrls: ["./cadastro-aparelho.component.css"]
})
export class CadastroAparelhoComponent implements OnInit {

  private titulo: string;
  private aparelho: Aparelho = new Aparelho();

  constructor(private aparelhoService: AparelhoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  /* inicializacao do componente */
  ngOnInit() {

    this.activatedRoute.params.subscribe(parametro => {
      console.log(parametro["codigo"]);
      if (parametro["codigo"] == undefined) {

        this.titulo = "Incluir Aparelho";
      }
      else {
        this.titulo = "Editar Aparelho";
        this.aparelhoService.getAparelho(Number(parametro["codigo"])).subscribe(res => this.aparelho = res);
      }


    });
  }

  /* Salva ou altera um registro existente */
  salvar(): void {

    /* salva um novo registro se não tem id */
    if (this.aparelho.codigo == undefined) {

      /* Chama serviço para adicionar um aparelho */
      this.aparelhoService.addAparelho(this.aparelho).subscribe(response => {

        // Response de retorno
        let res: Response = <Response>response;

        /* Mostra msg de sucesso e limpa formulario para inserir um novo registro */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.aparelho = new Aparelho();
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
      this.aparelhoService.atualizarAparelho(this.aparelho).subscribe(response => {

        //Response de retorno
        let res: Response = <Response>response;

        /* Mostra msg de sucesso e volta para a tela de consulta */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.router.navigate(['/consulta-aparelho']);
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