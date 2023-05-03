import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { searchFunc } from 'api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: 1,
    loading: false,
    error: null,
    showModal: false,
    empty: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.getFunc(this.state.search, this.state.page);
    }
  }

  getFunc = (text, page) => {
    this.setState({ loading: true });

    searchFunc(text, page)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length === 0) {
          this.setState({ empty: true });
        }
        this.setState(prevState => ({
          page: prevState.page,
          images: [...prevState.images, ...data.hits],
          total: data.total,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  clickLoad = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (largeImageURL, alt) => {
    this.setState(({ showModal }) => {
      return { showModal: !showModal, largeImageURL, alt };
    });
  };

  handleSubmit = search => {
    this.setState({
      search,
      images: [],
      page: 1,
      total: 1,
      loading: false,
      error: null,
      empty: false,
    });
  };

  closeModal = () => {
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };

  render() {
    const { error, loading, images, total, page } = this.state;
    return (
      <div>
        <Toaster
          toastOptions={{
            duration: 2000,
          }}
        />

        <Searchbar handleSubmit={this.handleSubmit} />

        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Whoops, something went wrong: ({error})
          </h2>
        )}

        <ImageGallery togleModal={this.openModal} images={images} />

        {loading && <Loader />}

        {this.state.empty && (
          <h2 style={{ textAlign: 'center' }}>
            Sorry, there are no such pictures here
          </h2>
        )}

        {total / 12 > page && <Button clickLoad={this.clickLoad} />}

        {this.state.showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt={this.state.alt} />
          </Modal>
        )}
      </div>
    );
  }
}
