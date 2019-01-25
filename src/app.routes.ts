import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './app/home/home.component';

import { ConsultaUsuarioComponent } from './app/usuario/consulta/consulta-usuario.component';
import { CadastroUsuarioComponent } from './app/usuario/cadastro/cadastro-usuario.component';

import { ConsultaPerfilComponent } from './app/perfil/consulta/consulta-perfil.component';
import { CadastroPerfilComponent } from './app/perfil/cadastro/cadastro-perfil.component';

import { ConsultaAparelhoComponent } from './app/aparelho/consulta/consulta-aparelho.component';
import { CadastroAparelhoComponent } from './app/aparelho/cadastro/cadastro-aparelho.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },

    { path: 'consulta-usuario', component: ConsultaUsuarioComponent },
    { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
    { path: 'cadastro-usuario/:codigo', component: CadastroUsuarioComponent },

    { path: 'consulta-perfil', component: ConsultaPerfilComponent },
    { path: 'cadastro-perfil', component: CadastroPerfilComponent },
    { path: 'cadastro-perfil/:codigo', component: CadastroPerfilComponent },

    { path: 'consulta-aparelho', component: ConsultaAparelhoComponent },
    { path: 'cadastro-aparelho', component: CadastroAparelhoComponent },
    { path: 'cadastro-aparelho/:codigo', component: CadastroAparelhoComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);