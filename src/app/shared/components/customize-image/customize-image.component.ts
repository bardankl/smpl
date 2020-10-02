import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'sompo-customize-image',
  templateUrl: './customize-image.component.html',
  styleUrls: ['./customize-image.component.scss'],
})
export class CustomizeImageComponent implements OnInit {
  constructor() {}
  @ViewChild('this.c1', { static: true })
  c1: ElementRef<HTMLCanvasElement>;
  @ViewChild('this.c2', { static: true })
  c2: ElementRef<HTMLCanvasElement>;
  ctx1: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;
  deltaX: number;
  deltaY: number;
  ngOnInit(): void {}
  someFunc(): void {
    const proportion = 0.8; // you may change the proportion for the cropped image.
    const theImage =
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/222579/beagle400.jpg';

    const output = document.getElementById('output');

    this.ctx1 = this.c1.nativeElement.getContext('2d');
    this.ctx2 = this.c2.nativeElement.getContext('2d');

    const cw = (this.c1.nativeElement.width = this.c2.nativeElement.width = 400);
    const cx = cw / 2;
    const ch = (this.c1.nativeElement.height = this.c2.nativeElement.height = 400);
    const cy = ch / 2;

    let isDragging1 = false;
    let isDragging2 = false;

    const sy = 20;
    const sx = 130;
    const sw = 200;
    const sh = 200;

    const r = 4;

    let mousePos1 = {
      x: 0,
      y: 0,
    };
    let mousePos2 = {
      x: 0,
      y: 0,
    };

    const o = {
      // cropping bars
      sx: {
        color: 'white',
        x: 0,
        y: sy,
        w: cw,
        h: r,
        bool: false,
      },
      sy: {
        color: 'yellow',
        x: sx,
        y: 0,
        w: r,
        h: ch,
        bool: false,
      },
      sw: {
        color: 'orange',
        x: 0,
        y: sy + sh,
        w: cw,
        h: r,
        bool: false,
      },
      sh: {
        color: 'red',
        x: sx + sw,
        y: 0,
        w: r,
        h: ch,
        bool: false,
      },
    };

    function drawGuides(obj): void {
      // tslint:disable-next-line: forin
      for (const k in obj) {
        this.ctx1.fillStyle = o[k].color;
        this.ctx1.beginPath();
        this.ctx1.fillRect(o[k].x, o[k].y, o[k].w, o[k].h);
      }
    }

    function Imgo(o, d): any {
      // an object defining the cropped image
      const imgo = {
        sx: o.sy.x,
        sy: o.sx.y,
        sw: o.sh.x - o.sy.x,
        sh: o.sw.y - o.sx.y,
        w: ~~((o.sh.x - o.sy.x) * proportion),
        h: ~~((o.sw.y - o.sx.y) * proportion),
        x: d.x,
        y: d.y,
      };
      return imgo;
    }

    const d = {
      x: ~~(cx - (sw * proportion) / 2),
      y: ~~(cy - (sh * proportion) / 2),
    };

    function Output(Imgo, output) {
      output.innerHTML =
        'ctx.drawImage(img,' +
        imgo.sx +
        ',' +
        imgo.sy +
        ',' +
        imgo.sw +
        ',' +
        imgo.sh +
        ',' +
        imgo.x +
        ',' +
        imgo.y +
        ',' +
        imgo.w +
        ',' +
        imgo.h +
        ')';
    }

    function drawCroppedImage(imgo) {
      this.ctx2.drawImage(
        img,
        imgo.sx,
        imgo.sy,
        imgo.sw,
        imgo.sh,
        imgo.x,
        imgo.y,
        imgo.w,
        imgo.h
      );
    }

    function outlineImage(imgo) {
      this.ctx2.beginPath();
      this.ctx2.rect(imgo.x, imgo.y, imgo.w, imgo.h);
    }

    function cursorStyleC1() {
      this.c1.style.cursor = 'default';
      // tslint:disable-next-line: forin
      for (const k in o) {
        this.ctx1.beginPath();
        this.ctx1.rect(o[k].x - 10, o[k].y - 10, o[k].w + 20, o[k].h + 20);
        if (this.ctx1.isPointInPath(mousePos1.x, mousePos1.y)) {
          if (k === 'sx' || k === 'sw') {
            this.c1.style.cursor = 'row-resize';
          } else {
            this.c1.style.cursor = 'col-resize';
          }
          break;
        } else {
          this.c1.style.cursor = 'default';
        }
      }
    }

    function cursorStyleC2(): void {
      this.c2.nativeElement.style.cursor = 'default';
      outlineImage(imgo);
      if (this.ctx2.isPointInPath(mousePos2.x, mousePos2.y)) {
        this.c2.style.cursor = 'move';
      } else {
        this.c2.style.cursor = 'default';
      }
    }

    drawGuides(o);
    let imgo = Imgo(o, d); // an object defining the cropped image
    Output(Imgo, output); // text: "drawImage(img,130,10,200,220,150,145,100,110)";

    const img = new Image();
    img.src = theImage;
    img.onload = () => {
      this.c1.nativeElement.style.backgroundImage = 'url(' + theImage + ')';
      drawCroppedImage(imgo);
    };

    // mousedown ***************************

    this.c1.nativeElement.addEventListener(
      'mousedown',
      (evt) => {
        isDragging1 = true;

        mousePos1 = oMousePos(this.c1.nativeElement, evt);
        // tslint:disable-next-line: forin
        for (const k in o) {
          this.ctx1.beginPath();
          this.ctx1.rect(o[k].x - 10, o[k].y - 10, o[k].w + 20, o[k].h + 20);
          if (this.ctx1.isPointInPath(mousePos1.x, mousePos1.y)) {
            o[k].bool = true;
            if (k === 'sx' || k === 'sw') {
              o[k].y = mousePos1.y;
            } else {
              o[k].x = mousePos1.x;
            }
            break;
          } else {
            o[k].bool = false;
          }
        }

        Output(Imgo, output);
      },
      false
    );

    this.c2.nativeElement.addEventListener(
      'mousedown',
      (evt) => {
        mousePos2 = oMousePos(this.c2.nativeElement, evt);
        outlineImage(imgo);
        if (this.ctx2.isPointInPath(mousePos2.x, mousePos2.y)) {
          isDragging2 = true;

          this.deltaX = mousePos2.x - imgo.x;
          this.deltaY = mousePos2.y - imgo.y;

          Output(Imgo, output);
        }
      },
      false
    );

    // mousemove ***************************
    this.c1.nativeElement.addEventListener(
      'mousemove',
      (evt) => {
        mousePos1 = oMousePos(this.c1.nativeElement, evt); //console.log(mousePos)
        cursorStyleC1();

        if (isDragging1 === true) {
          this.ctx1.clearRect(0, 0, cw, ch);

          for (const k in o) {
            if (o[k].bool) {
              if (k === 'sx' || k === 'sw') {
                o[k].y = mousePos1.y;
              } else {
                o[k].x = mousePos1.x;
              }
              break;
            }
          }

          drawGuides(o);
          this.ctx2.clearRect(0, 0, cw, ch);
          imgo = Imgo(o, d);
          drawCroppedImage(imgo);
          Output(Imgo, output);
        }
      },
      false
    );

    this.c2.nativeElement.addEventListener(
      'mousemove',
      (evt) => {
        mousePos2 = oMousePos(this.c2.nativeElement, evt);

        if (isDragging2 == true) {
          this.ctx2.clearRect(0, 0, cw, ch);
          d.x = mousePos2.x - this.deltaX;
          d.y = mousePos2.y - this.deltaY;
          imgo = Imgo(o, d);
          drawCroppedImage(imgo);
          Output(Imgo, output);
        }
        cursorStyleC2();
      },
      false
    );

    // mouseup ***************************
    this.c1.nativeElement.addEventListener(
      'mouseup',
      (evt) => {
        isDragging1 = false;
        // tslint:disable-next-line: forin
        for (const k in o) {
          o[k].bool = false;
        }
      },
      false
    );

    this.c2.nativeElement.addEventListener(
      'mouseup',
      (evt) => {
        isDragging2 = false;
      },
      false
    );

    // mouseout ***************************
    this.c1.nativeElement.addEventListener(
      'mouseout',
      (evt) => {
        isDragging1 = false;
        // tslint:disable-next-line: forin
        for (const k in o) {
          o[k].bool = false;
        }
      },
      false
    );

    this.c2.nativeElement.addEventListener(
      'mouseout',
      (evt) => {
        isDragging2 = false;
      },
      false
    );

    function oMousePos(canvas: HTMLCanvasElement, evt) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: Math.round(evt.clientX - rect.left),
        y: Math.round(evt.clientY - rect.top),
      };
    }
  }
}
