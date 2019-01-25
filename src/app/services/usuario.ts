import { Perfil } from "./perfil";
import { Aparelho } from "./aparelho";

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
	perfis: Perfil[];
	aparelhos: Aparelho[];
}