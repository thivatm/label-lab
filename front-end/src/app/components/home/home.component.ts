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
  @ViewChild('imgUpload') imgInput: ElementRef;
  canvasBox: CanvasRenderingContext2D;

  image: any;
  imagePath: any;

  rectangle: IRect = {};
  rectArray = [];
  isDragged = false;
  isHovering = false;
  imgObj = null;
  imgLabel = [];

  constructor(private labService: LabService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.canvasBox = this.canvas.nativeElement.getContext('2d');
    this.imgLabel.push('Testing');
  }

  drawImg(image) {
    let scaleImg = Math.min(this.canvas.nativeElement.width / image.width, this.canvas.nativeElement.height / image.height);
    var x = (this.canvas.nativeElement.width / 2) - (image.width / 2) * scaleImg;
    var y = (this.canvas.nativeElement.height / 2) - (image.height / 2) * scaleImg;
    this.canvasBox.clearRect(0, 0, 1000, 1000);
    this.canvasBox.drawImage(image, x, y, image.width * scaleImg, image.height * scaleImg);
  }

  //#region - Mouse Events
  mouseDown(event) {
    this.canvasBox.clearRect(0, 0, 2000, 2000);
    this.drawImg(this.imgObj);
    this.rectangle.startX = (event.clientX - event.currentTarget.offsetLeft);
    this.rectangle.startY = (event.clientY - event.currentTarget.offsetTop);
    this.isDragged = true;
  }

  mouseUp() {
    this.isDragged = false;
    this.rectArray.push(this.rectangle);
    if (this.imgObj != null) {
      this.openDialog();
    }
  }

  mouseMove(event) {
    this.isHovering = true;
    if (this.isDragged) {
      this.canvasBox.clearRect(0, 0, 2000, 2000);
      this.drawImg(this.imgObj);
      this.rectangle.w = ((event.clientX - event.currentTarget.offsetLeft) - this.rectangle.startX);
      this.rectangle.h = ((event.clientY - event.currentTarget.offsetTop) - this.rectangle.startY);
      this.canvasBox.strokeStyle = 'red';
      this.canvasBox.lineWidth = 5;
      this.canvasBox.strokeRect(this.rectangle.startX, this.rectangle.startY, this.rectangle.w, this.rectangle.h);
    }
  }

  mouseLeave() {
    this.isHovering = false;
  }
  //#endregion

  onChange(event) {
    const fileReader = new FileReader();
    this.imgObj = new Image();
    this.image = event.target.files[0];
    fileReader.readAsDataURL(this.image);

    fileReader.onload = (_event) => {
      this.imagePath = fileReader.result;
      this.imgObj.src = this.imagePath;
      this.imgObj.onload = () => {
        this.drawImg(this.imgObj);
      };
    }
  }

  uploadImg() {
    let formData = new FormData();
    formData.append('myImg', this.image, this.image.name);
    formData.append('Coordinates', JSON.stringify(this.rectArray));
    formData.append('ImageLabels', JSON.stringify(this.imgLabel));

    return this.labService.uploadImg(formData)
      .subscribe((res) => {
        if (res['error']) {
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
    this.canvasBox.clearRect(0, 0, 1000, 1000);
    this.imgObj = null;
    this.imgInput.nativeElement.value = '';
  }

  clearLabel(element) {
    this.imgLabel.splice(this.imgLabel.indexOf(element), 1);
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
        this.imgLabel.push(res);
        console.log(this.imgLabel);
      }
    });
  }


}
