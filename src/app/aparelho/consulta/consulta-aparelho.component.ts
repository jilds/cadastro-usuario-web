import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AparelhoService } from '../../services/aparelho.service';

import { Aparelho } from '../../services/aparelho';

import { Response } from '../../services/response';

@Component({
  selector: 'app-consulta-aparelho',
  templateUrl: './consulta-aparelho.component.html',
  styleUrls: ["./consulta-aparelho.component.css"]
})
export class ConsultaAparelhoComponent implements OnInit {

  private aparelhos: Aparelho[] = new Array();
  private titulo: string;

  constructor(private aparelhoService: AparelhoService,
    private router: Router) { }

  /* inicializacao do componente */
  ngOnInit() {

    this.titulo = "Registros Cadastrados";

    /** Chama serviço de consulta para todos os aparelhos */
    this.aparelhoService.getAparelhos().subscribe(res => this.aparelhos = res);
  }

  /** Excluir um registro da tabela */
  excluir(id: number, index: number): void {

    if (confirm("Deseja realmente excluir esse registro?")) {

      /* Chama serviço para exclusao de aparelho */
      this.aparelhoService.excluirAparelho(id).subscribe(response => {

        // Response de retorno
        let res: Response = <Response>response;

        /* Mostra msg de sucesso e e depois remove registro da tabela */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.aparelhos.splice(index, 1);
        }
        else {
          /* MSG caso ocorra alguma exception no servidor (Codigo = 0) */
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

  editar(codigo: number): void {
    this.router.navigate(['/cadastro-aparelho', codigo]);
  }

}