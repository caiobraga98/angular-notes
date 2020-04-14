import { Component, OnInit, ViewChild } from '@angular/core';
import { Lembrete } from 'src/app/interfaces/lembrete';
import { ErrorMsgComponent } from 'src/app/compartilhado/error-msg/error-msg.component';
import { LembreteService } from 'src/app/services/lembrete.service';

@Component({
  selector: 'app-lista-lembrete',
  templateUrl: './lista-lembrete.component.html',
  styleUrls: ['./lista-lembrete.component.css']
})
export class ListaLembreteComponent implements OnInit {
  public lembretes: Lembrete[];
  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;
  constructor(private lembreteService: LembreteService) { }

  ngOnInit(): void {
    this.getListaLembretes();
  }

  getListaLembretes() {
    this.lembreteService.getListaLembretes()
      .subscribe((lembretes: Lembrete[]) => {
        this.lembretes = lembretes;
        console.log('recebeu')
      }, () => { this.errorMsgComponent.setError('Falha ao buscar lembretes.'); });
  }

  deletaLembrete(id: number) {
    this.lembreteService.deletaLembrete(id)
      .subscribe(() => {
        this.getListaLembretes();
      }, () => { this.errorMsgComponent.setError('Falha ao deletar lembrete.'); });
  }

  existemLembretes(): boolean {
    return this.lembretes && this.lembretes.length > 0;
  }

}
