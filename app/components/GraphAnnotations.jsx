import React, { Component, PropTypes } from 'react';
import GraphNavButtons from './GraphNavButtons';
import GraphAnnotationList from './GraphAnnotationList';
import GraphAnnotation from './GraphAnnotation';
import GraphAnnotationForm from './GraphAnnotationForm';
import ShowHideAnnotations from './ShowHideAnnotations';
require('../styles/oligrapher.annotations.css');

export default class GraphAnnotations extends Component {

  render() {
    let { prevClick, nextClick, isEditor, editForm, navList, 
          swapAnnotations, annotation, currentIndex, 
          update, remove, swapEditForm, annotations, show, 
          create, move, canClickPrev, canClickNext, allowEditNodes  } = this.props;

    let navComponent = (
      <GraphNavButtons {...this.props} />
    );

    let annotationComponent = (
      <GraphAnnotation {...this.props} />
    );

    let navListComponent = (
      <GraphAnnotationList {...this.props} />
    );

    let showHideAnnotation = (
      <ShowHideAnnotations {...this.props} />
    );

    return (
      <div id="oligrapherGraphAnnotations" className="col-md-4">
        { showHideAnnotation }
        { isEditor && navList && navListComponent }
        { (annotation || isEditor) && navComponent }
      </div>
    );
  }
}