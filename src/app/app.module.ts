import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ConsultaUsuarioComponent } from './usuario/consulta/consulta-usuario.component';
import { CadastroUsuarioComponent } from './usuario/cadastro/cadastro-usuario.component';
import { ConsultaPerfilComponent } from './perfil/consulta/consulta-perfil.component';
import { CadastroPerfilComponent } from './perfil/cadastro/cadastro-perfil.component';
import { ConsultaAparelhoComponent } from './aparelho/consulta/consulta-aparelho.component';
import { CadastroAparelhoComponent } from './aparelho/cadastro/cadastro-aparelho.component';

import { routing } from './../app.routes';


import { ConfigService } from './services/config.service';
import { UsuarioService } from './services/usuario.service';
import { PerfilService } from './services/perfil.service';
import { AparelhoService } from './services/aparelho.service';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ConsultaUsuarioComponent,
    CadastroUsuarioComponent,
    ConsultaPerfilComponent,
    CadastroPerfilComponent,
    ConsultaAparelhoComponent,
    CadastroAparelhoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [ConfigService, UsuarioService, PerfilService, AparelhoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
