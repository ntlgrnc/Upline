import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, PopoverController } from '@ionic/angular';
import { PopresePage } from '../poprese/poprese.page';
import { ModalAddResePage } from '../modal-add-rese/modal-add-rese.page';
import { DatosusService } from 'src/app/services/datosus.service';
import { HttpClient } from '@angular/common/http';
import { DatosUs } from 'src/app/models/datosu-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-d',
  templateUrl: './perfil-d.page.html',
  styleUrls: ['./perfil-d.page.scss'],
})
export class PerfilDPage implements OnInit {

  perfil: DatosUs[];

  idUs = localStorage.getItem('idUsuario');

  segmentSelect = 'publi';

  constructor(private menu: MenuController, private popover: PopoverController,
    private modal: ModalController, private datosusService: DatosusService, private route:Router) {

    this.datosusService.traerPerfil().subscribe((data: DatosUs[]) => {
      this.perfil = data;
    }, (error) => {
      console.log(error);
      alert('error');
    });
  }

  ngOnInit() {
  }

  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  async createPopover(evento) {

    const popover = await this.popover.create({ component: PopresePage, event: evento, mode: "ios", showBackdrop: false });
    // this.popover.create({ component:PopresePage, showBackdrop:false }).then(( PopoverElement ) => {
    //   PopoverElement.present();
    // });
    await popover.present();
  }

  async AbrirModalAdd() {

    const modal = await this.modal.create({
      component: ModalAddResePage,
      componentProps: {
        titulo: 'Nueva reseña'
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    console.log('Retorno del modal', data);

  }

  cerrarSesion() {
    localStorage.clear();
    console.log(localStorage.getItem('idLogin'));
    
    this.route.navigate(['inicio-sesion']);
  }



}
