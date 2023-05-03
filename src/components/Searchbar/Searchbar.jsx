import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  onChangeInput = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form
          onSubmit={evt => {
            evt.preventDefault();

            if (!this.state.search) {
              return toast.error('Enter the name of the picture or photo');
            }

            this.props.handleSubmit(this.state.search);
            this.resetForm();
          }}
          className={css.Form}
        >
          <button type="submit" className={css.Button}>
            <FcSearch size="30" />
          </button>

          <input
            value={this.state.search}
            onChange={this.onChangeInput}
            className={css.Input}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search for pictures and photos"
          />
        </form>
      </header>
    );
  }
}
