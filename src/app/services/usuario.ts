import { Perfil } from "./perfil";
import { Aparelho } from "./aparelho";
import { UsuarioPerfil } from "./usuario_perfil";

export class Usuario {
	codigo:number;
	nome:string;
	login:string;
	email:string;
	senha:string;
	tempoExpiracaoSenha:number;
	codgAutorizacao:string;
	situacaoUsuario:boolean;
	codgPessoa:number;
	usuarioPerfil: UsuarioPerfil[];
	aparelhos: Aparelho[];
}