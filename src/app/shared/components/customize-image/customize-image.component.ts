import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CropBars } from '../../models/view/crop/Bars-obj';
import { CropedImgCoordinates } from '../../models/view/crop/croped-image-coordinates';
import { Coordinates } from '../../models/view/crop/coordinates';
import { Subscription } from 'rxjs';
import { CreativeDataService } from '../../services/UI/creative/creative-data';
import { CreativeDimensions } from '../../models/view/creative/dimensions';
import { Creative } from '../../models/view/creative/creative';

@Component({
  selector: 'somplo-customize-image',
  templateUrl: './customize-image.component.html',
  styleUrls: ['./customize-image.component.scss'],
})
export class CustomizeImageComponent
  implements OnInit, AfterViewInit, OnDestroy {
  theImage: string;
  img = new Image();
  subscription: Subscription;
  @ViewChild('c1', { static: true })
  c1: ElementRef<HTMLCanvasElement>;
  @ViewChild('c2', { static: true })
  c2: ElementRef<HTMLCanvasElement>;
  ctx1: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;

  cropedImageCoordinates: CropedImgCoordinates;

  cropBars: CropBars = null;
  creativeDimensions: CreativeDimensions;
  proportion = 0.8;
  deltaX: number;
  deltaY: number;

  cw: number;
  cx: number;
  ch: number;
  cy: number;
  sy = 20;
  sx = 130;
  sw = 200;
  sh = 200;
  cropBarWidth = 4;
  d: Coordinates;

  isDragging1 = false;
  isDragging2 = false;

  mousePos1: Coordinates = {
    x: 0,
    y: 0,
  };
  mousePos2: Coordinates = {
    x: 0,
    y: 0,
  };
  constructor(private creativeService: CreativeDataService) {}

  ngOnInit(): void {
    this.subscription = this.creativeService
      .getCreativeData()
      .subscribe((creative) => {
        if (creative?.img) {
          this.theImage = creative.img;
        }
      });
  }
  ngAfterViewInit(): void {
    this.init();
    this.initHandlers();
  }

  saveAndCrop(): void {
    this.autoTrimCanvas(this.c2.nativeElement, this.ctx2);
    const imgUrl = this.c2.nativeElement.toDataURL();
    const creativeData: Creative = {
      img: imgUrl,
      url: this.creativeService.getCreativeData().value.url,
      animation: this.creativeService.getCreativeData().value.animation,
    };
    this.creativeService.setCreativeData(creativeData);
    const showCustomize = this.creativeService.showCustomize();
    this.creativeService.setCustomizeShown(!showCustomize);
  }
  private drawCroppedImage(cropedImgCoordinates: CropedImgCoordinates): void {
    this.ctx2.drawImage(
      this.img,
      cropedImgCoordinates.sx,
      cropedImgCoordinates.sy,
      cropedImgCoordinates.sw,
      cropedImgCoordinates.sh,
      cropedImgCoordinates.x,
      cropedImgCoordinates.y,
      cropedImgCoordinates.w,
      cropedImgCoordinates.h
    );
  }
  private oMousePos(canvas: HTMLCanvasElement, evt: any): Coordinates {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(evt.clientX - rect.left),
      y: Math.round(evt.clientY - rect.top),
    };
  }
  private init(): void {
    this.img.src = this.theImage;

    this.creativeDimensions = this.creativeService.getCreativeDimensions();
    this.ctx1 = this.c1.nativeElement.getContext('2d');
    this.ctx2 = this.c2.nativeElement.getContext('2d');

    this.cw = this.c1.nativeElement.width = this.c2.nativeElement.width = this.creativeDimensions.w;
    this.cx = this.cw / 2;

    this.ch = this.c1.nativeElement.height = this.c2.nativeElement.height = this.creativeDimensions.h;
    this.cy = this.ch / 2;

    this.d = {
      // tslint:disable-next-line: no-bitwise
      x: ~~(this.cx - (this.sw * this.proportion) / 2),
      // tslint:disable-next-line: no-bitwise
      y: ~~(this.cy - (this.sh * this.proportion) / 2),
    };

    this.cropBars = {
      sx: {
        color: 'white',
        x: 0,
        y: this.sy,
        w: this.cw,
        h: this.cropBarWidth,
        bool: false,
      },
      sy: {
        color: 'yellow',
        x: this.sx,
        y: 0,
        w: this.cropBarWidth,
        h: this.ch,
        bool: false,
      },
      sw: {
        color: 'orange',
        x: 0,
        y: this.sy + this.sh,
        w: this.cw,
        h: this.cropBarWidth,
        bool: false,
      },
      sh: {
        color: 'red',
        x: this.sx + this.sw,
        y: 0,
        w: this.cropBarWidth,
        h: this.ch,
        bool: false,
      },
    };
    this.drawGuides(this.cropBars);
    this.cropedImageCoordinates = this.defineCropedImageCoordinates(
      this.cropBars,
      this.d
    ); // an object defining the cropped image

    this.img.onload = () => {
      // use it in hook
      this.c1.nativeElement.style.backgroundImage =
        'url(' + this.theImage + ')';
      this.drawCroppedImage(this.cropedImageCoordinates);
    };
  }
  private initHandlers(): void {
    this.c1.nativeElement.addEventListener(
      'mousedown',
      (evt: MouseEvent) => {
        this.isDragging1 = true;

        this.mousePos1 = this.oMousePos(this.c1.nativeElement, evt);
        // tslint:disable-next-line: forin
        for (const k in this.cropBars) {
          this.ctx1.beginPath();
          this.ctx1.rect(
            this.cropBars[k].x - 10,
            this.cropBars[k].y - 10,
            this.cropBars[k].w + 20,
            this.cropBars[k].h + 20
          );
          if (this.ctx1.isPointInPath(this.mousePos1.x, this.mousePos1.y)) {
            this.cropBars[k].bool = true;
            if (k === 'sx' || k === 'sw') {
              this.cropBars[k].y = this.mousePos1.y;
            } else {
              this.cropBars[k].x = this.mousePos1.x;
            }
            break;
          } else {
            this.cropBars[k].bool = false;
          }
        }
      },
      false
    );
    this.c1.nativeElement.addEventListener(
      'mouseup',
      (evt) => {
        this.isDragging1 = false;
        // this.autoTrimCanvas(this.c2.nativeElement, this.ctx2); // TODO add button crop image (save) call this method
        // const imgUrl = this.c2.nativeElement.toDataURL();
        // const creativeData: Creative = {
        //   img: imgUrl,
        //   url: this.creativeService.getCreativeData().value.url,
        //   animation: this.creativeService.getCreativeData().value.animation,
        // };
        // this.creativeService.setCreativeData(creativeData);
        // tslint:disable-next-line: forin
        for (const k in this.cropBars) {
          this.cropBars[k].bool = false;
        }
      },
      false
    );
    this.c1.nativeElement.addEventListener(
      'mousemove',
      (evt) => {
        this.mousePos1 = this.oMousePos(this.c1.nativeElement, evt); // console.log(mousePos)
        this.cursorStyleC1();

        if (this.isDragging1 === true) {
          this.ctx1.clearRect(0, 0, this.cw, this.ch);

          for (const k in this.cropBars) {
            if (this.cropBars[k].bool) {
              if (k === 'sx' || k === 'sw') {
                this.cropBars[k].y = this.mousePos1.y;
              } else {
                this.cropBars[k].x = this.mousePos1.x;
              }
              break;
            }
          }

          this.drawGuides(this.cropBars);
          this.ctx2.clearRect(0, 0, this.cw, this.ch);
          this.cropedImageCoordinates = this.defineCropedImageCoordinates(
            this.cropBars,
            this.d
          );
          this.drawCroppedImage(this.cropedImageCoordinates);
        }
      },
      false
    );
    this.c1.nativeElement.addEventListener(
      'mouseout',
      (evt) => {
        this.isDragging1 = false;
        // tslint:disable-next-line: forin
        for (const k in this.cropBars) {
          this.cropBars[k].bool = false;
        }
      },
      false
    );
    this.c2.nativeElement.addEventListener(
      'mousedown',
      (evt) => {
        this.mousePos2 = this.oMousePos(this.c2.nativeElement, evt);
        this.outlineImage(this.cropedImageCoordinates);
        if (this.ctx2.isPointInPath(this.mousePos2.x, this.mousePos2.y)) {
          this.isDragging2 = true;

          this.deltaX = this.mousePos2.x - this.cropedImageCoordinates.x;
          this.deltaY = this.mousePos2.y - this.cropedImageCoordinates.y;
        }
      },
      false
    );
    this.c2.nativeElement.addEventListener(
      'mousemove',
      (evt) => {
        this.mousePos2 = this.oMousePos(this.c2.nativeElement, evt);

        if (this.isDragging2 === true) {
          this.ctx2.clearRect(0, 0, this.cw, this.ch);
          this.d.x = this.mousePos2.x - this.deltaX;
          this.d.y = this.mousePos2.y - this.deltaY;
          this.cropedImageCoordinates = this.defineCropedImageCoordinates(
            this.cropBars,
            this.d
          );
          this.drawCroppedImage(this.cropedImageCoordinates);
        }
        this.cursorStyleC2();
      },
      false
    );
    this.c2.nativeElement.addEventListener(
      'mouseup',
      (evt) => {
        this.isDragging2 = false;
      },
      false
    );
    this.c2.nativeElement.addEventListener(
      'mouseout',
      (evt) => {
        this.isDragging2 = false;
      },
      false
    );
  }
  private drawGuides(cropBars: CropBars): void {
    for (const k in cropBars) {
      if (k && cropBars[k]) {
        this.ctx1.fillStyle = cropBars[k].color;
        this.ctx1.beginPath();
        this.ctx1.fillRect(
          cropBars[k].x,
          cropBars[k].y,
          cropBars[k].w,
          cropBars[k].h
        );
      }
    }
  }
  private defineCropedImageCoordinates(
    cropBars: CropBars,
    d
  ): CropedImgCoordinates {
    // an object defining the cropped image
    const coordinates = {
      sx: cropBars.sy.x,
      sy: cropBars.sx.y,
      sw: cropBars.sh.x - cropBars.sy.x,
      sh: cropBars.sw.y - cropBars.sx.y,
      // tslint:disable-next-line: no-bitwise
      w: ~~((cropBars.sh.x - cropBars.sy.x) * this.proportion),
      // tslint:disable-next-line: no-bitwise
      h: ~~((cropBars.sw.y - cropBars.sx.y) * this.proportion),
      x: d.x,
      y: d.y,
    };
    return coordinates;
  }
  private outlineImage(cropedImgCoord: CropedImgCoordinates): void {
    this.ctx2.beginPath();
    this.ctx2.rect(
      cropedImgCoord.x,
      cropedImgCoord.y,
      cropedImgCoord.w,
      cropedImgCoord.h
    );
  }
  private cursorStyleC1(): void {
    this.c1.nativeElement.style.cursor = 'default';
    // tslint:disable-next-line: forin
    for (const k in this.cropBars) {
      this.ctx1.beginPath();
      this.ctx1.rect(
        this.cropBars[k].x - 10,
        this.cropBars[k].y - 10,
        this.cropBars[k].w + 20,
        this.cropBars[k].h + 20
      );
      if (this.ctx1.isPointInPath(this.mousePos1.x, this.mousePos1.y)) {
        if (k === 'sx' || k === 'sw') {
          this.c1.nativeElement.style.cursor = 'row-resize';
        } else {
          this.c1.nativeElement.style.cursor = 'col-resize';
        }
        break;
      } else {
        this.c1.nativeElement.style.cursor = 'default';
      }
    }
  }
  private cursorStyleC2(): void {
    this.c2.nativeElement.style.cursor = 'default';
    this.outlineImage(this.cropedImageCoordinates);
    if (this.ctx2.isPointInPath(this.mousePos2.x, this.mousePos2.y)) {
      this.c2.nativeElement.style.cursor = 'move';
    } else {
      this.c2.nativeElement.style.cursor = 'default';
    }
  }

  private autoTrimCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ): void {
    const bounds = {
      left: 0,
      right: canvas.width,
      top: 0,
      bottom: canvas.height,
    };
    const rows = [];
    const cols = [];
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
      cols[x] = cols[x] || false;
      for (let y = 0; y < canvas.height; y++) {
        rows[y] = rows[y] || false;
        const p = y * (canvas.width * 4) + x * 4;
        const [r, g, b, a] = [
          imageData.data[p],
          imageData.data[p + 1],
          imageData.data[p + 2],
          imageData.data[p + 3],
        ];
        const isEmptyPixel = Math.max(r, g, b, a) === 0;
        if (!isEmptyPixel) {
          cols[x] = true;
          rows[y] = true;
        }
      }
    }
    for (let i = 0; i < rows.length; i++) {
      if (rows[i]) {
        bounds.top = i ? i - 1 : i;
        break;
      }
    }
    for (let i = rows.length; i--; ) {
      if (rows[i]) {
        bounds.bottom = i < canvas.height ? i + 1 : i;
        break;
      }
    }
    for (let i = 0; i < cols.length; i++) {
      if (cols[i]) {
        bounds.left = i ? i - 1 : i;
        break;
      }
    }
    for (let i = cols.length; i--; ) {
      if (cols[i]) {
        bounds.right = i < canvas.width ? i + 1 : i;
        break;
      }
    }
    const newWidth = bounds.right - bounds.left;
    const newHeight = bounds.bottom - bounds.top;
    const cut = ctx.getImageData(bounds.left, bounds.top, newWidth, newHeight);
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.putImageData(cut, 0, 0);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
