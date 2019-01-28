import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../services/usuario';

import { Response } from '../../services/response';
import { CadastroUsuarioComponent } from '../cadastro/cadastro-usuario.component';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ["./consulta-usuario.component.css"]
})
export class ConsultaUsuarioComponent implements OnInit {

  private usuarios: Usuario[] = new Array();
  private titulo: string;

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  /* inicializacao do componente */
  ngOnInit() {

    this.titulo = "Usuários Cadastrados";

    /** Chama serviço de consulta para todos os usuarios */
    this.usuarioService.getUsuarios().subscribe(res => this.usuarios = res);
  }

  /** Excluir um registro da tabela */
  excluir(id: number, index: number): void {

    if (confirm("Deseja realmente excluir esse registro?")) {

      /* Chama serviço para exclusao de usuario */
      this.usuarioService.excluirUsuario(id).subscribe(response => {

        // Response de retorno
        let res: Response = <Response>response;

        /* Mostra msg de sucesso e e depois remove registro da tabela */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.usuarios.splice(index, 1);
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
    this.router.navigate(['/cadastro-usuario', codigo]);
  }

}