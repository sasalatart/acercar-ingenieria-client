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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.prevStartingIndex !== nextProps.startingIndex) {
      return {
        currentIndex: nextProps.startingIndex,
        prevStartingIndex: nextProps.startingIndex,
      };
    }

    return null;
  }

  state = { currentIndex: this.props.startingIndex };

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
