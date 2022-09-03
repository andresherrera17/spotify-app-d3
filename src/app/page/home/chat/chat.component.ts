import { Component, OnInit } from '@angular/core';
import { IMensaje } from 'src/app/interfaces/mensaje.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  chats: IMensaje[] = [];
  element: HTMLElement = {} as HTMLElement;

  constructor(private _serviceChat: ChatService, public _serviceAuth: AuthService) { }

  ngOnInit(): void {
    this.cargarMensaje();
    this.element = document.getElementById('app-mensajes') || {} as HTMLElement;
  }

  cargarMensaje(){
    this._serviceChat.cargarMensajes().subscribe(data => {
      this.chats = data;
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
  }

  enviarMensaje(){
    if(this.mensaje == ""){
      return;
    }
    this._serviceChat.agregarMensaje(this.mensaje)
      .then(() => this.mensaje = "")
      .catch((err) => console.error(err))
  }
}
