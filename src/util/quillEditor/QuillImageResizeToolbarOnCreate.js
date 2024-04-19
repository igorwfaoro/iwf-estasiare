import { Toolbar } from 'quill-image-resize-module-ts/dist/modules/Toolbar';
import { Quill } from 'react-quill';

const iconAlignLeft = /*html*/ `<svg viewbox="0 0 18 18">
    <line class="ql-stroke" x1="3" x2="15" y1="9" y2="9" />
    <line class="ql-stroke" x1="3" x2="13" y1="14" y2="14" />
    <line class="ql-stroke" x1="3" x2="9" y1="4" y2="4" />
  </svg>`;

const iconAlignCenter = /*html*/ `<svg viewbox="0 0 18 18">
    <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9" />
    <line class="ql-stroke" x1="14" x2="4" y1="14" y2="14" />
    <line class="ql-stroke" x1="12" x2="6" y1="4" y2="4" />
  </svg>`;

const iconAlignRight = /*html*/ `<svg viewbox="0 0 18 18">
    <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9" />
    <line class="ql-stroke" x1="15" x2="5" y1="14" y2="14" />
    <line class="ql-stroke" x1="15" x2="9" y1="4" y2="4" />
  </svg>`;

const parchment = Quill.import('parchment');
const floatStyle = new parchment.Attributor.Style('float', 'float');
const marginStyle = new parchment.Attributor.Style('margin', 'margin');
const displayStyle = new parchment.Attributor.Style('display', 'display');

Toolbar.prototype.onCreate = function quillImageResizeToolbarOnCreate() {
  const createAlignments = () => {
    this.alignments = [
      {
        icon: iconAlignLeft,
        apply: () => {
          displayStyle.add(this.img, 'inline');
          floatStyle.add(this.img, 'left');
          marginStyle.add(this.img, '0 1em 1em 0');
        },
        isApplied: () => floatStyle.value(this.img) == 'left'
      },
      {
        icon: iconAlignCenter,
        apply: () => {
          displayStyle.add(this.img, 'block');
          floatStyle.remove(this.img);
          marginStyle.add(this.img, 'auto');
        },
        isApplied: () => marginStyle.value(this.img) == 'auto'
      },
      {
        icon: iconAlignRight,
        apply: () => {
          displayStyle.add(this.img, 'inline');
          floatStyle.add(this.img, 'right');
          marginStyle.add(this.img, '0 0 1em 1em');
        },
        isApplied: () => floatStyle.value(this.img) == 'right'
      }
    ];
  };

  const createToolbarButtons = () => {
    const buttons = [];
    this.alignments.forEach((alignment, idx) => {
      const button = document.createElement('span');
      buttons.push(button);
      button.innerHTML = alignment.icon;
      button.addEventListener('click', () => {
        // deselect all buttons
        buttons.forEach((button) => (button.style.filter = ''));
        if (alignment.isApplied()) {
          // If applied, unapply
          floatStyle.remove(this.img);
          marginStyle.remove(this.img);
          displayStyle.remove(this.img);
        } else {
          // otherwise, select button and apply
          selectButton(button);
          alignment.apply();
        }
        // image may change position; redraw drag handles
        this.imageResize.onUpdate();
      });
      Object.assign(button.style, this.options.toolbarButtonStyles);
      if (idx > 0) {
        button.style.borderLeftWidth = '0';
      }
      Object.assign(
        button.children[0].style,
        this.options.toolbarButtonSvgStyles
      );
      if (alignment.isApplied()) {
        // select button if previously applied
        selectButton(button);
      }
      this.toolbar.appendChild(button);
    });
  };

  const selectButton = (button) => {
    button.style.filter = 'invert(20%)';
  };

  // Setup Toolbar
  this.toolbar = document.createElement('div');
  Object.assign(this.toolbar.style, this.options.toolbarStyles);
  this.overlay.appendChild(this.toolbar);

  // Setup Buttons
  createAlignments();
  createToolbarButtons();
};
