import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { lightboxImageShape } from '../../shapes';

export default class AILightbox extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(lightboxImageShape).isRequired,
    startingIndex: PropTypes.number,
    showThumbnails: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    startingIndex: 0,
    showThumbnails: true,
  }

  state = { currentIndex: this.props.startingIndex };

  componentWillReceiveProps(nextProps) {
    if (nextProps.startingIndex !== this.props.startingIndex) {
      this.setState({ currentIndex: nextProps.startingIndex });
    }
  }

  handleNextClicked = () => this.changeCurrentIndex(this.state.currentIndex + 1);

  handlePrevClicked = () => this.changeCurrentIndex(this.state.currentIndex - 1);

  changeCurrentIndex = newIndex =>
    this.setState({ currentIndex: newIndex % this.props.images.length })

  handleClose = () => {
    this.setState({ currentIndex: undefined });
    this.props.onClose();
  }

  render() {
    const { images, open } = this.props;

    return (
      <Lightbox
        images={images}
        currentImage={this.state.currentIndex}
        onClickPrev={this.handlePrevClicked}
        onClickNext={this.handleNextClicked}
        onClose={this.handleClose}
        isOpen={open}
        showThumbnails={this.props.showThumbnails}
        onClickThumbnail={this.changeCurrentIndex}
      />
    );
  }
}
