import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, Platform } from '@ionic/angular';
import { Html5Qrcode } from 'html5-qrcode';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-codigo-alumno-qr',
  templateUrl: './codigo-alumno-qr.page.html',
  styleUrls: ['./codigo-alumno-qr.page.scss'],
})
export class CodigoAlumnoQrPage implements OnInit, AfterViewInit {
  private horaAsistencia = '09:00'; // Define la hora de asistencia (HH:mm)
  isSupported = false;
  barcodes: Barcode[] = [];
  scannerId = 'reader'; // ID del contenedor para el escaneo en navegador
  html5QrCode: Html5Qrcode | null = null;

  latitudProfesor: string;
  longitudProfesor: string;
  latitudProfesorNum: number;
  longitudProfesorNum: number;
  latitudEstudiante: number;
  longitudEstudiante: number;
  distanciaEnMetros: number;

  constructor(private alertController: AlertController, private platform: Platform) {}

  ngOnInit() {
    // Inicializar el escáner HTML5 solo si la plataforma no es Capacitor
    this.platform.ready().then(async () => {
      if (this.platform.is('capacitor')) {
        const result = await BarcodeScanner.isSupported();
        this.isSupported = result.supported;
      } else {
        // No es Capacitor, inicializar el escáner HTML5
        this.isSupported = true;
      }
    });
  }

  // Usamos ngAfterViewInit para asegurarnos que el contenedor esté disponible
  ngAfterViewInit() {
    if (!this.platform.is('capacitor') && this.isSupported) {
      this.html5QrCode = new Html5Qrcode(this.scannerId);
    }
  }

  // Inicia el proceso de escaneo
  async escanearQr() {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Permiso NO concedido', 'DA EL PERMISO PARA QUE LA CAMARA PUEDA INICIAR EL SCANEO');
      return;
    }

    if (this.platform.is('capacitor') && this.isSupported) {
      const scanResult = await BarcodeScanner.scan();
      if (scanResult.barcodes.length > 0) {
        const contenidoQr = scanResult.barcodes[0].displayValue || ''; // Contenido escaneado
        this.verificarAsistencia(contenidoQr);
      } else {
        this.presentAlert('Error', 'No se detectó contenido en el escaneo.');
      }
    } else if (this.html5QrCode) {
      // Esperamos que el contenedor #reader esté disponible antes de iniciar el escáner
      const readerElement = document.getElementById('reader');
      if (readerElement) {
        this.html5QrCode.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: readerElement.clientWidth, height: readerElement.clientWidth } },
          (decodedText: string) => {
            alert(`Código QR escaneado: ${decodedText}`);
            this.html5QrCode?.stop();
            const datosRecibidos = decodedText.split(',');
            this.obtenerGeolocalizacion(datosRecibidos);
          },
          (errorMessage: string) => console.error('Error de escaneo:', errorMessage)
        ).catch((err: any) => console.error('Error al iniciar el escáner', err));
      } else {
        console.error('El contenedor #reader no está disponible en el DOM.');
      }
    }
  }

  // Verifica la hora y registra la asistencia si está dentro del horario
  verificarAsistencia(content: string) {
    const horaActual = new Date().toTimeString().slice(0, 5);
    if (horaActual === this.horaAsistencia) {
      this.marcarAsistencia(content);
    } else {
      this.presentAlert('Error', 'Fuera del horario de asistencia.');
    }
  }

  // Marca la asistencia y muestra un mensaje de éxito
  marcarAsistencia(content: string) {
    console.log(`Asistencia registrada para el contenido: ${content}`);
    this.presentAlert('Asistencia', 'Asistencia registrada exitosamente.');
  }

  // Solicita los permisos de la cámara en Capacitor
  async requestPermissions(): Promise<boolean> {
    if (this.platform.is('capacitor')) {
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera === 'granted' || camera === 'limited';
    }
    return true;
  }

  // Muestra un alerta con el mensaje especificado
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Obtiene la ubicación geográfica del estudiante y del profesor y calcula la distancia
  async obtenerGeolocalizacion(datosRecibidos: string[]): Promise<void> {
    this.latitudProfesor = datosRecibidos[5];
    this.longitudProfesor = datosRecibidos[6];
    this.latitudProfesorNum = parseFloat(this.latitudProfesor);
    this.longitudProfesorNum = parseFloat(this.longitudProfesor);

    const position = await Geolocation.getCurrentPosition();
    this.latitudEstudiante = position.coords.latitude;
    this.longitudEstudiante = position.coords.longitude;

    this.distanciaEnMetros = this.haversineDistance(
      this.latitudEstudiante,
      this.longitudEstudiante,
      this.latitudProfesorNum,
      this.longitudProfesorNum
    );
    console.log("Distancia entre los dispositivos: ", this.distanciaEnMetros);
  }

  // Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine
  private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radio de la tierra en km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c * 1000; // Devuelve la distancia en metros
  }
}