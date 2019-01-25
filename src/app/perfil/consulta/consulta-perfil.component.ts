import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { PerfilService } from '../../services/perfil.service';

import { Perfil } from '../../services/perfil';

import { Response } from '../../services/response';

@Component({
  selector: 'app-consulta-perfil',
  templateUrl: './consulta-perfil.component.html',
  styleUrls: ["./consulta-perfil.component.css"]
})
export class ConsultaPerfilComponent implements OnInit {

  private perfis: Perfil[] = new Array();
  private titulo: string;

  constructor(private perfilService: PerfilService,
    private router: Router) { }

  /* inicializacao do componente */
  ngOnInit() {

    this.titulo = "Registros Cadastrados";

    /** Chama serviço de consulta para todos os perfis */
    this.perfilService.getPerfis().subscribe(res => this.perfis = res);
  }

  /** Excluir um registro da tabela */
  excluir(id: number, index: number): void {

    if (confirm("Deseja realmente excluir esse registro?")) {

      /* Chama serviço para exclusao de perfil */
      this.perfilService.excluirPerfil(id).subscribe(response => {

        // Response de retorno
        let res: Response = <Response>response;

        /* Mostra msg de sucesso e e depois remove registro da tabela */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.perfis.splice(index, 1);
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
    this.router.navigate(['/cadastro-perfil', codigo]);
  }

}