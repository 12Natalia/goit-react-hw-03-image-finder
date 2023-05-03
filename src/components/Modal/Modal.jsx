import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  keyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  handleClose = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div onClick={this.handleClose} className={css.Overlay}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>
    );
  }
}
