import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LabService } from '../../services/label.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ModalLabelComponent } from '../modals/modal-label/modal-label.component';
import { IRect } from '../../models/IRect';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('canvasView') canvas: ElementRef;
  canvasBox: CanvasRenderingContext2D;

  image: any;
  imagePath: any;
  
  rectangle: IRect = {};
  isDragged = false;
  imgObj = null;
  imgLabel: string = 'Label is not set';

  constructor(private labService: LabService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.canvasBox = this.canvas.nativeElement.getContext('2d');
    this.imgObj = new Image(); 
  }

  drawImg(image){
    let scaleImg = Math.min(this.canvas.nativeElement.width / image.width, this.canvas.nativeElement.height / image.height);
    var x = (this.canvas.nativeElement.width / 2) - (image.width / 2) * scaleImg;
    var y = (this.canvas.nativeElement.height / 2) - (image.height / 2) * scaleImg;
    this.canvasBox.drawImage(image, x, y, image.width * scaleImg, image.height * scaleImg);
  }

  //#region - Mouse Events
  mouseDown(event) {
    //this.canvasBox.clearRect(0, 0, 1000, 1000);
    //this.drawImg(this.imgObj);
    this.rectangle.startX = (event.layerX - event.currentTarget.offsetLeft);
    this.rectangle.startY = (event.layerY - event.currentTarget.offsetTop);
    this.isDragged = true;
  }

  mouseUp() {  
    this.isDragged = false;
    if (this.imagePath != null) {
      this.openDialog();
    }
  }

  mouseMove(event) {
    if (this.isDragged) {
      this.canvasBox.clearRect(0, 0, 1000, 1000);
      this.drawImg(this.imgObj);
      this.rectangle.w = ((event.layerX - event.currentTarget.offsetLeft) - this.rectangle.startX);
      this.rectangle.h = ((event.layerY - event.currentTarget.offsetTop) - this.rectangle.startY);
      this.canvasBox.strokeStyle = 'red';
      this.canvasBox.lineWidth = 5;
      this.canvasBox.strokeRect(this.rectangle.startX, this.rectangle.startY, this.rectangle.w, this.rectangle.h);
    }
  }
  //#endregion

  onChange(event){
    const fileReader = new FileReader();
    this.image = event.target.files[0];
    fileReader.readAsDataURL(this.image);
    
    fileReader.onload = (_event) => {
      this.imagePath = fileReader.result;
      this.imgObj.src = this.imagePath;
      this.imgObj.onload =  () => {  
        this.drawImg(this.imgObj);
      }; 
    }
  }
  
  uploadImg() {
    let formData = new FormData();
    formData.append('myImg', this.image, this.image.name);
    formData.append('coordinates', JSON.stringify(this.rectangle));
    formData.append('label', this.imgLabel);

    return this.labService.uploadImg(formData)
      .subscribe((res) => {
        if (res['error']){
          this.popupToasts(`Error: ${res['error']}`);
        } else {
          this.popupToasts('Successfully uploaded.');
        }
      },
      (error) => {
        this.popupToasts('Oops! An error occurred!');
      }
      );
  }

  clearAll() {
    this.imgLabel = 'Not set!';
    this.canvasBox.clearRect(0, 0, 1000, 1000);
    this.drawImg(this.imgObj);
  }

  //Toast message
  popupToasts(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }

  //label Modal
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalLabelComponent, {
      disableClose: false,
      panelClass: 'label-modal'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res != null) {
        this.imgLabel = res;
      } else {
        this.imgLabel = 'Not Set Yet!';
      }
    });
  }


}
